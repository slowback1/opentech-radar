import { MAX_AGE_IN_HOURS, NoNoWords } from './Filter.config';

export function PostFilter(title: string, date: Date) {
  return isNewEnough(date) && doesNotContainNoNoWords(title);
}

function doesNotContainNoNoWords(title: string) {
  const lower = title.toLowerCase();

  return NoNoWords.every((word) => {
    return !lower.includes(word);
  });
}

function isNewEnough(date: any) {
  let now: any = new Date();
  let hourDifference = Math.abs(now - date) / 36e5;

  return hourDifference < MAX_AGE_IN_HOURS;
}
