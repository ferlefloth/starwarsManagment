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
import { MoviesResponseDto } from './dto/movies-response-dto';

describe('MoviesController', () => {
  let moviesController;
  let moviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports:[MoviesModule,JwtModule],
      })
      .overrideProvider(getModelToken(Movies.name))
      .useValue(jest.fn())
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

  describe('CreateMovie, UpdateMovie, DeleteMovie',()=>{

    it('should create a new movie', async () => {
      const movieDto: MoviesResponseDto = {
        title: '',
        episode_id: 0,
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

      jest.spyOn(moviesService, 'createMovie').mockResolvedValue(createdMovie);

      expect(await moviesController.createMovie(movieDto)).toBe(createdMovie);
    });
  });

  it('should update an existing movie', async () => {
    const movieId = '123';
    const movieDto: MoviesResponseDto = {
      title: '',
      episode_id: 0,
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

    jest.spyOn(moviesService, 'updateMovie').mockResolvedValue(updatedMovie);

    expect(await moviesController.updateMovie(movieId, movieDto)).toBe(updatedMovie);
  });

  it('should delete an existing movie', async () => {
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

    jest.spyOn(moviesService, 'deleteMovie').mockResolvedValue(deletedMovie);

    expect(await moviesController.deleteMovie(movieId)).toBe(deletedMovie);
  });

});