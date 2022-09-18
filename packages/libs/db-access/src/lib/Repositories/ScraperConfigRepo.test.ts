import ScraperConfigRepo from './ScraperConfigRepo';
import GetContext from '../context/GetContext';
import { ScraperConfigDTO } from '../DTOs/ScraperConfigDTO';

describe('ScraperConfigRepo', () => {
  let repo: ScraperConfigRepo;

  beforeEach(async () => {
    const context = await GetContext();
    repo = new ScraperConfigRepo(context);
  });

  function getScraperConfig() {
    const scraperConfig = new ScraperConfigDTO();
    scraperConfig.name = 'test config';
    scraperConfig.config = {
      version: {
        major: 0,
        minor: 0,
        patch: 0,
      },
      name: 'test',
      steps: [],
      source: 'test',
    };

    return scraperConfig;
  }

  it('constructs without breaking', () => {
    expect(repo).not.toBeNull();
  });
  it('can insert a value successfully', async () => {
    const saveResult = await repo.Save(getScraperConfig());

    expect(saveResult).not.toBeNull();
    expect(saveResult.result).toBeTruthy();
  });
  it('can get a stored value by id', async () => {
    const saveResult = await repo.Save(getScraperConfig());

    const getResult = await repo.GetById(1);

    expect(getResult.name).toEqual('test config');
  });
  it('can get all values', async () => {
    await repo.Save(getScraperConfig());
    await repo.Save(getScraperConfig());
    await repo.Save(getScraperConfig());
    await repo.Save(getScraperConfig());

    const getResult = await repo.GetAll();

    expect(getResult.length).toEqual(4);
  });

  it('can update a value', async () => {
    await repo.Save(getScraperConfig());

    const postSave = await repo.GetById(1);

    postSave.name = 'something else';

    const updateResult = await repo.Save(postSave);

    expect(updateResult.result).toBeTruthy();

    const postUpdate = await repo.GetById(1);

    expect(postUpdate.name).toEqual('something else');
  });

  it('can delete a value', async () => {
    await repo.Save(getScraperConfig());

    const deleteResult = await repo.DeleteById(1);

    expect(deleteResult.result).toBeTruthy();

    const postDelete = await repo.GetById(1);

    expect(postDelete).toBeNull();
  });
});
