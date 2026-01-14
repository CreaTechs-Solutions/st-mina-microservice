import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateContactingDto {
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('US', {
    message: 'Phone number must be a valid US phone number',
  })
  phone: string;

  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(2)
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(2)
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
