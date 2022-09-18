import { ScraperConfigDTO } from '@opentech-radar/db-access';
import useConfigControl from '../../hooks/useConfigControl';
import { Alert, Grid, Slide, Snackbar } from '@mui/material';
import EditorView from './editor-view/editor-view';
import ReferenceManuel from './reference-manuel/reference-manuel';
import TestResultsModal from './testResultsModal';

export default function SchemaEditor(props: { config?: ScraperConfigDTO }) {
  const {
    config,
    handleConfigChange,
    handleNameChange,
    name,
    saveChanges,
    loadTest,
    isLoadingTest,
    testResults,
    showResults,
    closeModal,
    showSnackbar,
    hideSnackbar,
  } = useConfigControl(props.config);

  return (
    <>
      <TestResultsModal
        closeModal={closeModal}
        testResults={testResults}
        show={showResults}
        isLoading={isLoadingTest}
      />
      <Snackbar
        onClose={hideSnackbar}
        autoHideDuration={10000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        open={showSnackbar}
        TransitionComponent={(p) => <Slide {...p} direction={'up'} />}
      >
        <Alert severity={'success'}>Save Successful</Alert>
      </Snackbar>
      <Grid height={'100%'} container spacing={3}>
        <Grid height={'100%'} item xs={8}>
          <EditorView
            handleNameChange={handleNameChange}
            config={config}
            handleConfigChange={handleConfigChange}
            name={name}
            saveChanges={saveChanges}
            loadTest={loadTest}
          />
        </Grid>
        <Grid item xs={4}>
          <ReferenceManuel />
        </Grid>
      </Grid>
    </>
  );
}
