import { Module } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";


@Module({
    //imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers:[MoviesController],
    providers: [MoviesService]
})

export class MoviesModule {}
