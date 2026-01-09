import { Transform } from 'class-transformer';

export class CreateBookingDto {
  @Transform(
    ({ value }: { value: string | number }) => {
      if (typeof value === 'number') new Date(value);
      if (typeof value === 'string') {
        const parsed = Date.parse(value);
        if (!isNaN(parsed)) return new Date(parsed);
      }
      throw new Error('Invalid Date formate');
    },
    { toClassOnly: true },
  )
  startDate: string;
}
