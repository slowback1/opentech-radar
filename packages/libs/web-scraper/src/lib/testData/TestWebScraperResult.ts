import { WebScraperResults } from '@opentech-radar/types';

export const createTestWebScraperResult = (
  title?: string,
  link?: string,
  date?: Date
): WebScraperResults => {
  return {
    results: [
      {
        title,
        link,
        date,
      },
    ],
  };
};

export const testWebScraperResults: WebScraperResults = {
  results: [
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
    {
      title: 'test',
      link: 'test',
      date: new Date(),
    },
  ],
};
