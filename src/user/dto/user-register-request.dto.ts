import {
    IsEmail,
    IsString,
  } from 'class-validator';

export class UserRegisterDto{

    @IsString()
    userName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    name: string;

    @IsString()
    password: string;
  

    setEmail(email: string): UserRegisterDto {
      this.email = email;
      return this;
    }
    static copy(dto: UserRegisterDto): UserRegisterDto {
        const registerDto: UserRegisterDto = new UserRegisterDto();
        registerDto.userName = dto.userName;
        registerDto.email = dto.email;
        registerDto.name = dto.name;
        registerDto.password = dto.password
        return registerDto;
      }
}