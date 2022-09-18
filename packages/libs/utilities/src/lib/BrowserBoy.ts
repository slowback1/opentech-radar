import * as puppeteer from 'puppeteer';
import { Browser, ElementHandle, Page } from 'puppeteer';
import { Log } from './Logger';
import { PageLoadOptions } from '@opentech-radar/types';

export class BrowserBoy {
  private _browser!: Browser;

  async Start(): Promise<Browser> {
    this._browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      ignoreHTTPSErrors: true,
    });
    return this._browser;
  }

  async End(): Promise<void> {
    await this._browser.close();
  }

  async NewPage(pageSource: string, pageOptions?: PageLoadOptions) {
    let normalizedPageOptions = BrowserBoy.normalizePageOptions(pageOptions);

    if (normalizedPageOptions.pageType === 'url')
      return await this.NewPageFromUrl(pageSource);

    return await this.NewPageFromContent(pageSource);
  }

  private static normalizePageOptions(
    pageOptions?: PageLoadOptions
  ): PageLoadOptions {
    let po: Partial<PageLoadOptions> = pageOptions ?? {};

    if (!po.pageType) po.pageType = 'url';

    return po as PageLoadOptions;
  }

  private async NewPageFromContent(content: string): Promise<Page> {
    let page = await this._browser.newPage();
    await page.setContent(content);
    return page;
  }

  private async NewPageFromUrl(url: string): Promise<Page> {
    let page = await this._browser.newPage();
    Log(`navigating to ${url}`);
    await page.goto(url);

    return page;
  }

  async GetSections(
    page: Page | ElementHandle,
    selector: string
  ): Promise<ElementHandle[]> {
    await page
      .waitForSelector(selector, { timeout: 500 })
      .catch((e) => Log('No items found for selector'));

    return await page.$$(selector);
  }

  async FindTextFromElement(
    element: ElementHandle,
    selector: string
  ): Promise<string> {
    let childElement = await element.$(selector);

    return this.GetTextContent(childElement);
  }

  async GetTextContent(element: ElementHandle): Promise<string> {
    if (!element) return '';

    return await element.evaluate((el) => el.textContent);
  }

  async GetAttribute(
    element: ElementHandle,
    attribute: string
  ): Promise<string> {
    if (!element) return '';

    return await element.evaluate((el, attr) => {
      return el.getAttribute(attr);
    }, attribute);
  }
}
