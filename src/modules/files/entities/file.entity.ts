import { Column, Entity } from 'typeorm';

@Entity('files.file')
export class File {
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  files: string;
}
