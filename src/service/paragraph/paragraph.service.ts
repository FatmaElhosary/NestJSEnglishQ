import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Paragraph } from 'src/interface/paragraph.interface';
import { Model } from 'mongoose';
import { CreateParagraphtDto } from '../../dto/create-paragraph.dto';
import { UpdateParagraphDto } from '../../dto/update-paragraph.dto';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createReadStream } from 'fs';
import fs = require('fs');
import fse = require('fs-extra');
import archiver = require('archiver');
@Injectable()
export class ParagraphService {
  constructor(
    @InjectModel('Paragraph') private paragraphModel: Model<Paragraph>,
  ) {}
  async createParagraph(
    createParagraphDto: CreateParagraphtDto,
  ): Promise<Paragraph> {
    const newParagraph = await new this.paragraphModel(createParagraphDto);
    return newParagraph.save();
  }

  async readAll(): Promise<Paragraph[]> {
    const paragraphData = await this.paragraphModel.find();
    if (!paragraphData || paragraphData.length == 0) {
      throw new NotFoundException('Paragraph data not found!');
    }
    return paragraphData;
  }

  async getParagraph(paragraId: string): Promise<Paragraph> {
    const existingParagraph = await this.paragraphModel
      .findById(paragraId)
      .exec();
    if (!existingParagraph) {
      throw new NotFoundException(`Student #${paragraId} not found`);
    }
    return existingParagraph;
  }

  async deleteParagraph(paragraId: string): Promise<Paragraph> {
    const deletedParagraph = await this.paragraphModel.findByIdAndDelete(
      paragraId,
    );
    if (!deletedParagraph) {
      throw new NotFoundException(`Paragraph #${paragraId} not found`);
    }
    return deletedParagraph;
  }
  async updateParagraph(
    paragraId: string,
    UpdateParagraphDto: UpdateParagraphDto,
  ): Promise<Paragraph> {
    const existingParagraph = await this.paragraphModel.findByIdAndUpdate(
      paragraId,
      UpdateParagraphDto,
      { new: true },
    );
    if (!existingParagraph) {
      throw new NotFoundException(`Paragraph #${paragraId} not found`);
    }
    return existingParagraph;
  }

  ////
  public async createJsonFile(paragraphsData: any): Promise<string> {
    ////////////////////////////create new folder in downloads//////////////////
    //front end project folder
    const newName = 'project_' + Date.now();
    const dir = `./downloads/${newName}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('folder created');
    } else {
      console.log('this folder name exist');
    }
    ////////////////copy front end project in that folder ///////////
    const srcDir = `./angular-emam-test`;
    const destDir = `./downloads/${newName}`;

    // To copy a folder or file, select overwrite accordingly
    try {
      fse.copySync(srcDir, destDir, { overwrite: true });
      console.log('success! copy folder');
    } catch (err) {
      console.error(err);
    }
    /* ///////////////////////////////////// */

    ///////////////////////create json File////////////////////
    this.createJsonFileInnewFolder(newName, paragraphsData);
    //this.createZipFolder(newName);
    return newName;
  }
  public async createZipFolder(folderName) {
    try {
      const newName = 'zip_' + Date.now() + '.zip';
      const output = fs.createWriteStream('./downloads/' + newName + '');

      const archive = archiver('zip');

      output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log(
          'archiver has been finalized and the output file descriptor has closed.',
        );
      });

      archive.on('error', function (err) {
        throw err;
      });

      archive.pipe(output);

      // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(`./downloads/${folderName}/`, false);

      archive.finalize();
      return newName;
    } catch (err) {
      console.log(err);
    }
  }

  public async createJsonFileInnewFolder(newName, paragraphsData) {
    //newName fronend project name
    try {
      await writeFile(
        join(process.cwd(), `./downloads/${newName}/assets`, 'english.json'),
        JSON.stringify(paragraphsData),
      );
      console.log('json created');
    } catch (err) {
      console.error(err);
    }
  }

  public getZipFile(fileName) {
    console.log(fileName);
    /* zip_1680427714080.zip */
    return createReadStream(join(process.cwd(), `./downloads/${fileName}`));
  }
}
