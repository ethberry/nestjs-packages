import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { getAddress } from "ethers";

@Injectable()
export class AddressPipe implements PipeTransform<string> {
  transform(value: string): string {
    try {
      getAddress(value);
      return value.toLowerCase();
    } catch (e) {
      void e;
      throw new BadRequestException(`Validation failed (Address is expected)`);
    }
  }
}
