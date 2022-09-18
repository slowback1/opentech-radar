import {
  EmailLink,
  EmailSection,
  WebScraperResults,
} from '@opentech-radar/types';

export default function ConvertScrapeResultsToEmail(
  scraperResults: WebScraperResults,
  title: string
): EmailSection {
  let emailLinks: EmailLink[] = scraperResults.results.map((result) => {
    return {
      content: result.title,
      target: result.link,
    };
  });

  return {
    links: emailLinks,
    header: title,
  };
}
