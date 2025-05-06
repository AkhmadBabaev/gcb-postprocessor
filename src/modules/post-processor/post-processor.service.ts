import { Injectable, OnModuleInit } from '@nestjs/common';

const postProcessorMethodPathEnvField = 'POST_PROCESSOR_METHOD_FILE';
const postProcessorMethodPathDefault = './post-processor.method';

@Injectable()
export class PostProcessorService implements OnModuleInit {
  private postProcessor;

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

  async onModuleInit() {
    const postProcessorMethodPath =
      process.env[postProcessorMethodPathEnvField] ||
      postProcessorMethodPathDefault;
    this.postProcessor = (
      await import(postProcessorMethodPath)
    ).postProcessorMethod;
  }
}
