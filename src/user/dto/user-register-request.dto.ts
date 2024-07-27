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

    @IsString()
    role: string ; 
  
    setName(name: string): UserRegisterDto{
      this.name = name;
      return this;
    }
    
    setUserName(userName: string): UserRegisterDto{
      this.userName = userName;
      return this;
    }
    
    setPassword(password: string): UserRegisterDto{
      this.password = password
      return this;
    }    
    setEmail(email: string): UserRegisterDto {
      this.email = email;
      return this;
    }
    setRole(role: string): UserRegisterDto {
      this.role = role;
      return this;
    }
    static copy(dto: UserRegisterDto): UserRegisterDto {
        const registerDto: UserRegisterDto = new UserRegisterDto();
        registerDto.userName = dto.userName;
        registerDto.email = dto.email;
        registerDto.name = dto.name;
        registerDto.password = dto.password;
        registerDto.role = dto.role;
        return registerDto;
      }
}