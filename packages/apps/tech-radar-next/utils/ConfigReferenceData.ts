export interface ConfigReferenceData {
  title: string;
  text: string;
  type: string;
}

export const TopLevelReference: ConfigReferenceData[] = [
  {
    title: 'builderType',
    text: `either "url_template" or null. When set to
    "url_template", this will replace any instance of
    "{{tag}}" in the source URL with each of
    the values in builderArgs`,
    type: 'string',
  },
  {
    title: 'source',
    type: 'string',
    text: 'The source URL that the scraper will scrape against.',
  },
  {
    title: 'builderArgs',
    type: 'any',
    text: 'What this is is dependent upon builderType',
  },
  {
    title: 'version',
    type: 'object',
    text: '"patch": 1, "minor": 0, "major": 0',
  },
  {
    title: 'name',
    type: 'string',
    text: 'The name of the config.',
  },
  {
    title: 'steps',
    type: 'array',
    text: 'See the Steps section for more detail for each step',
  },
];

export const StepReference: ConfigReferenceData[] = [
  {
    type: 'string',
    title: 'type',
    text: "The type of the step.  This can be 'aggregate', 'get_text', 'get_attribute', or 'get_date'",
  },
  {
    type: 'string',
    title: 'selector',
    text: 'The querySelector to target.  this uses the same string syntax as document.querySelector',
  },
  {
    type: 'string',
    title: 'writeToProperty',
    text: "the property to write results to.  For now, this should be one of 'results', 'title', 'link', or 'date'",
  },
  {
    type: 'string',
    title: 'attributeName',
    text: "used in 'get_attribute' steps.  The attribute to retrieve data from.",
  },
  {
    type: 'string',
    title: 'transformRegexFrom / transformRegexTo',
    text: "used in tandem to perform replacement operations on text.  Uses Node's regex engine",
  },
];
