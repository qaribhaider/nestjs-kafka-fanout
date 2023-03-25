import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let mockClient: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    // Mock the `Math.random` function to always return 0.5
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'api_gateway_app',
          useFactory: () => ({
            emit: jest.fn(),
          }),
        },
      ],
    }).compile();

    // Get the instance of the controller, service, and Kafka client mock
    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
    mockClient = moduleRef.get('api_gateway_app');
  });

  afterEach(() => {
    // Restore the original implementation of the `Math.random` function
    jest.restoreAllMocks();
  });

  it('should emit message to topic_01', async () => {
    // Define a mock message with a fixed `rand` property value
    const mockMsg = {
      item_01: 'here is a test val',
      rand: 500, // use a fixed value instead of Math.random
      date: new Date().toString(),
    };

    // Call the test function on the controller
    await appController.testKafka();

    // Verify that the Kafka client mock's `emit` function was called with the correct arguments
    expect(mockClient.emit).toHaveBeenCalledWith('topic_01', mockMsg);
  });
});
