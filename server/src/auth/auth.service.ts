import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService { 
	// constructor(
	// 	private userService: UsersService,
	// 	private jwtService: JwtService,
	// )

	constructor(
		private userService: UsersService,
		private jwtService: JwtService
		) {}

	// constructor(
	// 	private userService: UsersService,
		// private jwtService: JwtService
	// 	)

	async registration( userDto: CreateUserDto ){
		const candidate = await this.userService.getUserByEmail(userDto.email);

		if(candidate) 
				throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({
			...candidate, password: hashPassword
		});

		return this.generateToken(user);
	}

	async generateToken(user) {
		return { token: this.jwtService.sign({payload: user}) };
	}
}	
