import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule } from '@app/common';
import { BookingsRepository } from './bookings.repository';
import { BookingDocument, BookingSchema } from './models/bookings.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: BookingDocument.name,
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
