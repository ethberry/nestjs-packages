import { HttpException, HttpStatus } from "@nestjs/common";

export class PaymentRequiredException extends HttpException {
  constructor(objectOrError = "Payment required") {
    super(objectOrError, HttpStatus.PAYMENT_REQUIRED);
  }
}
