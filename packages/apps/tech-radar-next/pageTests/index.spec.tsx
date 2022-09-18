import { render } from '@testing-library/react';
import SchemaPage from '../pages/schemas';

describe('SchemaEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SchemaPage configs={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
