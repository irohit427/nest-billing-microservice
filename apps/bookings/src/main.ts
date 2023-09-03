import { NestFactory } from '@nestjs/core';
import { BookingsModule } from './bookings.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  await app.listen(3000);
}
bootstrap();
