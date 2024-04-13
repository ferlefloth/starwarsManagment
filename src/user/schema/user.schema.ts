import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    userName: string;

    @Prop()
    role: string; // ver de hacerlo úno u otro
}

export const UserSchema = SchemaFactory.createForClass(User)