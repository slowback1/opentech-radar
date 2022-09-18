import TextProcessor from './TextProcessor';
import { GetAttributeStep, GetDateStep } from '@opentech-radar/types';
import { ElementHandle, Page } from 'puppeteer';

export default class AttributeProcessor extends TextProcessor {
  override config: GetAttributeStep;

  protected override init() {
    this.config = AttributeProcessor.NormalizeConfig(this.config);
  }

  override async Process(element: Page | ElementHandle) {
    const childElement = await this.FindElement(element);
    const text = await this.GetAttribute(childElement);

    let transformed = this.Transform(text);

    return this.CompleteProcess(transformed);
  }

  protected async GetAttribute(element: ElementHandle): Promise<string> {
    if (!element) return '';

    return await element.evaluate((el, attr) => {
      return el.getAttribute(attr);
    }, (this.config as GetAttributeStep | GetDateStep).attributeName);
  }


  protected static NormalizeConfig(config: GetAttributeStep): GetAttributeStep {
    return {
      ...super.NormalizeConfig(config),
      attributeName: config.attributeName
    };
  }
}
