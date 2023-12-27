import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não fornecido');
    }

    if (!token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const tokenJWT = token.substring(7);
    
    try {
      const decoded = jwt.verify(tokenJWT, this.configService.get('SECRET_MESSAGE'));
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
