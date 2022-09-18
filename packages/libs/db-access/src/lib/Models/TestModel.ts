import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class TestModel {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({ type: 'varchar' })
  value?: string;
}
