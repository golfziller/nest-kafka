import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './kafaka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      {
        topics: ['test'],
      },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            topic: topic,
            partition: partition,
            message: message.value.toString(),
          });
          fibonacci(40);
        },
      },
    );
  }

  // async readMessage({ t }) {}
}
export const fibonacci = (n) => {
  return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
};
