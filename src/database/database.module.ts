// database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Movies, MoviesSchema } from 'src/movies/schema/movies.schema';


@Module({
  imports: [
    ConfigModule.forRoot(), // Importa el módulo de configuración si es necesario
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/starWarsManagment'), // Configura la conexión a la base de datos
   // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), //no va
   // MongooseModule.forFeature([{name: Movies.name, schema: MoviesSchema}]),  //no va
],
})
export class DatabaseModule {}
