import PreviousScrapeResultRepo from './PreviousScrapeResultRepo';
import GetContext from '../context/GetContext';
import { PreviousScrapeResultDTO } from '../DTOs/PreviousScrapeResultDTO';
import { ScraperConfigDTO } from '../DTOs/ScraperConfigDTO';
import ScraperConfigRepo from './ScraperConfigRepo';

describe('PreviousScrapeResultRepo', () => {
  let repo: PreviousScrapeResultRepo;

  beforeEach(async () => {
    let context = await GetContext();
    repo = new PreviousScrapeResultRepo(context);
    let parentRepo = new ScraperConfigRepo(context);

    let config = new ScraperConfigDTO();
    config.id = 1;
    config.name = 'test config';
    config.config = {
      version: {
        major: 0,
        minor: 0,
        patch: 0,
      },
      name: 'test config',
      steps: [],
      source: 'test',
    };

    await parentRepo.Save(config);
  });

  function getTestData() {
    let result = new PreviousScrapeResultDTO();
    result.title = 'test title';
    result.date = new Date();
    result.link = 'https://google.com';

    return result;
  }

  it('constructs without breaking', () => {
    expect(repo).not.toBeNull();
  });
  it('can insert a value successfully', async () => {
    let saveResult = await repo.Save(getTestData());

    expect(saveResult).not.toBeNull();
    expect(saveResult.result).toBeTruthy();
  });
  it('can get a stored value by id', async () => {
    let saveResult = await repo.Save(getTestData());

    let getResult = await repo.GetById(4);

    expect(getResult.title).toEqual('test title');
  });

  it('can update a value', async () => {
    let saveResult = await repo.Save(getTestData());

    let getResult = await repo.GetById(1);

    getResult.title = 'something else';

    let updateResult = await repo.Save(getResult);

    expect(updateResult.result).toBeTruthy();

    let postUpdate = await repo.GetById(1);

    expect(postUpdate.title).toEqual('something else');
  });

  it('can delete a value', async () => {
    let saveResult = await repo.Save(getTestData());

    let deleteResult = await repo.DeleteById(1);

    expect(deleteResult.result).toBeTruthy();

    let postDelete = await repo.GetById(1);

    expect(postDelete).toBeNull();
  });

  it('can find an item by name', async () => {
    let saveResult = await repo.Save(getTestData());

    let findResult = await repo.FindByName('test title');

    expect(findResult).not.toBeNull();
    expect(findResult).not.toBeUndefined();
  });

  it("returns null when finding a title that doesn't exist", async () => {
    let findResult = await repo.FindByName("i don't exist");

    expect(findResult).toBeNull();
  });
  it('can articulate that a title exists', async () => {
    let saveResult = await repo.Save(getTestData());

    let exists = await repo.NameExists('test title');

    expect(exists).toBeTruthy();
  });
  it('can articulate that a title does not exist', async () => {
    let exists = await repo.NameExists("i don't exist");
    expect(exists).toBeFalsy();
  });
  it('can get results for a date', async () => {
    let results = await repo.GetAllForDate(new Date());

    expect(results.length).toEqual(3);
  });

  it('does not return results for other dates', async () => {
    let otherOne = getTestData();
    otherOne.date = new Date(Date.parse('01-01-2000'));
    await repo.Save(otherOne);

    let results = await repo.GetAllForDate(new Date(Date.parse('01-01-2000')));

    expect(results.length).toEqual(1);
  });

  it('can get results with matching date and id', async () => {
    let results = await repo.GetAllForDateAndConfig(new Date(), 1);

    expect(results.length).toEqual(3);
  });
});
