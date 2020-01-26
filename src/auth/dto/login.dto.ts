import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class loginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: String;
}
