import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateContactingDto } from './dto/contact.dto';

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

  @Post('contact')
  async createUserContact(@Body() contactInfoDto: CreateContactingDto) {
    try {
      const response = await this.appService.createContact(contactInfoDto);
    } catch (error) {
      throw new Error(
        `Error creating client contact: ${error} ${error.response?.data ? JSON.stringify(error.response.data) : ''}`,
      );
    }
  }

  @Post('booking')
  async bookAppointment() {}
}
