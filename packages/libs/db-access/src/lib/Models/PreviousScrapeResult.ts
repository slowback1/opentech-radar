import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PreviousScrapeResult {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar' })
  title?: string;
  @Column({ type: 'date' })
  date?: Date;
  @Column({ type: 'varchar' })
  link?: string;
}
