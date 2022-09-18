import {
  BuildableWebScraperConfig,
  EmailSection,
  WebScraperResults,
} from '@opentech-radar/types';
import { Log } from '@opentech-radar/utilities';
import {
  GetConfigBuilder,
  PostProcess,
  WebScraper,
} from '@opentech-radar/web-scraper';
import { ScraperConfigDTO, UnitOfWork } from '@opentech-radar/db-access';

async function TryProcessConfig(config: BuildableWebScraperConfig) {
  try {
    const scraper = new WebScraper(config);
    const results: WebScraperResults = await scraper.Process();
    return await PostProcess(results, config);
  } catch (e: any) {
    Log(e);
  }
}

function getBuiltConfigs(configs: ScraperConfigDTO[]) {
  return configs.flatMap((config) => {
    const builder = GetConfigBuilder(config.config);
    return builder.Build();
  });
}

async function getStoredConfigs() {
  const unitOfWork = await UnitOfWork.Create();

  const configs = await unitOfWork.ScraperConfig.GetAll();
  return configs;
}

export async function Retriever() {
  let sections: EmailSection[] = [];

  try {
    const configs = await getStoredConfigs();

    const builtConfigs = getBuiltConfigs(configs);

    const configPromises = builtConfigs.map(TryProcessConfig);

    const results = (await Promise.all(configPromises)).filter(
      (result) => !!result
    );

    sections = results.map((result) => result.emailData);
  } catch (e: any) {
    Log(e);
  }

  return filterEmptySections(sections);
}

function filterEmptySections(sections: EmailSection[]) {
  return sections.filter((section) => section.links.length > 0);
}
