import { IsNotEmpty, IsEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createListDto {
  // user request shall not specify owner
  @IsEmpty()
  ownerId: String;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
