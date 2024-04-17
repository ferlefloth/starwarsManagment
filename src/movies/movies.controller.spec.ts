import { Test } from '@nestjs/testing';
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

import { AuthService } from 'src/auth/auth.service';
import { Model } from "mongoose";
import { Movies, MoviesSchema } from './schema/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from 'src/auth/auth.controller';
import { MoviesModule } from './movies.module';
import { AppModule } from 'src/app.module';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from 'src/database/database.module';

describe('MoviesController', () => {
  let moviesController;
  let moviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports:[DatabaseModule,AuthModule,MoviesModule,UserModule],
        controllers: [MoviesController,AuthController],
        providers: [MoviesService,AuthGuard,AuthService],
      }).compile();

      moviesService = moduleRef.get<MoviesService>(MoviesService);
      moviesController = moduleRef.get<MoviesController>(MoviesController);
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      const result = ['test'];
      jest.spyOn(moviesService, 'getMovies').mockImplementation(() => result);

      expect(await moviesController.getMovies()).toBe(result);
    });
  });
});
