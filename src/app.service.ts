import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
type Calendar = {
  id: string;
  name: string;
};
@Injectable()
export class AppService {
  private ghlToken: string;
  private calendarId: string;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.ghlToken = this.configService.get('GHL_API_TOKEN') ?? '';
    this.calendarId = this.configService.get('GHL_CALENDAR_ID') ?? '';
  }

  async fetchAvailability(startDate: Date, endDate?: Date) {
    const query = new URLSearchParams();

    query.set('startDate', startDate.getTime().toString());
    if (endDate) {
      query.set('endDate', endDate.getTime().toString());
    } else {
      const sevenDaysLater = new Date(startDate);
      sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
      query.set('endDate', sevenDaysLater.getDate().toString());
    }

    query.set('timezone', 'America/Chicago');
    query.set('ignoreDateRange', 'true');

    const url = new URL(
      `https://services.leadconnectorhq.com/calendars/${this.calendarId}/free-slots`,
    );
    url.search = query.toString();

    const response = await this.httpService.axiosRef.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.ghlToken}`,
        Version: '2021-04-15',
      },
    });
    return response.data;
  }
}
