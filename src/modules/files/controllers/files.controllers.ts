import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FilesService } from '../services/files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  getAll() {
    return this.filesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.getOne(id);
  }
}
