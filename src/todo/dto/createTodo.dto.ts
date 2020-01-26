import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsOptional,
  Length,
  IsArray
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class createTodoDto {
  ownerId: String;

  @ApiPropertyOptional({
    description: "list id this item belong to"
  })
  @IsOptional()
  @Length(24)
  listId: String;

  @ApiPropertyOptional({
    description: "list people to share with"
  })
  @IsOptional()
  @IsArray()
  @IsString({
    each: true
  })
  @Length(24, 24, { each: true })
  sharedWith: [String];

  @IsEmpty()
  created: Date;

  @IsOptional()
  @IsBoolean()
  isTrash: Boolean;

  @IsOptional()
  @IsBoolean()
  isCompleted: Boolean;

  @ApiProperty({
    description: "importance of todo"
  })
  @IsNumber()
  @Min(0)
  @Max(3)
  urgency: Number;

  @ApiProperty({
    description: "text of todo"
  })
  @IsNotEmpty()
  text: String;
}
