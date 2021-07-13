import {Express, NextFunction} from "express";
import {ExpressAdapter, NestExpressApplication} from "@nestjs/platform-express";
import {Controller, Get, INestApplication, Module, RequestMethod} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import supertest from "supertest";

import {createModule} from "./index";

let app: INestApplication;

async function prepareServer(testModule: any): Promise<Express> {
  app = await NestFactory.create<NestExpressApplication>(testModule, new ExpressAdapter(), {
    logger: false,
  });
  const server: Express = app.getHttpServer();

  await app.init();
  return server;
}

const params = {foo: "bar"};

afterEach(async () => {
  await app.close();
});

describe(ExpressAdapter.name, () => {
  it("forRoot() calls with empty object", async () => {
    const createMiddleware = jest.fn(_params => (_req: any, _res: any, next: NextFunction) => {
      next();
    });

    const fooModule = createModule(createMiddleware);

    @Controller("/")
    class TestController {
      @Get()
      get() {}
    }

    @Module({
      imports: [fooModule.forRoot()],
      controllers: [TestController],
    })
    class TestModule {}

    const server = await prepareServer(TestModule);

    await supertest(server).get("/");

    expect(createMiddleware).toHaveBeenCalledWith({});
  });

  it("forRoot() arguments are correct", async () => {
    const createMiddleware = jest.fn(_params => (_req: any, _res: any, next: NextFunction) => {
      next();
    });

    const fooModule = createModule(createMiddleware);

    @Controller("/")
    class TestController {
      @Get()
      get() {}
    }

    @Module({
      imports: [fooModule.forRoot(params)],
      controllers: [TestController],
    })
    class TestModule {}

    const server = await prepareServer(TestModule);

    await supertest(server).get("/");

    expect(createMiddleware).toHaveBeenCalledWith(params);
  });

  it("forRootAsync() arguments are correct", async () => {
    const createMiddleware = jest.fn(_params => (_req: any, _res: any, next: NextFunction) => {
      next();
    });

    const fooModule = createModule(createMiddleware);

    @Controller("/")
    class TestController {
      @Get()
      get() {}
    }

    @Module({
      imports: [fooModule.forRootAsync({useFactory: () => params})],
      controllers: [TestController],
    })
    class TestModule {}

    const server = await prepareServer(TestModule);

    await supertest(server).get("/");

    expect(createMiddleware).toHaveBeenCalledWith(params);
  });

  it("createModule callback returning array works correct", async () => {
    const m1 = jest.fn();
    const m2 = jest.fn();

    const createMiddleware = jest.fn(_params => [
      (_req: any, _res: any, next: NextFunction) => {
        m1();
        next();
      },
      (_req: any, _res: any, next: NextFunction) => {
        m2();
        next();
      },
    ]);

    const fooModule = createModule(createMiddleware);

    @Controller("/")
    class TestController {
      @Get()
      get() {} // tslint:disable-line: no-empty
    }

    @Module({
      imports: [fooModule.forRoot(params)],
      controllers: [TestController],
    })
    class TestModule {}

    const server = await prepareServer(TestModule);

    await supertest(server).get("/");

    expect(m1.mock.calls).toHaveLength(1);
    expect(m2.mock.calls).toHaveLength(1);
    expect(createMiddleware).toHaveBeenCalledWith(params);
  });

  it("routing arguments are correct", async () => {
    const countFn = jest.fn();

    const createMiddleware = jest.fn(_params => (_req: any, _res: any, next: NextFunction) => {
      countFn();
      next();
    });

    const fooModule = createModule(createMiddleware);

    @Controller("/")
    class TestController {
      @Get("allow")
      allowed() {}

      @Get("forbid")
      forbidden() {}
    }

    @Module({
      imports: [
        fooModule.forRoot({
          forRoutes: [TestController],
          exclude: [{method: RequestMethod.ALL, path: "forbid"}],
          ...params,
        }),
      ],
      controllers: [TestController],
    })
    class TestModule {}

    const server = await prepareServer(TestModule);

    await supertest(server).get("/allow");
    await supertest(server).get("/forbid");

    expect(createMiddleware).toHaveBeenCalledWith(params);
    expect(countFn).toHaveBeenCalledTimes(1);
  });
});
