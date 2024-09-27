# NestJS Firebase module

### Usage

```ts
@Module({
  imports: [
    FirebaseModule.forRootAsync(FirebaseModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IFirebaseOptions => {
        const bucket = configService.get<string>("FIREBASE_STORAGE_BUCKET", "");
        return {
          bucket,
        };
      },
    }),
  ],
})
export class ExampleModule {}
```
