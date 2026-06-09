import { Controller, ParseIntPipe } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({ cmd: 'upload_file' })
  async upload(
    @Payload()
    data: {
      buffer: number[];
      mime: string;
      fileName: string;
      modelId: number;
    },
  ) {
    const file = await this.filesService.upload(data);

    const datos = {
      data: file,
      message: 'Archivo subido con éxito',
    };

    return datos;
  }

  @MessagePattern({ cmd: 'get_file' })
  async getOne(@Payload(ParseIntPipe) id: number) {
    return await this.filesService.getOne(id);
  }

  @MessagePattern({ cmd: 'get_file_by_model' })
  async getByModel(@Payload(ParseIntPipe) modelId: number) {
    const file = await this.filesService.getByModel(modelId);

    const datos = {
      data: file,
    };

    return datos;
  }

  @MessagePattern({ cmd: 'delete_file' })
  async delete(@Payload(ParseIntPipe) id: number) {
    const file = await this.filesService.delete(id);

    const datos = {
      data: file,
      message: 'Archivo eliminado con éxito',
    };

    return datos;
  }
}
