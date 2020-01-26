import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: String;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: String;
}