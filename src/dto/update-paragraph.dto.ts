/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateParagraphtDto } from './create-paragraph.dto';

export class UpdateParagraphDto extends PartialType(CreateParagraphtDto) {}
