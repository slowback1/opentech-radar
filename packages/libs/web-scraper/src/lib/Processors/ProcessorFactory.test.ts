import ProcessorFactory from './ProcessorFactory';
import { TestLinkStep1, TestTextStep1, TestWebScraperConfig1 } from '../testData/TestWebScraperConfigs';
import TextProcessor from './TextProcessor';
import AttributeProcessor from './AttributeProcessor';
import AggregateProcessor from './AggregateProcessor';


describe('ProcessorFactory', () => {
  let value: any;

  beforeEach(() => {
    value = {};
  });

  it('returns a text processor when given a text type config', () => {
    let processor = ProcessorFactory(value, TestTextStep1);

    expect(processor).toBeInstanceOf(TextProcessor);
  });
  it('returns an attribute parser when given an attribute type config', () => {
    let processor = ProcessorFactory(value, TestLinkStep1);

    expect(processor).toBeInstanceOf(AttributeProcessor);
  });
  it('returns an aggregate parser when given an aggregate type config', () => {
    let processor = ProcessorFactory(value, TestWebScraperConfig1.steps[0]);

    expect(processor).toBeInstanceOf(AggregateProcessor);
  });
  it('will persist values passed into the factory', () => {
    let processor = ProcessorFactory({ chicken: 'egg' }, TestTextStep1);

    processor.Process = (e) => processor.value;

    let result = processor.Process({} as any);

    expect(result.chicken).toEqual('egg');

  });


});
