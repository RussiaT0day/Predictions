import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService { 
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
		) {}


		async login( userDto: CreateUserDto ){
			const user = await this.validateUser(userDto);
			return this.generateToken(user);
		}

	async registration( userDto: CreateUserDto ){
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if(candidate) 
				throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({
			...userDto, password: hashPassword
		});

		return this.generateToken(user);
	}

	private async generateToken(user) {
		return { token: this.jwtService.sign({payload: user}) };
	}

	private async validateUser(userDto: CreateUserDto){
		const { email, password } = userDto

		const user = await this.userService.getUserByEmail(email);

		if (!user) throw new UnauthorizedException({
			massage : 'Некорректный email' });

		const passwordEquals = await bcrypt.compare(password, user.password)
		
		if (!passwordEquals) throw new UnauthorizedException({
			massage : 'Некорректный пароль' });

		return user
	}
}	
