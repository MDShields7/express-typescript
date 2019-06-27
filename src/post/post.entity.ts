import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../user/user.entity';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne(() => User, (user: User) => user.posts)
  public author: User;
}

export default Post;
