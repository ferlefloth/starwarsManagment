import { Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { MoviesService } from "./movies.service";
import { Roles } from "src/auth/config/roles.decorator";


@Controller("movies")
@UseGuards(AuthGuard)
export class MoviesController{
    constructor(private readonly moviesService: MoviesService){}
   
    @Get()
    @Roles(['Usuario Regular','Administrador']) 
    async getMovies(){
      return this.moviesService.getMovies();
    }
  
    @Get("all")
    @Roles(['Usuario Regular'])
    async getDetails(){
      return this.moviesService.getDetailsOfMovies(); // solo los usuarios con Rol "Usuarios Regulares"
    }
  
    @Roles(['Administrador'])
    @Post()
    async createMovie(){
  
      return this.moviesService.createMovie();//  solo los usuarios con el Rol "Administrador"
    }
  
    @Patch()
    @Roles(['Administrador'])
    async updateMovie(){ 
      return this.moviesService.updateMovie();//  solo los usuarios con el Rol "Administrador"
    }
  
    @Delete()
    @Roles(['Administrador'])
    async deleteMovie(){
      return this.moviesService.deleteMovie()
    }
}