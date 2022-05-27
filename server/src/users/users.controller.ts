import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

	constructor(private userService: UsersService){}

	@ApiOperation({ summary: 'Создание пользователея'})
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto){
		return this.userService.createUser(userDto);
	}


	@ApiOperation({ summary: 'Получение всех пользователей'})
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll(){
		return this.userService.getAllUsers();
	}

	@ApiOperation({ summary: 'Изменение роли пользователя '})
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/role/add')
	addRole(@Body() userRoleDto: UserRoleDto ){
		return this.userService.addRole(userRoleDto);
	}

	@ApiOperation({ summary: 'Бан пользователя'})
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get('/ban')
	ban(@Body() banRoleDto: BanUserDto ){
		return this.userService.ban(banRoleDto);
	}
}
