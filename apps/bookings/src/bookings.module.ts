import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { BookingsRepository } from './bookings.repository';
import { BookingDocument, BookingSchema } from './models/bookings.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: BookingDocument.name,
        schema: BookingSchema,
      },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
