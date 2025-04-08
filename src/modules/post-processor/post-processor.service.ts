import { Injectable } from '@nestjs/common';
import { mock } from './mock';

@Injectable()
export class PostProcessorService {
  private postProcessor;

  constructor() {
    this.postProcessor = mock;
  }

  async main(
    originalText: string,
    correctedText: string,
  ): Promise<
    Array<{
      id: number;
      from: number;
      to: number;
      insert?: string;
    }>
  > {
    const processed = await this.postProcessor(originalText, correctedText);
    console.log(
      'Post processor service. Original text:',
      originalText,
      'Corrected:',
      correctedText,
    );
    return processed;
  }
}
