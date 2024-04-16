import { ENTRY_PROVIDER_WATERMARK } from "@nestjs/common/constants";
import { Movies } from "../schema/movies.schema";

export class MoviesResponseDto{
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;     
    release_date: Date;
    characters: string[];
    planets: string[];    
    vehicles: string[];
    created: Date;    
    edited: Date;

    static fromEntity(movie : Movies): MoviesResponseDto{
        const movieDto = new MoviesResponseDto()

        movieDto.title = movie.title
        movieDto.episode_id = movie.episode_id
        movieDto.opening_crawl = movie.opening_crawl
        movieDto.director = movie.director
        movieDto.producer = movie.producer
        movieDto.release_date = movie.release_date
        movieDto.characters = movie.characters
        movieDto.planets = movie.planets
        movieDto.vehicles = movie.vehicles
        movieDto.created = movie.created
        movieDto.release_date = movie.release_date
        movieDto.edited = movie.edited


        return movieDto
    }

}