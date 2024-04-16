import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './user/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/starWarsManagment'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), //Chequear de pasarle todos los schemmas al app.module
    HttpModule
  ],
  controllers: [AppController,UserController,AuthController],
  providers: [AppService, UserService,AuthService],
})
export class AppModule {}
