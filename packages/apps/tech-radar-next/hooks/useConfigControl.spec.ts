import useConfigControl from './useConfigControl';
import { act, renderHook } from '@testing-library/react';
import {TesterConfig} from "../utils/SampleConfig";

describe('useConfigControl', () => {
  let result: { current: ReturnType<typeof useConfigControl> };
  describe('no default value', () => {
    beforeEach(() => {
      const res = renderHook(() => useConfigControl());
      result = res.result;
    });

    it('renders without breaking', () => {
      expect(result.current).toBeTruthy();
    });
    it('handleNameChange updates the name state', async () => {
      await act(() => {
        result.current.handleNameChange({
          target: { value: 'something' },
        });
      });

      expect(result.current.name).toEqual('something');
    });
    it('handleConfigChange updates the config state', async () => {
      await act(() => {
        result.current.handleConfigChange('else');
      });

      expect(result.current.config).toEqual('else');
    });
  });
  describe('with default value', () => {
    beforeEach(() => {
      let res = renderHook(() =>
        useConfigControl({
          config: TesterConfig,
          name: 'test config',
          id: 1,
        })
      );
      result = res.result;
    });

    it('sets the default name correctly', () => {
      expect(result.current.name).toEqual('test config');
    });
    it('sets the default config correctly', () => {
      expect(result.current.config).toBeTruthy();
      expect(typeof result.current.config).toEqual('string');
    });

    describe('saving changes', () => {
      beforeAll(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({ name: 'something', config: 'else', id: 1 }),
          })
        ) as jest.Mock;
      });

      it('returns true when saving is successful', async () => {
        let saveResult = await result.current.saveChanges();

        expect(saveResult).toBeTruthy();
      });
    });
  });
});
