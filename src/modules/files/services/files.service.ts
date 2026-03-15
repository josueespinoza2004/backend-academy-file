import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor() {}

  getAll() {
    return `Endpoint para retornar todos los archivos`;
  }

  getOne(id: number) {
    return `Esto retorna el archivo con id ${id}`;
  }
}
