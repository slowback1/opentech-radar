import { TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import { BuildableWebScraperConfig } from '@opentech-radar/types';
import UrlTemplateConfigBuilder from './UrlTemplateConfigBuilder';

describe('UrlTemplateConfigBuilder', () => {
  let config: BuildableWebScraperConfig = {
    ...TestWebScraperConfig1,
    source: 'https://google.com/tags/{{tag}}',
    builderType: 'url-template',
    builderArgs: ['tag-1', 'tag-2']
  };

  it('produces multiple config files when builderArgs\' length is > 1', () => {
    let builder = new UrlTemplateConfigBuilder(config);

    let result = builder.Build();

    expect(result.length).toEqual(2);
  });

  it("first result's source value has 'tag-1' within its url", () => {
    let builder = new UrlTemplateConfigBuilder(config);

    let result = builder.Build();

    let firstUrl = result[0].source;

    expect(firstUrl).toContain("tag-1");
  })
});
