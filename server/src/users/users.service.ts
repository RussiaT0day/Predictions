import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { UserRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

	constructor(
			@InjectModel(User)
			private userRepository: typeof User,
			private roleService: RolesService
		) {}

	async createUser( dto: CreateUserDto ){
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('USER');
		await user.$set('roles', [role.id])

		return user;
	}

	async getAllUsers(){
		const users = await this.userRepository.findAll({ include: { all: true }});
		return users;
	}


	async getUserByEmail(email: string ){
		const user = await this.userRepository.findOne({
			where: { email }, include: { all: true }
		});

		return user;
	}


	async addRole(userRoleDto: UserRoleDto ){
		const user = await this.userRepository.findByPk(userRoleDto.id);
		const role = await this.roleService.getRoleByValue(userRoleDto.value);

		if (!user && !role) 
			throw new HttpException('Пользователь или роль не найдена', HttpStatus.NOT_FOUND)

		await user.$add('role', role.id);

		return HttpStatus.OK;
	}

	async ban(banUserDto: BanUserDto ){
		const user = await this.userRepository.findByPk(banUserDto.id);
		
		if(!user) throw new HttpException('Пользователь не найден', HttpStatus.FOUND)

		user.banned = !user.banned
		await user.save()
		
		return user.banned ? 'Бан снят' : 'Пользователь забанен'
	}
}
