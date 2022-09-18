import { Clone } from './Clone';

describe('Clone', () => {
  it('successfully clones and removes object reference problems', () => {
    let testObject = {
      propA: 'test',
      propB: 2,
    };

    let cloned = Clone(testObject);

    cloned.propA = 'something else';

    expect(testObject.propA).toEqual('test');
  });
});
