import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRegisterDto } from "./dto/user-register-request.dto";
import { UserResponseDto } from "./dto/user-register-response.dto";

@Controller("user")
export class UserController{
    constructor(private readonly userService: UserService) {}

@Post('register')
  async register(
    @Req() request: Request,
    @Body() userRegister: UserRegisterDto,
  ): Promise<UserResponseDto> {
    //const userId = request['user'].uid;
    //const email = request['user'].email;

    return await this.userService.register(
      "", //userId
      UserRegisterDto.copy(userRegister),
    );
  }

  @Get()
  async test(){
    return "Hello Fer desde userController"
  }
}