import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from '@app/common';
import { BookingsRepository } from './bookings.repository';
import { BookingDocument, BookingSchema } from './models/bookings.schema';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: BookingDocument.name,
        schema: BookingSchema,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
