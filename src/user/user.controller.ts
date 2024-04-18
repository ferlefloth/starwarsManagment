import { Body, Controller, Delete, Get, Patch, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterAuthDto } from "src/auth/dto/register-auth.dto";

@Controller("user") 
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() userObject: RegisterAuthDto){
      return this.userService.register(userObject);
  }
}