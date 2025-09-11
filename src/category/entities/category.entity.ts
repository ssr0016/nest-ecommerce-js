import {
  AfterUpdate,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from 'slugify';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column({ default: true })
  // isActive: boolean;

  // This is the another way how to delete a row
  @DeleteDateColumn()
  deletedDate: Date;

  @Column()
  slug: string; // SEO

  @BeforeInsert()
  @AfterUpdate()
  generateSlug() {
    const date = new Date();

    this.slug = `${slugify(this.name)}-${date.getTime()}`;
  }
}
