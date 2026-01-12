import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as dto from './dto/index';
import { throwError } from 'rxjs';

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
  async createUserContact(@Body() contactInfoDto: dto.CreateContactingDto) {
    try {
      const response = await this.appService.createContact(contactInfoDto);
      console.log('Contact creation response:', response);
      return {
        message: 'Contact created successfully',
        contactId: response.contact.id,
        name: contactInfoDto.firstName + ' ' + contactInfoDto.lastName,
      };
    } catch (error) {
      throw new Error(
        `Error creating client contact: ${error} ${error.response?.data ? JSON.stringify(error.response.data) : ''}`,
      );
    }
  }

  @Post('booking')
  async bookAppointment(@Body() appointmentInfoDto: dto.CreateBookingDto) {
    try {
      const response =
        await this.appService.bookAppointment(appointmentInfoDto);
      console.log('Booking response data:', response);
      return JSON.parse(JSON.stringify(response.data));
    } catch (error) {
      console.error('Booking error response:', error.response?.data || error);
      throw new Error(
        `Error booking appointment: ${error} ${
          error.response?.data ? JSON.stringify(error.response.data) : ''
        }`,
      );
    }
  }
}
