import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from '../controller';
import { StripeService } from '../services';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeCheckout {}
