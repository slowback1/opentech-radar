import { render } from '@testing-library/react';
import NewSchemaPage from '../../pages/schemas/new';

describe('New', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewSchemaPage />);
    expect(baseElement).toBeTruthy();
  });
});
