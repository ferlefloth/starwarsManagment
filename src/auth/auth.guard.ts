import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants'; // ???
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from './config/roles.decorator';

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );

        if (!payload.role) {
          throw new UnauthorizedException('El token no incluye el campo role');
        }              
        const roleFromController = this.reflector.get(Roles, context.getHandler());

        if(roleFromController.length <= 1 && roleFromController[0] != payload.role){ //TODO mejorar validaciónes en controllers
          throw  new UnauthorizedException('Debe ser administrador para utilizar esta Api')
        }
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
   
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }