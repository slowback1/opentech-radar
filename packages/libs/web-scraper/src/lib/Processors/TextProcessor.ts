import BaseProcessor from './BaseProcessor';
import { ElementHandle, Page } from 'puppeteer';
import { GetTextStep, WebScraperStep } from '@opentech-radar/types';

export default class TextProcessor extends BaseProcessor {
  override config: GetTextStep;

  protected init() {
    this.config = TextProcessor.NormalizeConfig(this.config);
  }

  async Process(element: Page | ElementHandle) {
    const childElement = await this.FindElement(element);
    const text = await this.GetTextContent(childElement);

    let transformed = this.Transform(text);

    return this.CompleteProcess(transformed);
  }

  protected Transform(text: string) {
    if (this.config.transformRegexTo && this.config.transformRegexFrom) {
      let regexFrom = new RegExp(this.config.transformRegexFrom);

      text = text.replace(regexFrom, this.config.transformRegexTo);
    }

    return text.trim();
  }

  protected static NormalizeConfig(config: WebScraperStep): GetTextStep {
    return {
      ...super.NormalizeConfig(config),
      transformRegexFrom: (config as GetTextStep).transformRegexFrom,
      transformRegexTo: (config as GetTextStep).transformRegexTo,
    };
  }
}
