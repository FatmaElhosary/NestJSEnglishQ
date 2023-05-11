
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParagraphtDto {
  @IsString()
  @IsNotEmpty()
  readonly qNumber: string;
  @IsString()
  @IsNotEmpty()
  readonly btn_answer: string;
  @IsString()
  readonly paragraph: string;
  @IsNotEmpty()
  readonly questions: Array<object>;
}
