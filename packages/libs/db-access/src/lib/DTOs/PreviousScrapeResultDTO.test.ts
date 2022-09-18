import { PreviousScrapeResult } from '../Models/PreviousScrapeResult';
import { PreviousScrapeResultDTO } from './PreviousScrapeResultDTO';

describe('PreviousScrapeResult', () => {
  it('data survives round trip', () => {
    let originalModel = new PreviousScrapeResult();
    originalModel.id = 1;
    originalModel.date = new Date();
    originalModel.title = 'title';

    let dto = PreviousScrapeResultDTO.CreateFromModel(originalModel);

    let convertedModel = PreviousScrapeResultDTO.ToDatabaseModel(dto);

    expect(convertedModel).toEqual(originalModel);
  });
});
