/* eslint-disable @typescript-eslint/no-unused-vars */



import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateParagraphtDto } from '../../dto/create-paragraph.dto';
import { ParagraphService } from '../../service/paragraph/paragraph.service';
import { UpdateParagraphDto } from 'src/dto/update-paragraph.dto';

@Controller('paragraph')
export class ParagraphController {
  constructor(private readonly paragraphService: ParagraphService) {}
  @Post()
  async createParagraph(
    @Res() response,
    @Body() createParagraphDto: CreateParagraphtDto,
  ) {
    try {
      const newParagraph = await this.paragraphService.createParagraph(
        createParagraphDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'paragraph has been created successfully',
        newParagraph,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Paragraph not created!',
        error: err.message,
      });
    }
  }
  @Get()
  async gtAll(@Res() response) {
    try {
      const paragraphData = await this.paragraphService.readAll();
      return response.status(HttpStatus.OK).json({
        message: 'All paragraphs data found successfully',
        paragraphData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Put('/:id')
  async updateParagraph(
    @Res() response,
    @Param('id') paragraphId: string,
    @Body() UpdateParagraphDto: UpdateParagraphDto,
  ) {
    try {
      const existingParagraph = await this.paragraphService.updateParagraph(
        paragraphId,
        UpdateParagraphDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Paragraph has been successfully updated',
        existingParagraph,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:_id')
  async getStudent(@Res() response, @Param('_id') paragraphId: string) {
    try {
      const existingParagraph = await this.paragraphService.getParagraph(
        paragraphId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Paragraph found successfully',
        existingParagraph,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:_id')
  async deleteParagraph(@Res() response, @Param('_id') paragraphId: string) {
    try {
      const deletedParagraph = await this.paragraphService.deleteParagraph(
        paragraphId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Paragraph deleted successfully',
        deletedParagraph,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/export')
  async createJsonFile(@Res() response, @Body() paragraphsData) {
    try {
      //  console.log(paragraphsData);
      ///////////////create json//////////////////
      const newfolderName = await this.paragraphService.createJsonFile(
        paragraphsData,
      );
      console.log(newfolderName);

      //////////////////create zip folder/////////////////
      const zipFolder = await this.paragraphService.createZipFolder(
        newfolderName,
      );
      console.log('zipFolder', zipFolder);

      //  (await file).pipe(response);
      return response.status(HttpStatus.CREATED).json({
        message: 'json File successfully created',
        zipFolder: zipFolder,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: json File not created!',
        error: err.message,
      });
    }
  }
///////////////Download zip file/////////////////////////////////////
  @Get('/zip/folder/:zipFileName')
  async getFile(@Res() response, @Param('zipFileName') zipFileName: string) {
    try {
      //`zip_1680427714080.zip
      const file = this.paragraphService.getZipFile(zipFileName);
      //return new StreamableFile(file);
      (await file).pipe(response);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: json File not created!',
        error: err.message,
      });
    }
  }
}
