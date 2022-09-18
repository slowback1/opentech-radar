import { NextApiRequest, NextApiResponse } from 'next';
import { BuildableWebScraperConfig } from '@opentech-radar/types';
import { GetConfigBuilder, WebScraper } from '@opentech-radar/web-scraper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as BuildableWebScraperConfig;

  if (body && body.source && body.steps) {
    const builder = GetConfigBuilder(body);

    const configs = builder.Build();

    const promises = configs.map((config) => {
      let scraper = new WebScraper(config);
      return scraper.Process();
    });

    const results = await Promise.all(promises);

    res.status(200).json(results);
  } else {
    res.status(400).json({ message: 'invalid request body' });
  }
};
