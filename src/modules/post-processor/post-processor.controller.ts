import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostProcessorService } from './post-processor.service';
import { AuthTokenGuard } from '../../core/guards/auth.token.guard';

@Controller('post-processor')
export class PostProcessorController {
  constructor(private readonly postProcessorService: PostProcessorService) {}

  @Post('/')
  @UseGuards(AuthTokenGuard)
  main(@Body() body: any) {
    console.log('Request body:', body)
    return this.postProcessorService.main(
      body.originalText,
      body.correctedText,
    );
  }
}
