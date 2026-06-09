import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { CreateFileDto } from '../dto/file.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly uploadPath = path.join(process.cwd(), 'uploads');

  constructor(
    @InjectRepository(File)
    private readonly fileRepo: Repository<File>,
  ) {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async upload(data: {
    buffer: number[];
    mime: string;
    fileName: string;
    modelId: number;
  }): Promise<File> {
    const uniqueName = `${data.modelId}-${Date.now()}-${data.fileName}`;
    const filePath = path.join(this.uploadPath, uniqueName);

    const buffer = Buffer.from(data.buffer);
    fs.writeFileSync(filePath, buffer);

    const fileDto: CreateFileDto = {
      model_id: data.modelId,
      mime: data.mime,
      file_name: uniqueName,
    };

    const file = this.fileRepo.create(fileDto);
    return await this.fileRepo.save(file);
  }

  async getOne(id: number): Promise<{ file: File; buffer: number[] }> {
    const file = await this.fileRepo.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(`No se encuentra el archivo con id ${id}`);
    }

    const filePath = path.join(this.uploadPath, file.file_name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`El archivo físico no existe en disco`);
    }

    const buffer = fs.readFileSync(filePath);

    return { file, buffer: Array.from(buffer) };
  }

  async getByModel(modelId: number): Promise<File | null> {
    const file = await this.fileRepo.findOne({
      where: { model_id: modelId },
      order: { created_at: 'DESC' },
    });

    return file || null;
  }

  async delete(id: number): Promise<File> {
    const file = await this.fileRepo.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException(`No se encuentra el archivo con id ${id}`);
    }

    const filePath = path.join(this.uploadPath, file.file_name);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.fileRepo.remove(file);

    return file;
  }
}
