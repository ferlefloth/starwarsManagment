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
 
     async updateMovie(){
         return "Solo los Admin"
     }
 
     async deleteMovie(){
         return "Solo los Admin"
     }
}