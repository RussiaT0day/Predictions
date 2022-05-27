import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

	constructor( private jwtService: JwtService, private reflector: Reflector  ) {}
	
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

		try {
			const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
				context.getHandler(),
				context.getClass()
			]);
			console.log(requiredRoles);
			
			if(!requiredRoles) return true;

			const req = context.switchToHttp().getRequest();
			const authService = req.headers.authorization;
			const bearer = authService.split(' ')[0];
			const token = authService.split(' ')[1];

			if (bearer !== 'Bearer' || !token) 
				throw new UnauthorizedException({ message : "Пользователь не авторизован"});

				const user = this.jwtService.verify(token);

				req.user = user;
				const { payload } = user;

				return payload.roles.some(role => requiredRoles.includes(role.value))

		}	catch (e) { throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN); }
		
	}
}
 