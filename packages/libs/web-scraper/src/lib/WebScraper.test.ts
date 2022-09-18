import { WebScraper } from './WebScraper';
import { TestWebScraperConfig1 } from './testData/TestWebScraperConfigs';

describe('WebScraper', () => {
  it('constructs', () => {
    let scraper = new WebScraper(TestWebScraperConfig1);

    expect(scraper).not.toBeNull();
  });

  describe('Config 1', () => {
    let scraper: WebScraper;
    let result;

    beforeEach(async () => {
      scraper = new WebScraper(TestWebScraperConfig1);
      result = await scraper.Process();
    });

    it('result is not null', () => {
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
    });

    it('result has a results array', () => {
      expect(Array.isArray(result.results)).toBeTruthy();
    });
  });
});
