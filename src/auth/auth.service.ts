import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schema/user.schema";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import {hash, compare} from 'bcrypt'
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { find } from "rxjs";
@Injectable()
export class AuthService{
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private jwtAuthService: JwtService){}

    async register(userObject:RegisterAuthDto){
        const { password } = userObject;
        const plainToHash = await hash(password,10);

        userObject = {...userObject, password:plainToHash}
 
        return this.userModel.create(userObject);
    }

    async login(userObjectLogin : LoginAuthDto){
        const { email, password } = userObjectLogin 
        const findUser = await this.userModel.findOne({email: email})
        console.log('el findUser:' + JSON.stringify(findUser))
    
        if(!findUser) throw new  HttpException('USER_NOT_FOUND',404);

        const checkPassword = await compare(password,findUser.password);

        console.log('el checkPassword:' + checkPassword)

        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
        
        const payload  = {id: findUser._id, name: findUser.name, role: findUser.role};

        const token = await this.jwtAuthService.sign(payload)
 
        const data = {
            user: findUser,
            token
        }

        return data
    }
}