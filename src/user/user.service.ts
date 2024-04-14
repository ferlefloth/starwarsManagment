import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { UserRegisterDto } from "./dto/user-register-request.dto";
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './schema/user.schema';

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}


    async getMovies(){
        return "Cualquiera puede verme!"
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