import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ethers } from "ethers";

@Injectable()
export class AddressPipe implements PipeTransform<string> {
  transform(value: string): string {
    try {
      ethers.utils.getAddress(value);
      return value;
    } catch (_e) {
      throw new BadRequestException(`Validation failed (Address is expected)`);
    }
  }
}
