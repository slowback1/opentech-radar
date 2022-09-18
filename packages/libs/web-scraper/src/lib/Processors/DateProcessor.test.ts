import { ElementHandle } from 'puppeteer';
import { BrowserBoy } from '@opentech-radar/utilities';
import { TestDateStep1, TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import { GetDateStep, WebScraperPropertyName } from '@opentech-radar/types';
import DateProcessor from './DateProcessor';


describe('DateProcessor', () => {
  let element: ElementHandle;
  let browser: BrowserBoy;
  beforeEach(async () => {
    browser = new BrowserBoy();
    await browser.Start();
    let page = await browser.NewPage(TestWebScraperConfig1.source, TestWebScraperConfig1.loadOptions);
    element = await page.$('#first-section');
  });

  beforeEach(() => {
    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2022'))
    ;
  });

  afterEach(async () => {
    await browser.End();
  });

  it('can process text content from the given element', async () => {
    let processor = new DateProcessor({}, TestDateStep1);

    let result = await processor.Process(element);

    expect(result[WebScraperPropertyName.date].toDateString()).toEqual('Tue Feb 22 2022');
  });

  it('writes to _ when not given a destination', async () => {
    let processor = new DateProcessor({}, { ...TestDateStep1, writeToProperty: undefined });

    let result = await processor.Process(element);

    expect(result['_'].toDateString()).toEqual('Tue Feb 22 2022');
  });

  it('writes an empty string when the element is not found', async () => {
    let processor = new DateProcessor({}, { ...TestDateStep1, selector: '.i-dont-exist' });

    let promise = processor.Process(element);
    jest.useRealTimers();
    let result = await promise;

    expect(result[WebScraperPropertyName.date]).toEqual('');
  });
  it('can get datetime from an attribute', async () => {
    let processor = new DateProcessor({}, {
      ...TestDateStep1,
      selector: 'time',
      attributeName: 'datetime'
    } as GetDateStep);

    let result = await processor.Process(element);

    expect((result.date as Date).toDateString()).toEqual('Fri Aug 19 2022');
  });
});
