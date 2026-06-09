import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'files', name: 'file' })
export class File {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int4', nullable: false })
  model_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  mime: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  file_name: string;
}
