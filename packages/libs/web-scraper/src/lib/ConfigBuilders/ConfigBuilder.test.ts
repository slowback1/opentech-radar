import ConfigBuilder from './ConfigBuilder';
import { TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';

describe('ConfigBuilder', () => {
  it('returns not-null for a config file', () => {
    let builder = new ConfigBuilder({ ...TestWebScraperConfig1, builderArgs: {}, builderType: '' });

    let result = builder.Build();

    expect(result).not.toBeNull();
  });
});
