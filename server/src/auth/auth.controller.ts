import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Авторизация пользователя'})
	@ApiResponse({ status: 200 })
	@Post('/login')
	login(@Body() userDto: CreateUserDto){
		return this.authService.login(userDto);
	}

	@ApiOperation({ summary: 'Регистрация пользователя'})
	@ApiResponse({ status: 200 })
	@Post('/registration')
	create(@Body() userDto: CreateUserDto){
		return this.authService.registration(userDto);
	}

}
