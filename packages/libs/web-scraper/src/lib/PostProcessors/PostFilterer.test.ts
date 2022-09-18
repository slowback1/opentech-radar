import {
  createTestWebScraperResult,
  testWebScraperResults,
} from '../testData/TestWebScraperResult';
import PostFilterer from './PostFilterer';
import { UnitOfWork } from '@opentech-radar/db-access';

describe('PostFilterer', () => {
  let unitOfWork: UnitOfWork;
  beforeEach(async () => {
    unitOfWork = await UnitOfWork.Create();

    await unitOfWork.FilterWord.Save({ value: 'NONOWORD' });
  });

  it('allows a valid result through', async () => {
    let results = createTestWebScraperResult(
      'test',
      'https://google.com',
      new Date()
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(1);
  });

  it('filters out a result that contains a filtered word', async () => {
    let results = createTestWebScraperResult(
      'I have a nonoword !!!',
      'https://google.com',
      new Date()
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(0);
  });

  it('filters out a result from a day other than today', async () => {
    let results = createTestWebScraperResult(
      'good title',
      'https://google.com',
      new Date(2020, 1, 1)
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(0);
  });
  it('filters out undefined titles', async () => {
    let results = createTestWebScraperResult(
      undefined,
      'https://google.com',
      new Date()
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(0);
  });

  it('filters out undefined links', async () => {
    let results = createTestWebScraperResult(
      'good title',
      undefined,
      new Date()
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(0);
  });
  it('only takes the top 3 results', async () => {
    let results = testWebScraperResults;

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(3);
  });

  it('does NOT filter out undefined dates', async () => {
    let results = createTestWebScraperResult(
      'good title',
      'https://google.com'
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(1);
  });
  it('filters out already existing data', async () => {
    let results = createTestWebScraperResult(
      'good title',
      'https://google.com'
    );

    await unitOfWork.PreviousScrapeResult.Save({
      link: 'https://google.com',
      title: 'good title',
      date: new Date(),
    });

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(0);
  });
  it('does not filter out null dates', async () => {
    let results = createTestWebScraperResult(
      'good title',
      'https://google.com',
      null
    );

    let filtered = await PostFilterer.Filter(results, unitOfWork);

    expect(filtered.results.length).toEqual(1);
  });
});
