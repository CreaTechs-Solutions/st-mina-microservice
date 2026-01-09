import {
  isNotEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateContactingDto {
  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;

  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  lastName: string;
}
