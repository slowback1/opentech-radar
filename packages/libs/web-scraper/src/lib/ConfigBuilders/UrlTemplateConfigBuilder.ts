import ConfigBuilder from './ConfigBuilder';
import { BuildableWebScraperConfig } from '@opentech-radar/types';

export default class UrlTemplateConfigBuilder extends ConfigBuilder {
  override Build() {
    let args = this.config.builderArgs as string[];

    return args.map(arg => {
      let config: BuildableWebScraperConfig = JSON.parse(JSON.stringify(this.config));

      config.source = config.source.replace("{{tag}}", arg);

      return config;
    })

  }
}
