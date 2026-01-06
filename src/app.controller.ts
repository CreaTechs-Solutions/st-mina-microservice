import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppModule } from './app.module';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private appModule: AppModule,
  ) {}

  @Get('availability')
  async getAvailability(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    try {
      const response = await this.appModule.fetchAvailability(
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
