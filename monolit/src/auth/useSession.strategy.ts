import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { promisify } from 'util'; 

@Injectable()
export class UseSessionStrategy extends PassportStrategy(Strategy, 'useSession') {
  constructor(private authService: AuthService) {
    super({ 
        passReqToCallback: true, 
      });
  }

  async validate(@Request() req, username: string, password: string): Promise<any> {
    console.log('from useSession Strategy');

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    await promisify(req.login.bind(req))(user); 
    return user; 
  }
}
