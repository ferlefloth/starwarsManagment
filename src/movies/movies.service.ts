import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { Model } from "mongoose";
import { Movies, MoviesDocument } from "./schema/movies.schema";

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
 
     async createMovie(){
         return "Solo los Admin"
     }
 
     async updateMovie(){
         return "Solo los Admin"
     }
 
     async deleteMovie(){
         return "Solo los Admin"
     }
}