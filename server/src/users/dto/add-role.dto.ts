
import { ApiProperty } from '@nestjs/swagger';

export class UserRoleDto {
	@ApiProperty({ example: '12', description: 'Id пользователя'})
	readonly id: number;
	
	@ApiProperty({ example: 'ADMIN', description: 'Название роли'})
	readonly value: string;
}	
	