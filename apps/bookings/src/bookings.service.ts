import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsRepository } from './bookings.repository';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingsRepository: BookingsRepository) {}

  create(createBookingDto: CreateBookingDto, userId: string) {
    return this.bookingsRepository.create({
      ...createBookingDto,
      timestamp: new Date(),
      userId,
    });
  }

  findAll() {
    return this.bookingsRepository.find({});
  }

  findOne(_id: string) {
    return this.bookingsRepository.findOne({ _id });
  }

  update(_id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingsRepository.findOneAndUpdate(
      { _id },
      { $set: updateBookingDto },
    );
  }

  remove(_id: string) {
    return this.bookingsRepository.findOneAndDelete({ _id });
  }
}
