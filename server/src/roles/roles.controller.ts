import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

	constructor(private roleService: RolesService){}

	@ApiOperation({ summary: 'Получение роли по названию'})
	@ApiResponse({ status: 202, type: Role })
	@Get('/:value')
	getByValue(@Param('value') value: string){
		return this.roleService.getRoleByValue(value);
	}

	@ApiOperation({ summary: 'Создание роли'})
	@ApiResponse({ status: 201, type: Role })
	@Post()
	create(@Body() roleDto: CreateRoleDto){
		return this.roleService.createRole(roleDto);
	}

	@ApiOperation({ summary: 'Удаление роли'})
	@ApiResponse({ status: 200, type: Role})
	@Delete('/:value')
	delete(@Param('value') value: string){
		return this.roleService.deleteRoleByValue(value)
	}


}
