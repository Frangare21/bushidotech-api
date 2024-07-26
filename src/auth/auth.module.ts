import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule, JwtModule],
  imports: [UserModule,
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.registerAsync ({

        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (configService:ConfigService )=> {

          // console.log(configService.get('JWT_SECRET'))
          return{
            secret: configService.get('JWT_SECRET'),
            signOptions:{
              expiresIn: '4h'
            }
          }
        }    })
    ]
})
export class AuthModule {}
