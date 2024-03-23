import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { StripeController } from "../controller/stripe.controller";
import { StripeService } from "../services/stripe.service";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [StripeController],
    providers: [StripeService]
})

export class StripeCheckout {}