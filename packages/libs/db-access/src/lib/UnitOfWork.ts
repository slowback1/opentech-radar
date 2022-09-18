import { DataSource } from 'typeorm';
import GetContext from './context/GetContext';
import ScraperConfigRepo from './Repositories/ScraperConfigRepo';
import PreviousScrapeResultRepo from './Repositories/PreviousScrapeResultRepo';
import FilterWordsRepo from './Repositories/FilterWordsRepo';
export class UnitOfWork {
  private context: DataSource;
  ScraperConfig: ScraperConfigRepo;
  PreviousScrapeResult: PreviousScrapeResultRepo;
  FilterWord: FilterWordsRepo;

  private constructor() { }

  private async init() {
    this.context = await GetContext();
    this.ScraperConfig = new ScraperConfigRepo(this.context);
    this.PreviousScrapeResult = new PreviousScrapeResultRepo(this.context);
    this.FilterWord = new FilterWordsRepo(this.context);
  }

  static async Create() {
    let unitOfWork = new UnitOfWork();
    await unitOfWork.init();

    return unitOfWork;
  }
}
