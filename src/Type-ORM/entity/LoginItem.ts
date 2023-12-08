import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class LoginItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  uid: string;

  @Column({ type: "uuid" })
  uuid: string; // Set this from the User entity

  @Column()
  creationDate: Date;

  @Column()
  revisionDate: Date;

  @Column()
  lastUsed: Date;

  @Column()
  domain: string;

  @Column()
  username: string;

  @Column()
  password: string; // Consider encrypting this

  @Column()
  uri: string;

  @Column()
  notes: string;

  @Column()
  movedToTrash: boolean = false;

  @BeforeInsert()
  generateUUID() {
      this.uid = uuidv4();
  }
}
