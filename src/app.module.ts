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
import { MoviesService } from './movies/movies.service';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
import { Movies, MoviesSchema } from './movies/schema/movies.schema';


@Module({
  imports: [
    UserModule,
    MoviesModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/starWarsManagment'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), //Chequear de pasarle todos los schemmas al app.module
    MongooseModule.forFeature([{name: Movies.name, schema: MoviesSchema}]),
    HttpModule
  ],
  controllers: [AppController,UserController,AuthController,MoviesController],
  providers: [AppService, UserService,AuthService,MoviesService],
})
export class AppModule {}
