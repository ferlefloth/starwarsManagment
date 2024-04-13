import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User, UserSchema } from './user/schema/user.schema';
//import {ConfigModule} from '@nestj'

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/starWarsManagment'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), //Chequear de pasarle todos los schemmas al app.module
    
  ],
  controllers: [AppController,UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
