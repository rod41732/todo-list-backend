import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: String;
}