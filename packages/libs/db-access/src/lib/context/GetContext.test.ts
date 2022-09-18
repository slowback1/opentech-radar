import GetContext from './GetContext';
import TestModel from '../Models/TestModel';

describe('DatabaseAccessor', () => {
  it('Can get an in-memory context', async () => {
    let context = await GetContext();

    expect(context).not.toBeNull();
  });
  it('Can do a basic CRUD workflow', async () => {
    let context = await GetContext();

    let repo = context.getRepository(TestModel);

    let insertResult = await repo.insert({ id: 1, value: 'hello world' });

    await repo.save({ id: 1, value: 'hello world' });

    expect(insertResult).not.toBeNull();

    let updateResult = await repo.save({ id: 1, value: 'hi there' });

    expect(updateResult).not.toBeNull();

    let postUpdate = await repo.findOne({ where: { id: 1 } });

    expect(postUpdate.value).toEqual('hi there');

    let deleteResult = await repo.delete(1);

    expect(deleteResult).not.toBeNull();

    let postDelete = await repo.findOne({ where: { id: 1 } });

    expect(postDelete).toBeNull();
  });
});
