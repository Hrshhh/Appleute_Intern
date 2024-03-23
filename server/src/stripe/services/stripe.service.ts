import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CartItem } from '../prop';

@Injectable()
export class StripeService {
  private stripe: Stripe;

constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2023-10-16',
      },
    );
  }

  async createCheckoutSession(products: any) {
    const lineItems = products?.map((product: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product?.name,
          images: [product?.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product?.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3001',
      cancel_url: 'http://localhost:3001',
    });

    return session;
  }
}
