import { Test } from '@nestjs/testing';
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service';
import { MoviesModule } from './movies.module';
import { getModelToken } from '@nestjs/mongoose';
import { Movies } from './schema/movies.schema';
import { mockedMoviesResponse } from './test/movie-mock-response';
import { JwtModule } from '@nestjs/jwt';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MoviesResponseDto } from './dto/movies-response-dto';
import * as jwt from 'jsonwebtoken';

describe('MoviesController', () => {
  let moviesController;
  let moviesService;
  function mockMovie(): MoviesResponseDto {
    return {
      title: 'Test Movie',
      episode_id: 1,
      opening_crawl: 'Test opening crawl',
      director: 'Test Director',
      producer: 'Test Producer',
      release_date: new Date(),
      characters: [],
      planets: [],
      vehicles: [],
      created: new Date(),
      edited: new Date(),
    };
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MoviesModule, JwtModule],
    })
      .overrideProvider(getModelToken(Movies.name))
      .useValue({
        new: jest.fn().mockResolvedValue(mockMovie()),
        constructor: jest.fn().mockResolvedValue(mockMovie()),
        find: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        remove: jest.fn(),
        exec: jest.fn(),
        findById: jest.fn(),
      })
      .compile();

    moviesService = moduleRef.get<MoviesService>(MoviesService);
    moviesController = moduleRef.get<MoviesController>(MoviesController);
  });

  describe('getMovies and getDetailsOfMovieById', () => {

    it('should return an array of movies', async () => {
      jest.spyOn(moviesService, 'getMovies').mockResolvedValue(mockedMoviesResponse);

      expect(await moviesController.getMovies()).toBe(mockedMoviesResponse);
    });


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

  describe('CreateMovie:', () => {

    it('should create a new movie if role "Administrador" is assigned ', async () => {
      const movieDto: MoviesResponseDto = {
        title: 'Test',
        episode_id: 1,
        opening_crawl: 'test',
        director: 'director test',
        producer: 'producer test',
        release_date: new Date,
        characters: [],
        planets: [],
        vehicles: [],
        created: new Date,
        edited: new Date
      };

      const createdMovie: Movies = {
        title: 'Test',
        episode_id: 1,
        opening_crawl: 'test',
        director: 'director test',
        producer: 'producer test',
        release_date: new Date,
        characters: [],
        planets: [],
        vehicles: [],
        created: new Date,
        edited: new Date
      };

      const tokenPayload = {
        userId: '123',
        role: 'Administrador',
      };

      const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

      jest.spyOn(moviesService, 'createMovie').mockResolvedValue(createdMovie);

      const response = await moviesController.createMovie(movieDto, { headers: { authorization: `Bearer ${token}` } });

      expect(response).toEqual(createdMovie);
    });
  });

});