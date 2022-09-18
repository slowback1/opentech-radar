import { WebScraperStep, WebScraperStepType } from '@opentech-radar/types';
import BaseProcessor from './BaseProcessor';
import TextProcessor from './TextProcessor';
import AttributeProcessor from './AttributeProcessor';
import AggregateProcessor from './AggregateProcessor';
import DateProcessor from './DateProcessor';
import { Log } from '@opentech-radar/utilities';

export default function ProcessorFactory(value: any, config: WebScraperStep) {
  let processor: BaseProcessor;
  switch (config.type) {
    case WebScraperStepType.getText:
      processor = new TextProcessor(value, config);
      break;
    case WebScraperStepType.getAttribute:
      processor = new AttributeProcessor(value, config);
      break;
    case WebScraperStepType.aggregate:
      processor = new AggregateProcessor(value, config);
      break;
    case WebScraperStepType.getDate:
      processor = new DateProcessor(value, config);
      break;
    default:
      Log(`WARNING: invalid web-scraper processing type included: ${config.type}`);
      processor = new TextProcessor(value, config);
  }

  return processor;
}
