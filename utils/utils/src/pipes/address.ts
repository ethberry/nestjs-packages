import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class AddressPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (/^0x[0-9a-fA-F]{40}$/.test(value)) {
      return value.toLowerCase();
    } else {
      throw new BadRequestException(`Validation failed (Address is expected)`);
    }
  }
}
