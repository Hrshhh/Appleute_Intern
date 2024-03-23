import { Module } from '@nestjs/common';
import { StripeCheckout } from 'src/stripe/registration';

@Module({
  imports: [StripeCheckout]
})
export class AppModule {}
