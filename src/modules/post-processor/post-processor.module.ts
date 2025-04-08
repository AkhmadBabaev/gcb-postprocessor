import { Module } from '@nestjs/common';
import { PostProcessorController } from './post-processor.controller';
import { PostProcessorService } from './post-processor.service';

@Module({
  controllers: [PostProcessorController],
  providers: [PostProcessorService],
})
export class PostProcessorModule {}
