import { Log } from '@opentech-radar/utilities';

describe('Logger', () => {
  let mockLogger: jest.Mock;

  beforeEach(() => {
    mockLogger = jest.fn();
    console.log = mockLogger;
  });

  it('will log once when passed a string', () => {
    Log('chicken');

    expect(mockLogger).toBeCalledTimes(1);
  });

  it('will log twice when passed an error object with no stack', () => {
    let err = new Error('I\'m a message!');
    err.stack = null;
    Log(err);

    expect(mockLogger).toBeCalledTimes(2);
  });
  it("will log three times when passed an error object with a stack", () => {
    let err = new Error("I'm a message!");

    Log(err);

    expect(mockLogger).toBeCalledTimes(3);
  })
  it("will stringify a given object to JSON when logging", () => {
    let currentValue = "";
    console.log = (value) => currentValue = value;

    let obj = { chicken: "egg" };

    Log(obj);

    expect(currentValue.includes(JSON.stringify(obj))).toBeTruthy();
  })
});
