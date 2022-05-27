
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес'})
	readonly email: string;
	
	@ApiProperty({ example: 'p@assw0rd1234', description: 'Пароль пользователя'})
	readonly password: string;
}	
	