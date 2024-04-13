import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { UserRegisterDto } from "./dto/user-register-request.dto";
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './schema/user.schema';

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}


    async getMovies(){

    }

    async getDetailsOfMovies(){

    }

    async createMovie(){

    }

    async updateMovie(){}
}