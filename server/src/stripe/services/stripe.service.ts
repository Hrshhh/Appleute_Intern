import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('sk_test_51Ox2rVSGw934jnQ4apajh3BwU21Pz4dYfJVyIUl3E0GDdQGsRpURTdGRR1NDRBvhXAV2utQG2rLLdrMw6VN4DSx900DkcWyEtL', {
        apiVersion: '2023-10-16',
      });
  }

  async createCheckoutSession(products: any) {
    console.log("sf", products);
    const lineItems = products?.map((product: any) => ({
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