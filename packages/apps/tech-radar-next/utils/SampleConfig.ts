import {
  AggregateStep,
  BuildableWebScraperConfig,
  GetAttributeStep,
  WebScraperPropertyName,
  WebScraperStepType,
} from '@opentech-radar/types';

export const SampleConfig: BuildableWebScraperConfig = {
  source: '',
  name: '',
  version: {
    patch: 0,
    minor: 0,
    major: 1,
  },
  steps: [
    {
      type: WebScraperStepType.aggregate,
      writeToProperty: WebScraperPropertyName.results,
      selector: '',
      steps: [
        {
          type: WebScraperStepType.getText,
          writeToProperty: WebScraperPropertyName.title,
          selector: '',
        },
        {
          type: WebScraperStepType.getAttribute,
          writeToProperty: WebScraperPropertyName.link,
          selector: '',
          attributeName: '',
        } as GetAttributeStep,
        {
          type: WebScraperStepType.getDate,
          writeToProperty: WebScraperPropertyName.date,
          selector: '',
        },
      ],
    } as AggregateStep,
  ],
};

export const TesterConfig: BuildableWebScraperConfig = {
  source: 'https://google.com',
  name: 'tester config',
  version: {
    patch: 0,
    minor: 0,
    major: 1,
  },
  steps: [
    {
      type: WebScraperStepType.aggregate,
      writeToProperty: WebScraperPropertyName.results,
      selector: 'div',
      steps: [
        {
          type: WebScraperStepType.getText,
          writeToProperty: WebScraperPropertyName.title,
          selector: 'a',
        },
        {
          type: WebScraperStepType.getAttribute,
          writeToProperty: WebScraperPropertyName.link,
          selector: 'a',
          attributeName: 'href',
        } as GetAttributeStep,
        {
          type: WebScraperStepType.getDate,
          writeToProperty: WebScraperPropertyName.date,
          selector: 'p',
        },
      ],
    } as AggregateStep,
  ],
}
