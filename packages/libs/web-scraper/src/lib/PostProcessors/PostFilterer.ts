import { WebScraperResult, WebScraperResults } from '@opentech-radar/types';
import { UnitOfWork } from '@opentech-radar/db-access';

export default class PostFilterer {
  private filteredWords: string[];

  private constructor(
    private scraperResults: WebScraperResults,
    private unitOfWork: UnitOfWork
  ) {}

  private async init(): Promise<void> {
    let storedWords = await this.unitOfWork.FilterWord.GetAll();

    this.filteredWords = storedWords.map((word) => word.value);
  }
  private asyncFilter = async (arr, predicate) => {
    const results = await Promise.all(arr.map(predicate));

    return arr.filter((_v, index) => results[index]);
  };

  private async Filter(): Promise<WebScraperResults> {
    this.scraperResults.results = this.scraperResults.results
      .filter(this.hasTitleAndLink)
      .filter(this.isNotInBanList)
      .filter(this.isFromToday);

    this.scraperResults.results = await this.asyncFilter(
      this.scraperResults.results,
      this.doesNotAlreadyExistInData
    );

    this.scraperResults.results = this.scraperResults.results.slice(0, 3);

    return this.scraperResults;
  }

  static async Filter(
    scraperResults: WebScraperResults,
    unitOfWork: UnitOfWork
  ) {
    let filterer = new PostFilterer(scraperResults, unitOfWork);

    await filterer.init();

    return await filterer.Filter();
  }

  private isNotInBanList = (result: WebScraperResult): boolean => {
    let lowerCaseValue = result.title.toLowerCase();

    return this.filteredWords
      .map((word) => word.toLowerCase())
      .every((word) => !lowerCaseValue.includes(word));
  };
  private isFromToday(result: WebScraperResult): boolean {
    let today = new Date();

    if (!result.date) return true;

    return (
      result.date.getDate() == today.getDate() &&
      result.date.getMonth() == today.getMonth() &&
      result.date.getFullYear() == today.getFullYear()
    );
  }

  private hasTitleAndLink(result: WebScraperResult): boolean {
    return !!result.title && !!result.link;
  }

  private doesNotAlreadyExistInData = async (
    result: WebScraperResult
  ): Promise<boolean> => {
    return !(await this.unitOfWork.PreviousScrapeResult.NameExists(
      result.title
    ));
  };
}
