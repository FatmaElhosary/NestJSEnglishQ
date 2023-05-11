import { Module } from '@nestjs/common';
/* import { ConfigModule } from '@nestjs/config'; */
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParagraphSchema } from './schema/paragraph.schema';
import { ParagraphController } from './controller/paragraph/paragraph.controller';
import { ParagraphService } from './service/paragraph/paragraph.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    //mongodb+srv://fatma:fatma@cluster0.3qrlv.mongodb.net/?retryWrites=true&w=majority
    //mongodb://localhost:27017/paragraphdb
    //'mongodb+srv://fatma:fatma@cluster0.3qrlv.mongodb.net/?retryWrites=true&w=majority',{dbName: 'EnglishDB'}
    MongooseModule.forRoot('mongodb+srv://fatma:fatma@cluster0.3qrlv.mongodb.net/?retryWrites=true&w=majority',{dbName: 'EnglishDB'}),
    MongooseModule.forFeature([{ name: 'Paragraph', schema: ParagraphSchema }]),
    
  ],
  controllers: [AppController, ParagraphController],
  providers: [AppService, ParagraphService],
})
export class AppModule {}
