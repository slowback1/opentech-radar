export interface EmailLink {
  content: string;
  target: string;
}

export interface EmailSection {
  header: string;
  links: EmailLink[];
}

export interface PageLoadOptions {
  pageType: 'url' | 'raw_html';
}

export interface WebScraperConfig {
  source: string;
  loadOptions?: PageLoadOptions;
  name: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  steps: WebScraperStep[];
}

export const BuildableWebScraperType = {
  noConfig: 'no_config',
  urlTemplate: 'url_template'
};

export interface BuildableWebScraperConfig extends WebScraperConfig {
  builderType?: string;
  builderArgs?: any;
}


export const WebScraperStepType = {
  aggregate: 'aggregate',
  getText: 'get_text',
  getAttribute: 'get_attribute',
  getDate: 'get_date'
};
export const WebScraperPropertyName = {
  title: 'title',
  link: 'link',
  date: 'date',
  results: 'results'
};

export interface WebScraperStep {
  ///this should always a value in WebScraperStepType
  type: string;
  selector: string;
  elementIndex?: number;
  ///this should usually be a value from WebScraperPropertyName
  writeToProperty?: string;
}

export interface AggregateStep extends WebScraperStep {
  steps: WebScraperStep[];
}

export interface GetTextStep extends WebScraperStep {
  transformRegexFrom?: string;
  transformRegexTo?: string;
}

export interface GetDateStep extends GetAttributeStep {
  dateFormat?: string;
  isRelativeDate?: boolean;
}

export interface GetAttributeStep extends GetTextStep {
  attributeName?: string;
}

export interface WebScraperResults {
  results?: WebScraperResult[];
}

export interface WebScraperResult {
  title?: string;
  link?: string;
  date?: Date;
}
