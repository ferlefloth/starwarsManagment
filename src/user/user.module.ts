import { Module } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import {User, UserSchema} from './schema/user.schema'
import { MoviesController } from "src/movies/movies.controller";
import { MoviesService } from "src/movies/movies.service";

@Module({
    imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers:[UserController],
    providers: [UserService]
})

export class UserModule {}
