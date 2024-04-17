import { Test } from '@nestjs/testing';
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service';
import { MoviesModule } from './movies.module';
import { getModelToken } from '@nestjs/mongoose';
import { Movies} from './schema/movies.schema';
import { mockedMoviesResponse } from './test/movie-mock-response';
import { JwtModule } from '@nestjs/jwt';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('MoviesController', () => {
  let moviesController;
  let moviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports:[MoviesModule,JwtModule],
      })
      .overrideProvider(getModelToken(Movies.name))
      //.overrideProvider(getConnectionToken())
      .useValue(jest.fn())
      .compile();

      moviesService = moduleRef.get<MoviesService>(MoviesService);
      moviesController = moduleRef.get<MoviesController>(MoviesController);
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      jest.spyOn(moviesService, 'getMovies').mockResolvedValue(mockedMoviesResponse);

      expect(await moviesController.getMovies()).toBe(mockedMoviesResponse);
    });
  });

  describe('getDetailsOfMovieById', () => {
    it('should return details of the movie with the given ID', async () => {
      const mock = new MockAdapter(axios);
      const id = 4;
      const expectedResult = {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a period of civil war...',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25'
      };
  
      mock.onGet(`https://swapi.dev/api/films/${id}`).reply(200, expectedResult);
  
      expect(await moviesController.getDetails(id)).toEqual(expectedResult);
    });
  });
});
