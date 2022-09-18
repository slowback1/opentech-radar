import { ElementHandle, Page } from 'puppeteer';
import { WebScraperStep } from '@opentech-radar/types';
import { Log } from '@opentech-radar/utilities';

export default abstract class BaseProcessor {
  constructor(public value: any, protected config: WebScraperStep) {
    this.init();
  }

  protected abstract init();

  abstract Process(element: Page | ElementHandle);

  protected async FindElements(
    element: Page | ElementHandle
  ): Promise<ElementHandle[]> {
    await element
      .waitForSelector(this.config.selector, { timeout: 500 })
      .catch((e) => Log(`No Elements Found for ${this.config.selector}`));

    return await element.$$(this.config.selector);
  }

  protected async FindElement(
    element: Page | ElementHandle
  ): Promise<ElementHandle> {
    let elementList = await this.FindElements(element);
    let index = this.config.elementIndex ?? 0;

    if (elementList.length >= index + 1) return elementList[index];

    return null;
  }

  protected async GetTextContent(element: ElementHandle): Promise<string> {
    if (!element) return '';

    return await element.evaluate((el) => el.textContent);
  }

  protected CompleteProcess(value: any) {
    if (this.config.writeToProperty) this.WriteValue(value);

    return this.value;
  }

  private WriteValue(value: any) {
    let property = this.config.writeToProperty;

    if (this.value[property]) {
      let currentValueIsArray = Array.isArray(this.value[property]);
      let newValueIsArray = Array.isArray(value);
      if (currentValueIsArray && newValueIsArray)
        this.value[property].push(...value);
    } else {
      this.value[property] = value;
    }
  }

  protected static NormalizeConfig(config: WebScraperStep): WebScraperStep {
    return {
      type: config.type,
      selector: config.selector,
      writeToProperty: config.writeToProperty ?? '_',
      elementIndex: config.elementIndex ?? 0,
    };
  }
}
