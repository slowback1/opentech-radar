import { UnitOfWork } from './UnitOfWork';

describe('UnitOfWork', () => {
  it('Create gives not-null repos at end of promise', async () => {
    let unitOfWork = await UnitOfWork.Create();

    expect(unitOfWork.ScraperConfig).not.toBeNull();
    expect(unitOfWork.ScraperConfig).not.toBeUndefined();
  });
});
