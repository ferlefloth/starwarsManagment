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
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

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
      // .useValue(jest.fn())// Antes
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
        roles: ['Administrador'],
      };

      const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

      jest.spyOn(moviesService, 'createMovie').mockResolvedValue(createdMovie);

      const response = await moviesController.createMovie(movieDto, { headers: { authorization: `Bearer ${token}` } });

      // Verificar que se haya llamado a createMovie con el objeto movieDto, chequear
      //expect(moviesService.createMovie).toHaveBeenCalledWith(movieDto, tokenPayload);

      expect(response).toEqual(createdMovie);
    });
  });


  it('should forbid creation of a movie for users with "Usuario Regular" role', async () => {

    const movieDto: MoviesResponseDto = {
      title: 'Test',
      episode_id: 1,
      opening_crawl: 'test',
      director: 'director test',
      producer: 'producer test',
      release_date: new Date(),
      characters: [],
      planets: [],
      vehicles: [],
      created: new Date(),
      edited: new Date()
    };

    const tokenPayload = {
      userId: '123',
      role: 'Usuario Regular',
    };

    const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

    await expect(moviesController.createMovie(movieDto, { headers: { authorization: `Bearer ${token}` } })).rejects.toThrow("Unauthorized");
  });


  describe('UpdateMovie', () => {

    it('should update an existing movie if "Administrador" is asigned', async () => {
      const movieId = '1';
      const movieDto: MoviesResponseDto = {
        title: '',
        episode_id: 1,
        opening_crawl: '',
        director: '',
        producer: '',
        release_date: undefined,
        characters: [],
        planets: [],
        vehicles: [],
        created: undefined,
        edited: undefined
      };

      const updatedMovie: Movies = {
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

      /*jest.spyOn(moviesService, 'updateMovie').mockResolvedValue(updatedMovie);
  
      expect(await moviesController.updateMovie(movieId, movieDto)).toBe(updatedMovie);
    */
      const tokenPayload = {
        userId: '123',
        role: 'Administrador',
      };

      const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

      const response = await moviesController.updateMovie(movieId, movieDto, { headers: { authorization: `Bearer ${token}` } });


      expect(response).toEqual(updatedMovie);
    });


    it('should forbid updating a movie for users with "Usuario Regular" assigned', async () => {

      const movieId = 2
      const updatedMovieDto: MoviesResponseDto = {
        title: 'Updated Test',
        episode_id: 2,
        opening_crawl: 'updated test',
        director: 'updated director test',
        producer: 'updated producer test',
        release_date: new Date(),
        characters: [],
        planets: [],
        vehicles: [],
        created: new Date(),
        edited: new Date()
      };

      const tokenPayload = {
        userId: '123',
        role: 'Usuario Regular',
      };

      const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });

      await expect(moviesController.updateMovie(movieId, updatedMovieDto, { headers: { authorization: `Bearer ${token}` } })).rejects.toThrow("Unauthorized");
    });

  })

  describe('DeleteMovie', () => {

    it('should delete an existing movie  if "Administrador" is assigned', async () => {
      const movieId = 1;

      const deletedMovie: Movies = {
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

      const response = await moviesController.deleteMovie(movieId, { headers: { authorization: `Bearer ${token}` } });

      expect(response).toEqual(deletedMovie);
    });


    it('should forbid deleting a movie for users with "Usuario Regular" role assigned', async () => {
      const movieId = '1';

      const tokenPayload = {
        userId: '123',
        role: 'Usuario Regular',
      };

      const token = jwt.sign(tokenPayload, 'secret_key', { expiresIn: '1h' });
      await expect(moviesController.deleteMovie(movieId, { headers: { authorization: `Bearer ${token}` } })).rejects.toThrow("Unauthorized");
    });

  })


});