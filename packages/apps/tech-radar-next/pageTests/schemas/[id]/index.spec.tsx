import { render } from '@testing-library/react';
import Id from '../../../pages/schemas/[id]';
import {TesterConfig} from "../../../utils/SampleConfig";

describe('Id', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Id config={{ id: 0, name: 'test', config: TesterConfig }} />
    );
    expect(baseElement).toBeTruthy();
  });
});
