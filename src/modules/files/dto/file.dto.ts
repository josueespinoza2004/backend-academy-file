import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  @IsNotEmpty()
  model_id: number;

  @IsString()
  @IsNotEmpty()
  mime: string;

  @IsString()
  @IsNotEmpty()
  file_name: string;
}

export class UpdateFileDto {
  @IsNumber()
  @IsOptional()
  model_id?: number;

  @IsString()
  @IsOptional()
  mime?: string;

  @IsString()
  @IsOptional()
  file_name?: string;
}
