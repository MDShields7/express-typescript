import { IsBoolean, IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public name: string;

  @IsBoolean()
  public admin: boolean;
}

export default CreateUserDto;
