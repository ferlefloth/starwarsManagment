import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOURI),
   // MongooseModule.forRoot(process.env.MONGODEV), //starsWarsManagment 
],
})
export class DatabaseModule {}
