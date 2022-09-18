import { ScraperConfig } from '../Models/ScraperConfig';
import { ScraperConfigDTO } from './ScraperConfigDTO';

describe('ScraperConfigDTO', () => {
  it('data survives round trip', () => {
    let scraperConfig = new ScraperConfig();
    scraperConfig.name = 'test config';
    scraperConfig.config = {
      version: {
        major: 0,
        minor: 0,
        patch: 0,
      },
      name: 'test',
      steps: [],
      source: 'test',
    };

    let dto = ScraperConfigDTO.CreateFromDBModel(scraperConfig);

    let roundTrip = ScraperConfigDTO.CreateDBModel(dto);

    expect(roundTrip).toEqual(scraperConfig);
  });
});
