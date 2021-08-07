declare module "logdna-winston" {
  import TransportStream, { TransportStreamOptions } from "winston-transport";
  import { ConstructorOptions } from "@logdna/logger";

  type LogDNATransportOptions = Omit<ConstructorOptions, "level"> &
    TransportStreamOptions & {
      key?: string;
    };

  class LogDNATransport extends TransportStream {
    constructor(options: LogDNATransportOptions);
  }

  export = LogDNATransport;
}
