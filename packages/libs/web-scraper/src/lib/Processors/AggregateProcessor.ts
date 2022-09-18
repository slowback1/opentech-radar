import BaseProcessor from './BaseProcessor';
import { ElementHandle, Page } from 'puppeteer';
import { AggregateStep } from '@opentech-radar/types';
import ProcessorFactory from './ProcessorFactory';

export default class AggregateProcessor extends BaseProcessor {
  override config: AggregateStep;

  async Process(element: Page | ElementHandle) {
    const elements = await this.FindElements(element);

    let values = await Promise.all(elements.map(async element => {
      let value = {};

      await Promise.all(this.config.steps.map(async (step) => {
        let processor = ProcessorFactory(value, step);
        value = await processor.Process(element);
        return Promise.resolve();
      }));

      return value;
    }));

    return this.CompleteProcess(values);
  }

  protected init() {
    this.config = AggregateProcessor.NormalizeConfig(this.config);
  }

  protected static NormalizeConfig(config: AggregateStep): AggregateStep {
    return {
      ...super.NormalizeConfig(config),
      steps: config.steps
    };
  }

}
