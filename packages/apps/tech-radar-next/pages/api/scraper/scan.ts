import { NextApiRequest, NextApiResponse } from 'next';
import { WebScraperResults } from '@opentech-radar/types';
import {
  GetConfigBuilder,
  PostProcess,
  WebScraper,
} from '@opentech-radar/web-scraper';
import { UnitOfWork } from '@opentech-radar/db-access';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const unitOfWork = await UnitOfWork.Create();

  const configs = await unitOfWork.ScraperConfig.GetAll();



  const scraperPromises = configs.map(async (config) => {
    const builder = GetConfigBuilder(config.config);

    const builtConfigs = builder.Build();

    const configPromises = builtConfigs.map(async (config) => {
      const scraper = new WebScraper(config);
      const scraperResults: WebScraperResults = await scraper.Process();

      const postProcessed = await PostProcess(scraperResults, config);

      return postProcessed.scrapeResultDtos;
    });

    return await Promise.all(configPromises);
  });

  const results = await Promise.all(scraperPromises);
  const flattened = results.flat(2);
  res.status(200).json(flattened);
};
