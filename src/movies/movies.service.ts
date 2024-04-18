import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
             return response.data
         }catch(error){
            throw new Error()
         }
     }
 
     async getDetailsOfMovieById(id:number){
        try{
            const response = await axios.get(`https://swapi.dev/api/films/${id}`)
            return response.data
        }catch(error){
            console.log(`[Error] - userService.getDetailsOfMovieById - ${JSON.stringify(error)}`)
            throw new Error()
        }
     }
 
     async createMovie(moviesRequest: MoviesRequestDto): Promise<MoviesResponseDto>{ //chequear validaciones
        
        const movieToSave = MoviesResponseDto.fromEntity(moviesRequest)

        const savedMovied: Movies =  await this.moviesModel.create(movieToSave)
        console.log('el savedMovie: ' + JSON.stringify(savedMovied))
        return MoviesResponseDto.fromEntity(savedMovied)
     }
 
     async updateMovie(
        id: number,
        moviesRequest: MoviesRequestDto
     ){
         
        const findedMovieQuery  = await this.moviesModel.findOne({episode_id: id})
        if(!findedMovieQuery ){
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
        }
  
       for (const key in moviesRequest) { 
            if (Object.prototype.hasOwnProperty.call(moviesRequest, key)) {
                findedMovieQuery[key] = moviesRequest[key];
            }
          }
            
        const updatedMovie = await findedMovieQuery.save();

        return MoviesResponseDto.fromEntity(updatedMovie);
     }
 
     async deleteMovie(id: number){ 
        const findedMovieQuery  = await this.moviesModel.findOne({episode_id: id})

        if(!findedMovieQuery){
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
        }
        
        try{
            const deletedMovie = await this.moviesModel.findByIdAndDelete(findedMovieQuery._id);
            return  {message: 'Movie deleted successfully', deletedMovie };
        }catch(error){
            console.log(`[Delete Movie Error] ' + ${JSON.stringify(error)}`)
            return HttpStatus.INTERNAL_SERVER_ERROR
        }
     }
}