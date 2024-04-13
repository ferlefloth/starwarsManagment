import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterDto } from "./dto/user-register-request.dto";
import { UserResponseDto } from "./dto/user-register-response.dto";
import { AuthGuard } from "src/auth/auth.guard";


@Controller("user")
export class UserController{
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getMovies(){
    return this.userService.getMovies();
  }

  @UseGuards(AuthGuard)
  @Get()
  async getDetails(){
    return this.userService.getDetailsOfMovies(); // solo los usuarios con Rol "Usuarios Regulares"
  }

  @UseGuards(AuthGuard)
  @Post()
  async createMovie(){

    return this.userService.createMovie();//  solo los usuarios con el Rol "Administrador"
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateMovie(){ 
    return this.userService.updateMovie();//  solo los usuarios con el Rol "Administrador"
  }
}