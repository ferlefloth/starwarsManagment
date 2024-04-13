import { Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { MoviesService } from "./movies.service";


@Controller("movies")
export class MoviesController{
    constructor(private readonly moviesService: MoviesService){}
   
    @UseGuards(AuthGuard)
    @Get()
    async getMovies(){
      return this.moviesService.getMovies();
    }
  
    @UseGuards(AuthGuard)
    @Get()
    async getDetails(){
      return this.moviesService.getDetailsOfMovies(); // solo los usuarios con Rol "Usuarios Regulares"
    }
  
    @UseGuards(AuthGuard)
    @Post()
    async createMovie(){
  
      return this.moviesService.createMovie();//  solo los usuarios con el Rol "Administrador"
    }
  
    @UseGuards(AuthGuard)
    @Patch()
    async updateMovie(){ 
      return this.moviesService.updateMovie();//  solo los usuarios con el Rol "Administrador"
    }
}