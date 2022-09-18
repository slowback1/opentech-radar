import { WebScraperResults } from '@opentech-radar/types';
import {
  PreviousScrapeResultDTO,
  UnitOfWork,
} from '@opentech-radar/db-access';

export default async function SaveResultData(
  results: WebScraperResults,
  unitOfWork: UnitOfWork
) {
  let dtos: PreviousScrapeResultDTO[] = results.results.map((res) => ({
    title: res.title,
    date: res.date ?? new Date(),
    link: res.link,
  }));

  let savePromises = dtos.map((dto) => {
    return unitOfWork.PreviousScrapeResult.Save(dto);
  });

  let saveResults = await Promise.all(savePromises);

  return {
    saveResult: saveResults.every((saveResult) => saveResult.result),
    scrapeResultDtos: dtos,
  };
}
