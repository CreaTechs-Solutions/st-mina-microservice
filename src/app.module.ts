import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
type Calendar = {
  id: string;
  name: string;
};
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
@Injectable()
export class AppModule {
  private ghlToken: string;
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.ghlToken = this.configService.get('GHL_API_TOKEN') ?? '';
  }

  async getAvailability(calendarId: string, startDate: Date, endDate?: Date) {
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
      `https://services.leadconnectorhq.com/calendars/${calendarId}/free-slots`,
    );
    url.search = query.toString();

    const response = await this.httpService.axiosRef.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.ghlToken}`,
      },
    });
  }
}
