import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class MoviesRequestDto{
    
    @IsString()
    @IsOptional()
    title: string;
    
    @IsNumber()
    @IsOptional()
    episode_id: number;
    
    @IsString()
    @IsOptional()
    opening_crawl: string;
    
    @IsString()
    @IsOptional()
    director: string;
    
    @IsString()
    @IsOptional()
    producer: string;     
    
    @IsDateString()
    @IsOptional()
    release_date: Date;
    
    @IsArray()    
    @IsString({ each: true })
    @IsOptional()
    characters: string[];
    
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    planets: string[];    
    
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    vehicles: string[];
    
    @IsDateString()
    @IsOptional()
    created: Date;    
    
    @IsDateString()
    @IsOptional()
    edited: Date;
}