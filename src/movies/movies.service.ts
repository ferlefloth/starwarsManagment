import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { Model } from "mongoose";
import { Movies, MoviesDocument } from "./schema/movies.schema";
import { MoviesResponseDto } from "./dto/movies-response-dto";
import { MoviesRequestDto } from "./dto/movies-request-dto";


@Injectable()
export class MoviesService{
    constructor(@InjectModel(Movies.name) private readonly moviesModel: Model<MoviesDocument>){}

    async getMovies(): Promise<any> {
        try{
             const response = await axios.get('https://swapi.dev/api/films')
             console.log('el response: ' + JSON.stringify(response.data));
             return response.data
         }catch(error){
             console.log('el error: ' + JSON.stringify(error))
         }
     }
 
     async getDetailsOfMovies(){
         return "Solo los Usuarios regulares"
     }
 
     async createMovie(moviesRequest: MoviesRequestDto): Promise<MoviesResponseDto>{ //chequear validaciones
        
        const movieToSave = MoviesResponseDto.fromEntity(moviesRequest)
        console.log('el moviesToSave: ' + JSON.stringify(movieToSave))

        const savedMovied: Movies =  await this.moviesModel.create(movieToSave)
        return MoviesResponseDto.fromEntity(savedMovied)
     }
 
     async updateMovie(
        id: number,
        moviesRequest: MoviesRequestDto
     ){
         
        const findedMovieQuery  = this.moviesModel.findOne({episode_id: id})

        if(!findedMovieQuery ){
            throw Error('movie not found')
        }

        const findedMovie = await findedMovieQuery.exec();

        for (const key in moviesRequest) {
            if (Object.prototype.hasOwnProperty.call(moviesRequest, key)) {
              findedMovie[key] = moviesRequest[key];
            }
          }
    
    
        const updatedMovie = await findedMovie.save();

        return MoviesResponseDto.fromEntity(updatedMovie);
     }
 
     async deleteMovie(id: number){ 
        const findedMovieQuery  = this.moviesModel.findOne({episode_id: id})

        if(!findedMovieQuery ){
            throw Error('movie not found')
        }
        
        const findedMovie = await findedMovieQuery.exec();

        try{
            const deletedMovie = await this.moviesModel.findByIdAndDelete(findedMovie._id);
            console.log('deletedMovie: ' + JSON.stringify(deletedMovie))
        }catch(error){
            console.log('el error: ' + JSON.stringify(error))
        }
        return { statusCode: 204 } // hacerlo más elegante
     }
}