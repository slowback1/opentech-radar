import { UnitOfWork } from '@opentech-radar/db-access';
import { createTestWebScraperResult } from '../testData/TestWebScraperResult';
import SaveResultData from './SaveResultData';

describe('SaveResultData', () => {
  let unitOfWork: UnitOfWork;

  beforeEach(async () => {
    unitOfWork = await UnitOfWork.Create();
  });

  it('can save fully filled out data', async () => {
    let results = createTestWebScraperResult(
      'test',
      'https://google.com',
      new Date()
    );

    let saveResult = await SaveResultData(results, unitOfWork);

    expect(saveResult).toBeTruthy();

    let stored = await unitOfWork.PreviousScrapeResult.GetAllForDate(
      results.results[0].date
    );

    expect(stored.length).toBeGreaterThan(0);
  });

  it('autopopulates date if not given', async () => {
    let results = createTestWebScraperResult('test', 'https://google.com');

    let saveResult = await SaveResultData(results, unitOfWork);

    expect(saveResult).toBeTruthy();

    let stored = await unitOfWork.PreviousScrapeResult.GetAllForDate(
      new Date()
    );

    expect(stored.length).toBeGreaterThan(0);
  });
});
