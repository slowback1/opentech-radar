import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { BuildableWebScraperConfig } from '@opentech-radar/types';

@Entity()
export class ScraperConfig {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name?: string;

  @Column('simple-json')
  config: BuildableWebScraperConfig;
}
