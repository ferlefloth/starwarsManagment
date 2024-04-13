import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";

@Injectable()
export class MoviesService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}


    async getMovies(){
        return null
    }

    async getDetailsOfMovies(){
        return null
    }

    async createMovie(){
        return null
    }

    async updateMovie(){
        return null
    }
}