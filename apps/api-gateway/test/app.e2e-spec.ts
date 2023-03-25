import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/kafka-test (GET)', async () => {
    jest.setTimeout(30000);

    const res = await request(app.getHttpServer()).get('/kafka-test');

    // Verify that the response status code is 200 OK
    expect(res.status).toBe(200);

    // Verify that the response body has the expected structure and values
    expect(res.body).toEqual([
      {
        topicName: expect.any(String),
        partition: expect.any(Number),
        errorCode: 0,
        baseOffset: expect.any(String),
        logAppendTime: expect.any(String),
        logStartOffset: expect.any(String),
      },
    ]);
  });
});
