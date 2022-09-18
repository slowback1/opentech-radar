import { TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import { BuildableWebScraperType } from '@opentech-radar/types';
import { GetConfigBuilder } from './GetConfigBuilder';
import ConfigBuilder from './ConfigBuilder';
import UrlTemplateConfigBuilder from './UrlTemplateConfigBuilder';

describe('GetConfigBuilder', () => {
  it('returns a ConfigBuilder instance for a noConfig type', () => {
    let config = {
      ...TestWebScraperConfig1,
      builderType: BuildableWebScraperType.noConfig,
    };

    let builder = GetConfigBuilder(config);

    expect(builder).toBeInstanceOf(ConfigBuilder);
  });
  it('returns a ConfigBuilder instance for a undefined type', () => {
    let config = { ...TestWebScraperConfig1, builderType: undefined };

    let builder = GetConfigBuilder(config);

    expect(builder).toBeInstanceOf(ConfigBuilder);
  });

  it('returns a UrlTemplateBuilder instance for a urlTemplate type', () => {
    let config = {
      ...TestWebScraperConfig1,
      builderType: BuildableWebScraperType.urlTemplate,
    };

    let builder = GetConfigBuilder(config);

    expect(builder).toBeInstanceOf(UrlTemplateConfigBuilder);
  });
});
