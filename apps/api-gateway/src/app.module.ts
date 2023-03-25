import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'api_gateway_app',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api_gateway_client_01',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'api_gateway_group_ag',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
