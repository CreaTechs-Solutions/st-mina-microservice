import { Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookingDto {
  @Transform(
    ({ value }: { value: string | number | Date }) => {
      if (value instanceof Date) return value;
      if (typeof value === 'number') return new Date(value);
      if (typeof value === 'string') {
        const parsed = Date.parse(value);
        if (!isNaN(parsed)) return new Date(parsed);
      }
      throw new Error('Invalid Date format');
    },
    { toClassOnly: true },
  )
  @IsNotEmpty({ message: 'Start date is required' })
  startDate: Date;

  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(2)
  title: string;

  notes: string;

  @IsNotEmpty({ message: 'Contact ID is required' })
  contactId: string;
}
