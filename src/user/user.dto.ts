import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public name: string;

  @IsString()
  public admin: boolean;
}

export default CreateUserDto;
