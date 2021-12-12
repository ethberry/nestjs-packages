import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ToLowerCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase();
  }
}
