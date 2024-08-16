import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092', 'localhost:9093'],
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.adminSetConfig();
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
  async adminSetConfig() {
    const admin = this.kafka.admin();
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: 'test',
          numPartitions: 2, // Number of partitions
          replicationFactor: 1, // Set replication factor according to your cluster
        },
      ],
      waitForLeaders: true,
    });
    await admin.disconnect();
  }
}
