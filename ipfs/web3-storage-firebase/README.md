# NestJS Web3Storage-Firebase module

### Usage

```ts
@Module({
  imports: [
    Web3StorageFirebaseModule.forRootAsync(InfuraFirebaseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IWeb3StorageOptions => {
        const web3StorageApiToken = configService.get<string>("WEB3_STORAGE_API_TOKEN", "");
        return {
          web3StorageApiToken,
        };
      },
    }),
  ],
})
export class ExampleModule {
}
```
