import {
  BuildableWebScraperConfig,
  WebScraperResults,
} from '@opentech-radar/types';
import { UnitOfWork } from '@opentech-radar/db-access';
import PostFilterer from './PostFilterer';
import SaveResultData from './SaveResultData';
import ConvertScrapeResultsToEmail from './ConvertScrapeResultsToEmail';

export async function PostProcess(
  result: WebScraperResults,
  config: BuildableWebScraperConfig
) {
  let unitOfWork = await UnitOfWork.Create();

  let filteredData = await PostFilterer.Filter(result, unitOfWork);
  let { scrapeResultDtos, saveResult } = await SaveResultData(
    filteredData,
    unitOfWork
  );

  let emailData = ConvertScrapeResultsToEmail(filteredData, config.name);

  return { emailData, saveResult, scrapeResultDtos };
}
