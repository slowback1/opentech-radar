import ConvertScrapeResultsToEmail from './ConvertScrapeResultsToEmail';
import { createTestWebScraperResult } from '../testData/TestWebScraperResult';

describe('ConvertScrapeResultsToEmail', () => {
  it("doesn't break when running", () => {
    let results = ConvertScrapeResultsToEmail(
      createTestWebScraperResult('test', 'https://google.com'),
      'test'
    );

    expect(results).toBeTruthy();
  });
  it('has the passed in title', () => {
    let results = ConvertScrapeResultsToEmail(
      createTestWebScraperResult('test', 'https://google.com'),
      'my super cool title'
    );

    expect(results.header).toEqual('my super cool title');
  });
  it('has an email link with the correct information', () => {
    let results = ConvertScrapeResultsToEmail(
      createTestWebScraperResult('test', 'https://google.com'),
      'test'
    );

    expect(results.links.length).toEqual(1);
    expect(results.links[0].content).toEqual('test');
    expect(results.links[0].target).toEqual('https://google.com');
  });
});
