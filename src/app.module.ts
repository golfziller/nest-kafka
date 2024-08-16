import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafakaModule } from './kafaka/kafaka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [KafakaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
