# NestJS Infura-Firebase module

### Usage

```ts
@Module({
  imports: [
    InfuraFirebaseModule.forRootAsync(InfuraFirebaseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IInfuraOptions => {
        const infuraId = configService.get<string>("INFURA_ID", "");
        const infuraSecretKey = configService.get<string>("INFURA_SECRET_KEY", "");
        return {
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
          headers: {
            authorization: "Basic " + Buffer.from(infuraId + ":" + infuraSecretKey).toString("base64"),
          },
        };
      },
    }),
  ],
})
export class ExampleModule {
}
```
