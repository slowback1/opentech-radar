import {
  BuildableWebScraperConfig,
  BuildableWebScraperType,
} from '@opentech-radar/types';
import ConfigBuilder from './ConfigBuilder';
import UrlTemplateConfigBuilder from './UrlTemplateConfigBuilder';

export function GetConfigBuilder(config: BuildableWebScraperConfig) {
  switch (config.builderType) {
    case BuildableWebScraperType.urlTemplate:
      return new UrlTemplateConfigBuilder(config);
    case BuildableWebScraperType.noConfig:
    default:
      return new ConfigBuilder(config);
  }
}
