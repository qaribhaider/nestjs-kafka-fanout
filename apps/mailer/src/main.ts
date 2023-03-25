import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'api_gateway_client_01',
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'api_gateway_group_mailer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
