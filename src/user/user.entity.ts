import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Post from '../post/post.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public admin: boolean;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;
