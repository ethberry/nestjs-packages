import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class BigIntPipe implements PipeTransform<string> {
  transform(value: string): bigint {
    try {
      return BigInt(value);
    } catch (e) {
      void e;
      throw new BadRequestException(`Validation failed (BigInt is expected)`);
    }
  }
}
