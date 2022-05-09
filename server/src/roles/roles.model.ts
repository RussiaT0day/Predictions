import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.module";

interface RoleCreationAttrs{
	value: string,
	description: string
}

@Table({ tableName:'roles' })
export class Role extends Model<Role, RoleCreationAttrs>{
  @ApiProperty({ example: '1', description: 'Уникальный индификатор'})
	@Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
	id:number;
  
	@ApiProperty({ example: 'Admin', description: 'Роль пользователя'})
	@Column({type: DataType.STRING, unique:true, autoIncrement:false })
	value:string;

	@ApiProperty({ example: 'Администратор', description: 'Описание роли пользовтеля'})
	@Column({type: DataType.STRING, allowNull: false})
	description:string;

	@BelongsToMany( () => User, () => UserRoles)
	users: User[];
}

