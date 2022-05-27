import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.module";

interface UserCreationAttrs{
	email: string,
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
	@ApiProperty({ example: '1', description: 'Уникальный индификатор'})
	@Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
	id:number;
	
	@ApiProperty({ example: 'user@mail.ru', description: 'Почтовый ящик'})
	@Column({type: DataType.STRING, unique:true, autoIncrement:false })
	email:string;

	@ApiProperty({ example: 'p@assw0rd1234', description: 'Пароль пользователя'})
	@Column({type: DataType.STRING, allowNull: false})
	password:string;

	@ApiProperty({ example: 'true', description: 'Забанен/Незабанен'})
	@Column({type: DataType.BOOLEAN, defaultValue:false})
	banned: boolean;

	@ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки'})
	@Column({type: DataType.BOOLEAN, defaultValue:true})
	banReason: string;

	@BelongsToMany( () => Role, () => UserRoles)
	roles: Role[];
}
