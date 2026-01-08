import { Controller, Get, ParseDatePipe, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('availability')
  async getAvailability(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: string,
  ) {
    try {
      const response = await this.appService.fetchAvailability(
        new Date(startDate),
        endDate ? new Date(endDate) : undefined,
      );
      return response;
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        response: error.response?.data || error,
      };
    }
  }
}
