import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity() 
export class FilterWords {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({type: 'varchar'})
    value?: string;
}