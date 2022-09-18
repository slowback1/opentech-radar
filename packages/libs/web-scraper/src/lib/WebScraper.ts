import { WebScraperConfig } from '@opentech-radar/types';
import { BrowserBoy } from '@opentech-radar/utilities';
import { Page } from 'puppeteer';
import ProcessorFactory from './Processors/ProcessorFactory';

export class WebScraper {
  constructor(private config: WebScraperConfig) {}

  private browser: BrowserBoy;
  private page: Page;
  private value: any;

  private async initBrowser() {
    this.browser = new BrowserBoy();
    await this.browser.Start();
    this.page = await this.browser.NewPage(
      this.config.source,
      this.config.loadOptions
    );
  }

  private async cleanupBrowser() {
    await this.browser.End();
  }

  async Process() {
    await this.initBrowser();
    this.value = {};

    await this.ProcessSteps();

    await this.cleanupBrowser();

    return this.value;
  }

  private async ProcessSteps() {
    await Promise.all(
      this.config.steps.map(async (step) => {
        let processor = ProcessorFactory(this.value, step);

        this.value = await processor.Process(this.page);

        return Promise.resolve();
      })
    );
  }
}
