import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controllers';
import { FilesService } from './services/files.service';

@Module({
  imports: [FilesModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [],
})
export class FilesModule {}
