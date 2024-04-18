import { Module } from "@nestjs/common"
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { Movies, MoviesSchema } from "./schema/movies.schema";
import { JwtModule } from "@nestjs/jwt";


@Module({
   imports:[MongooseModule.forFeature([{name: Movies.name, schema: MoviesSchema}]),JwtModule],
    controllers:[MoviesController],
    providers: [MoviesService]
})

export class MoviesModule {}
