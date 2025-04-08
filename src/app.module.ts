import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostProcessorModule } from './modules/post-processor/post-processor.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostProcessorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
