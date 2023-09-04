import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingsRepository } from './bookings.repository';
import { PAYMENTS_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepository: BookingsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(
    createReservationDto: CreateBookingDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          return this.bookingsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }

  async findAll() {
    return this.bookingsRepository.find({});
  }

  async findOne(_id: string) {
    return this.bookingsRepository.findOne({ _id });
  }

  async update(_id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingsRepository.findOneAndUpdate(
      { _id },
      { $set: updateBookingDto },
    );
  }

  async remove(_id: string) {
    return this.bookingsRepository.findOneAndDelete({ _id });
  }
}
