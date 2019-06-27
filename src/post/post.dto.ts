import { IsNumber, IsString } from 'class-validator';
import CreateUserDto from '../user/user.dto';
import User from '../user/user.entity';

class CreatePostDto {
  @IsString()
  public content: string;

  @IsString()
  public title: string;

  // @IsNumber()
  // public author: number;
}

export default CreatePostDto;
