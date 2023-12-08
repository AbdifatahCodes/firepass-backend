import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  generateUUID() {
      this.uuid = uuidv4();
  }
}
