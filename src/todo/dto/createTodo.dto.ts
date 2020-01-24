import { IsEmpty, IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, Min, Max, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class createTodoDto {
  ownerId: String;

  @ApiProperty({
    description: "list id this item belong to",
  })
  @IsNotEmpty()
  listId: String;

  @IsOptional()
  @ApiProperty({
    description: "list people to share with",
  })
  @IsString({
    each: true,
  })
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
    description: "importance of todo",
  })
  @IsNumber()
  @Min(0)
  @Max(3)
  urgency: Number;

  @ApiProperty({
    description: "text of todo",
  })
  @IsNotEmpty()
  text: String; 
}

