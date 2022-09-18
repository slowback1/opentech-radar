import { ElementHandle } from 'puppeteer';
import { BrowserBoy } from '@opentech-radar/utilities';
import { TestTextStep1, TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import TextProcessor from './TextProcessor';
import { GetTextStep, WebScraperPropertyName } from '@opentech-radar/types';


describe('TextProcessor', () => {
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
    let processor = new TextProcessor({}, TestTextStep1);

    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.title]).toEqual('My First Title');
  });

  it('writes to _ when not given a destination', async () => {
    let processor = new TextProcessor({}, { ...TestTextStep1, writeToProperty: undefined });

    let result = await processor.Process(element);

    expect(result['_']).toEqual('My First Title');
  });
  it('can find an element past the first index when given in the config', async () => {
    let processor = new TextProcessor({}, { ...TestTextStep1, elementIndex: 1 });
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.title]).toEqual('My First Title 2');
  });
  it('writes an empty string when the element is not found', async () => {
    let processor = new TextProcessor({}, { ...TestTextStep1, selector: '.i-dont-exist' });
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.title]).toEqual('');
  });
  it('can apply text transforms with the given regex strings', async () => {
    let processor = new TextProcessor({}, {
      ...TestTextStep1,
      transformRegexFrom: 'Title',
      transformRegexTo: 'Section'
    } as GetTextStep);
    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.title]).toEqual('My First Section');
  });

});
