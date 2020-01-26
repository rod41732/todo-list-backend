import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  Max
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class updateTodoDto {
  // @ApiProperty({
  //   description: "list id this item belong to"
  // })
  // @IsNotEmpty()
  // listId: String;

  // @IsString({
  //   each: true,
  // })
  // sharedWith: [String];

  // @IsEmpty()
  // created: Date;

  @ApiProperty()
  @IsBoolean()
  isTrash: Boolean;

  @ApiProperty()
  @IsBoolean()
  isCompleted: Boolean;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(3)
  urgency: Number;

  @ApiProperty()
  @IsNotEmpty()
  text: String;
}
