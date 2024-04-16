import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './schema/user.schema';
import axios, { AxiosResponse } from 'axios';


@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}


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