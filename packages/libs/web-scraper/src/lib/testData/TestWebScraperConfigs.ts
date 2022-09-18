import {
  AggregateStep,
  GetAttributeStep,
  GetDateStep,
  GetTextStep,
  WebScraperConfig,
  WebScraperPropertyName,
  WebScraperStepType
} from '@opentech-radar/types';
import * as  fs from 'fs';
import * as path from 'path';

export const TestTextStep1: GetTextStep = {
  type: WebScraperStepType.getText,
  writeToProperty: WebScraperPropertyName.title,
  selector: '.article-title'
};
export const TestDateStep1: GetDateStep = {
  type: WebScraperStepType.getDate,
  writeToProperty: WebScraperPropertyName.date,
  selector: '.article-date'
};
export const TestLinkStep1: GetAttributeStep = {
  type: WebScraperStepType.getAttribute,
  writeToProperty: WebScraperPropertyName.link,
  selector: '.article-link',
  attributeName: 'href'
};

export const TestWebScraperConfig1: WebScraperConfig = {
  loadOptions: {
    pageType: 'raw_html'
  },
  name: 'test web scraper config 1',
  source: fs.readFileSync(path.resolve(__dirname, 'TestNewsListing.html')).toString(),
  version: {
    major: 0,
    minor: 0,
    patch: 1
  },
  steps: [
    {
      type: WebScraperStepType.aggregate,
      selector: 'article',
      writeToProperty: WebScraperPropertyName.results,
      steps: [
        TestTextStep1,
        TestLinkStep1,
        TestDateStep1
      ]
    } as AggregateStep
  ]
};
