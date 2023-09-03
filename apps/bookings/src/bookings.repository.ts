import { Injectable, Logger } from '@nestjs/common';
import { BookingDocument } from './models/bookings.schema';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookingsRepository extends AbstractRepository<BookingDocument> {
  protected readonly logger = new Logger(BookingsRepository.name);

  constructor(
    @InjectModel(BookingDocument.name)
    bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }
}
