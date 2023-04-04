import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import {Document } from "mongoose";

@Schema()
export class Paragraph {
  @Prop()
  qNumber: string;
  @Prop()
  btn_answer: string;
  @Prop()
  paragraph: string;
  @Prop()
  questions: [
    {
      question: string;
      answers: [
        {
          answer: string;
          why: [{ key: string }];
        },
      ];
    },
  ];
}
export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);
