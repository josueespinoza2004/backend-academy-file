import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity('files.file')
export class File {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int4', nullable: false })
  model_id: number;

  @Column({ type: 'int8', nullable: false })
  user_id: number;

  @Column({ type: 'int8', nullable: false })
  user_updated_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  mime: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  file_name: string;
}
