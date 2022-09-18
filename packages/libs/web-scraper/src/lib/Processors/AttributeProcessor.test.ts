import { ElementHandle } from 'puppeteer';
import { BrowserBoy } from '@opentech-radar/utilities';
import { TestLinkStep1, TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import { GetTextStep, WebScraperPropertyName } from '@opentech-radar/types';
import AttributeProcessor from './AttributeProcessor';


describe('AttributeProcessor', () => {
  let element: ElementHandle;
  let browser: BrowserBoy;
  beforeEach(async () => {
    browser = new BrowserBoy();
    await browser.Start();
    let page = await browser.NewPage(TestWebScraperConfig1.source, TestWebScraperConfig1.loadOptions);
    element = await page.$('#first-section');
  });

  afterEach(async () => {
    await browser.End();
  });

  it('can process text content from the given element', async () => {
    let processor = new AttributeProcessor({}, TestLinkStep1);

    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.link]).toEqual('https://google.com');
  });

  it('writes to _ when not given a destination', async () => {
    let processor = new AttributeProcessor({}, { ...TestLinkStep1, writeToProperty: undefined });

    let result = await processor.Process(element);

    expect(result['_']).toEqual('https://google.com');
  });
  it('can find an element past the first index when given in the config', async () => {
    let processor = new AttributeProcessor({}, { ...TestLinkStep1, elementIndex: 1 });
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.link]).toEqual('https://bing.com');
  });
  it('writes an empty string when the element is not found', async () => {
    let processor = new AttributeProcessor({}, { ...TestLinkStep1, selector: '.i-dont-exist' });
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.link]).toEqual('');
  });
  it('can apply text transforms with the given regex strings', async () => {
    let processor = new AttributeProcessor({}, {
      ...TestLinkStep1,
      transformRegexFrom: 'google',
      transformRegexTo: 'yahoo'
    } as GetTextStep);
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.link]).toEqual('https://yahoo.com');
  });

});
