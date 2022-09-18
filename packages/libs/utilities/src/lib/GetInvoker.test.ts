import { GetInvoker } from '@opentech-radar/utilities';

describe('GetInvoker', () => {
  let myValue: string;
  let loggedValue: string;
  beforeEach(() => {
    console.log = (v) => loggedValue = v;
    myValue = undefined;
    loggedValue = undefined;
  });

  it('will pass through a working function', () => {
    let func = GetInvoker(() => myValue = 'chicken');
    func();

    expect(myValue).toEqual('chicken');
    expect(loggedValue).toBeUndefined();
  });
  it('logs errors when they occur in a broken function', () => {
    let func = GetInvoker(() => {
      if (Math.random() > -1)
        throw new Error();
      myValue = 'egg';
    });
    func();

    expect(myValue).toBeUndefined();
    expect(loggedValue).not.toBeUndefined();
  });
  it('pipes through return value of the inner function', () => {
    let func = GetInvoker((x) => x + 2, 1);
    let value = func();

    expect(value).toEqual(3);
  });
  it("pipes undefined when the inner function throws", () => {
    let func = GetInvoker(() => {
      if (Math.random() > -1)
        throw new Error();
      return true;
    });

    let value = func();

    expect(value).toBeUndefined();
  })

});
