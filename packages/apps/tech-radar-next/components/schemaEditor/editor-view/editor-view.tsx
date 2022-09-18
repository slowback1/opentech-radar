/* eslint-disable-next-line */
import { Box, Button, Paper, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import dynamic from 'next/dynamic';

const JSONEditor = dynamic(import('../../jsonEditor'), {
  ssr: false,
});
export interface EditorViewProps {
  handleNameChange: (e) => void;
  config: string;
  handleConfigChange: (e: string) => void;
  name: string;
  saveChanges: () => void;
  loadTest: () => void;
}

export function EditorView(props: EditorViewProps) {
  return (
    <Paper sx={{ padding: 4, overflowY: 'auto', height: '80vh' }}>
      <TextField
        fullWidth
        variant={'outlined'}
        label={'Name'}
        value={props.name}
        onChange={props.handleNameChange}
        sx={{ marginBottom: '2em' }}
        inputProps={{
          'data-testid': 'something-new',
        }}
      />

      <JSONEditor value={props.config} onChange={props.handleConfigChange} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '2em',
          gap: '8px',
        }}
      >
        <Button
          onClick={props.saveChanges}
          variant={'contained'}
          color="success"
        >
          <Save /> Save
        </Button>
        <Button onClick={props.loadTest} variant={'contained'} color={'info'}>
          <ScienceIcon /> Test Run
        </Button>
      </Box>
    </Paper>
  );
}

export default EditorView;
