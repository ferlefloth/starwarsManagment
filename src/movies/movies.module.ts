import { Module } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { UserModule } from "src/user/user.module";
import { UserController } from "src/user/user.controller";
import { UserService } from "src/user/user.service";
import { Movies, MoviesSchema } from "./schema/movies.schema";


@Module({
    imports:[MongooseModule.forFeature([{name: Movies.name, schema: MoviesSchema}])], // VER DE METER EL SCHEMA DE LAS MOVIES ACÁ
    controllers:[MoviesController],
    providers: [MoviesService]
})

export class MoviesModule {}
