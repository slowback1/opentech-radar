import { GetDateStep } from '@opentech-radar/types';
import { ElementHandle, Page } from 'puppeteer';
import AttributeProcessor from './AttributeProcessor';

export default class DateProcessor extends AttributeProcessor {
  override config: GetDateStep;

  protected init() {
    this.config = DateProcessor.NormalizeConfig(this.config);
  }

  async Process(element: Page | ElementHandle) {
    const childElement = await this.FindElement(element);

    let textValue: string;

    if (this.config.attributeName)
      textValue = await this.GetAttribute(childElement);
    else
      textValue = await this.GetTextContent(childElement);

    let transformed = this.Transform(textValue);

    return this.CompleteProcess(DateProcessor.ParseDate(transformed));
  }

  private static ParseDate(str: string) {
    if (str) {
      let date = new Date(Date.parse(str));
      date.setHours(0, 0, 0, 0);

      return date;
    }
    return '';
  }


  protected static NormalizeConfig(config: GetDateStep): GetDateStep {
    return {
      ...super.NormalizeConfig(config),
      dateFormat: config.dateFormat ?? 'MM/DD/YYYY',
      isRelativeDate: config.isRelativeDate ?? false
    };
  }
}
