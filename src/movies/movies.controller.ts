import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { MoviesService } from "./movies.service";
import { Roles } from "src/auth/config/roles.decorator";
import { MoviesRequestDto } from "./dto/movies-request-dto";


@Controller("movies")
@UseGuards(AuthGuard)
export class MoviesController{
    constructor(private readonly moviesService: MoviesService){}
   
    @Get()
    @Roles(['Usuario Regular','Administrador']) 
    async getMovies(){
      return this.moviesService.getMovies();
    }
  
    @Get(":id")
    @Roles(['Usuario Regular'])
    async getDetails(@Param('id')  id: number){
      return this.moviesService.getDetailsOfMovieById(id); // solo los usuarios con Rol "Usuarios Regulares"
    }
  
    @Roles(['Administrador'])
    @Post()
    async createMovie(
      @Body() moviesRequest: MoviesRequestDto
    ){
      return this.moviesService.createMovie(moviesRequest);
    }
  
    @Patch(':id')
    @Roles(['Administrador'])
    async updateMovie(@Param('id')id :number, @Body() updateMovieDto: MoviesRequestDto){ 
      return this.moviesService.updateMovie(id, updateMovieDto);
    }
  
    @Delete(':id')
    @Roles(['Administrador'])
    async deleteMovie(@Param('id')  id: number){
      return this.moviesService.deleteMovie(id)
    }
}