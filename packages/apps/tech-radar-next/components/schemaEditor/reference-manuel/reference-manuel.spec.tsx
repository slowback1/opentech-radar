import { render } from '@testing-library/react';

import ReferenceManuel from './reference-manuel';

describe('ReferenceManuel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReferenceManuel />);
    expect(baseElement).toBeTruthy();
  });
});
