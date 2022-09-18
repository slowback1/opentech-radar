import { BuildableWebScraperConfig } from '@opentech-radar/types';

export default class ConfigBuilder {
  constructor(protected config: BuildableWebScraperConfig) {
  }

  Build() {
    return [this.config];
  }
}
