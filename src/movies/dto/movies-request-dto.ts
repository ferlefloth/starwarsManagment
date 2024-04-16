import { IsArray, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class MoviesRequestDto{
    
    @IsString()
    title: string;
    
    @IsNumber()
    episode_id: number;
    
    @IsString()
    opening_crawl: string;
    
    @IsString()
    director: string;
    
    @IsString()
    producer: string;     
    
    @IsDateString()
    release_date: Date;
    
    @IsArray()
    @IsString({ each: true })
    characters: string[];
    
    @IsArray()
    @IsString({ each: true })
    planets: string[];    
    
    @IsArray()
    @IsString({ each: true })
    vehicles: string[];
    
    @IsDateString()
    created: Date;    
    
    @IsDateString()
    edited: Date;
}