import { ElementHandle } from 'puppeteer';
import { BrowserBoy } from '@opentech-radar/utilities';
import { TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import AggregateProcessor from './AggregateProcessor';
import { WebScraperPropertyName } from '@opentech-radar/types';

describe('AggregateProcessor', () => {
  let element: ElementHandle;
  let browser: BrowserBoy;
  beforeEach(async () => {
    browser = new BrowserBoy();
    await browser.Start();
    let page = await browser.NewPage(
      TestWebScraperConfig1.source,
      TestWebScraperConfig1.loadOptions
    );
    element = await page.$('#aggregate-target');
  });

  afterEach(async () => {
    await browser.End();
  });

  it('processes into an array output', async () => {
    let processor = new AggregateProcessor({}, TestWebScraperConfig1.steps[0]);

    let results = await processor.Process(element);

    expect(Array.isArray(results[WebScraperPropertyName.results])).toBeTruthy();
  });

  it('Each output object has a title', async () => {
    let processor = new AggregateProcessor({}, TestWebScraperConfig1.steps[0]);

    let results = await processor.Process(element);

    results[WebScraperPropertyName.results].forEach((value) => {
      expect(value[WebScraperPropertyName.title]).toBeTruthy();
    });
  });

  it('will aggregate upon previous results', async () => {
    let processor = new AggregateProcessor(
      {
        results: [
          {
            title: 'i already exist!',
            date: new Date(),
            link: 'https://google.com',
          },
        ],
      },
      TestWebScraperConfig1.steps[0]
    );

    let results = await processor.Process(element);

    expect(results.results.length).toEqual(4);
    expect(results.results[0].title).toEqual('i already exist!');
  });
});
