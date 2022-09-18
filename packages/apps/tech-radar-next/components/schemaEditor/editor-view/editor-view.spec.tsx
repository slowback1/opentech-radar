import { fireEvent, render, RenderResult } from '@testing-library/react';

import EditorView from './editor-view';
import Mock = jest.Mock;

describe('EditorView', () => {
  let handleConfig: Mock;
  let handleName: Mock;
  let loadTest: Mock;
  let saveChanges: Mock;
  let renderResult: RenderResult;
  beforeEach(() => {
    handleConfig = jest.fn();
    handleName = jest.fn();
    loadTest = jest.fn();
    saveChanges = jest.fn();

    renderResult = render(
      <EditorView
        config={''}
        handleConfigChange={handleConfig}
        handleNameChange={handleName}
        name={''}
        loadTest={loadTest}
        saveChanges={saveChanges}
      />
    );
  });

  it('should render successfully', () => {
    expect(renderResult.baseElement).toBeTruthy();
  });
  it('should call handleNameChange when typing into the name field', async () => {
    let nameInput = await renderResult.findByTestId('something-new');

    fireEvent.change(nameInput, { target: { value: 'something else' } });

    expect(handleName).toHaveBeenCalled();
  });
});
