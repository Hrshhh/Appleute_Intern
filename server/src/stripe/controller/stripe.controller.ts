import { Controller, Post, Body, Res } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';
import { CartItem } from '../prop';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('checkout-session')
  async createCheckoutSession(
    @Body() body: { products: CartItem },
    @Res() res: any,
  ) {
    const session = await this.stripeService.createCheckoutSession(
      body.products,
    );
    return res.json({ id: session.id });
  }
}
