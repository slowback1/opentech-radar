import * as fs from 'fs';
import * as path from 'path';
import { BrowserBoy } from '@opentech-radar/utilities';
import { Browser, ElementHandle, Page } from 'puppeteer';

describe('BrowserBoy', () => {
  let browserBoy: BrowserBoy;
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    let testHtml = fs.readFileSync(path.resolve(__dirname, 'testData/TestNewsListing.html')).toString();
    browserBoy = new BrowserBoy();
    browser = await browserBoy.Start();
    page = await browserBoy.NewPage(testHtml, { pageType: 'raw_html' });
  });
  afterEach(() => {
    browserBoy.End();
  });

  it('can create a new page instance', () => {
    expect(page).not.toBeNull();
  });

  describe('GetSections', () => {
    it('can find multiple articles in the page', async () => {
      let sections = await browserBoy.GetSections(page, 'article');

      expect(sections.length).toEqual(3);
    });
    it('returns an empty array when the selector does not find anything', async () => {
      let sections = await browserBoy.GetSections(page, '.i-dont-exist');

      expect(Array.isArray(sections)).toBeTruthy();
      expect(sections.length).toEqual(0);
    });
  });


  describe('FindTextFromElement', () => {
    let section: ElementHandle<Element>;
    beforeEach(async () => {
      section = (await browserBoy.GetSections(page, 'article'))[0];
    });

    it('can get the title text of a section', async () => {
      let text = await browserBoy.FindTextFromElement(section, '.article-title');
      expect(text).toEqual('My First Title');
    });

    it('returns an empty string when selector is not found', async () => {
      let text = await browserBoy.FindTextFromElement(section, '.i-dont-exist');

      expect(text).toEqual('');
    });

  });

  describe('GetAttribute', () => {
    let link: ElementHandle<Element>;
    beforeEach(async () => {
      let sections = await browserBoy.GetSections(page, '.article-link');
      link = sections[0];
    });

    it('can get an href attribute off of a link', async () => {
      let href = await browserBoy.GetAttribute(link, 'href');

      expect(href).toEqual('https://google.com');
    });
  });


});
