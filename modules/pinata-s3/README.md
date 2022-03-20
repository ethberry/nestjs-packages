# NestJS Pinata-S3 module

### Usage

```ts
@Module({
  imports: [
    PinataModule.forRootAsync(PinataModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IPinataOptions => {
        return {
           pinataApiKey: configService.get<string>("PINATA_API_KEY", "");
           pinataApiSecret: configService.get<string>("PINATA_API_SECRET", "");
        };
      },
    }),
  ],
})
export class ExampleModule {
}
```
