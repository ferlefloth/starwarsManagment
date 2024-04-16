import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MoviesDocument = HydratedDocument<Movies>

@Schema()
export class Movies{

    @Prop()
    title: string;

    @Prop()
    episode_id: number;

    @Prop()
    opening_crawl: string;

    @Prop()
    director: string;

    @Prop()
    producer: string; 

    @Prop()
    release_date: Date;

    @Prop()
    characters: string[];
    
    @Prop()
    planets: string[];

    @Prop()
    vehicles: string[];

    @Prop()
    created: Date;

    @Prop()
    edited: Date;
    
}
export const MoviesSchema = SchemaFactory.createForClass(Movies)
