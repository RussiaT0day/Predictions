
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
	@ApiProperty({ example: '12', description: 'Id пользователя'})
	readonly id: number;
	
	@ApiProperty({ example: 'Забанен за спам', description: 'Описание причины бана'})
	readonly reason: string;
}	
	