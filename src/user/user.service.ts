import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './schema/user.schema';
import { RegisterAuthDto } from "src/auth/dto/register-auth.dto";
import {hash} from 'bcrypt'

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async register(userObject:RegisterAuthDto){
        const { password } = userObject;
        const plainToHash = await hash(password,10);

        userObject = {...userObject, password:plainToHash}
        return this.userModel.create(userObject);
    }    
}