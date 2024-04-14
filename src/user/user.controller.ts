import { Body, Controller, Delete, Get, Patch, Post, Req, SetMetadata, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterDto } from "./dto/user-register-request.dto";
import { UserResponseDto } from "./dto/user-register-response.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/config/roles.decorator";


@Controller("user") //TODO mejorar validaciónes en controllers
@UseGuards(AuthGuard)
export class UserController{
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(['Usuario Regular','Administrador']) 
  async getMovies(){
    return this.userService.getMovies();
  }

  @Get("all")
  @Roles(['Usuario Regular'])
  async getDetails(){
    return this.userService.getDetailsOfMovies(); // solo los usuarios con Rol "Usuarios Regulares"
  }

  @Roles(['Administrador'])
  @Post()
  async createMovie(){

    return this.userService.createMovie();//  solo los usuarios con el Rol "Administrador"
  }

  @Patch()
  @Roles(['Administrador'])
  async updateMovie(){ 
    return this.userService.updateMovie();//  solo los usuarios con el Rol "Administrador"
  }

  @Delete()
  @Roles(['Administrador'])
  async deleteMovie(){
    return this.userService.deleteMovie()
  }
}