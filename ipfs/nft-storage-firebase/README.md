# NestJS Pinata-Firebase module

### Usage

```ts
@Module({
  imports: [
    NftStorageFirebaseModule.forRootAsync(NftStorageFirebaseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): INftStorageOptions => {
        const nftStorageApiToken = configService.get<string>("NFT_STORAGE_API_TOKEN", "");
        return {
          nftStorageApiToken,
        };
      },
    }),
  ],
})
export class ExampleModule {
}
```
