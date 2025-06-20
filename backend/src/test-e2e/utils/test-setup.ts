import { GenericContainer, StartedTestContainer } from "testcontainers";
import { DataSource } from "typeorm";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AddressEntity } from "src/address/entities/address.entity";

type TestContext = {
  app: INestApplication;
  module: TestingModule;
  dataSource: DataSource;
  container: StartedTestContainer;
};

export async function setupTestApp(): Promise<TestContext> {
  const container = await new GenericContainer("postgres:17-alpine").withEnvironment(
    {
      POSTGRES_USER: "testuser",
      POSTGRES_PASSWORD: "testpass",
      POSTGRES_DB: "testdb",
    },
  ).withExposedPorts(5432).start();

  const port = container.getMappedPort(5432);
  const host = container.getHost();
  const module = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource)
    .useFactory({
      factory: () =>
        new DataSource({
          type: "postgres",
          host,
          port,
          username: "testuser",
          password: "testpass",
          database: "testdb",
          synchronize: true,
          entities: [AddressEntity],
        }),
    })
    .compile();

  const app = module.createNestApplication();
  app.setGlobalPrefix("api");
  await app.init();


  const dataSource = module.get(DataSource);

  return {
    app,
    module,
    dataSource,
    container,
  };
}

export async function teardownTestApp(context: TestContext) {
  await context.dataSource.destroy();
  await context.app.close();
  await context.container.stop();
}
