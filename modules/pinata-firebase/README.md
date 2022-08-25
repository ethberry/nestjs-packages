# NestJS Pinata-Firebase module

### Usage

```ts
@Module({
  imports: [
    PinataFirebaseModule.forRootAsync(PinataFirebaseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IPinataOptions => {
        const pinataApiKey = configService.get<string>("PINATA_API_KEY", "");
        const pinataApiSecret = configService.get<string>("PINATA_API_SECRET", "");
        return {
          pinataApiKey,
          pinataApiSecret,
        };
      },
    }),
  ],
})
export class ExampleModule {
}
```
