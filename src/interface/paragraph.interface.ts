import { Document } from 'mongoose';
export interface Paragraph extends Document {
  readonly qNumber: string;
  readonly btn_answer: string;
  readonly paragraph: string;
  readonly questions: Array<object>;
}
