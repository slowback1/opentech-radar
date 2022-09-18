import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import dynamic from 'next/dynamic';

const JSONEditor = dynamic(import('../../jsonEditor'), { ssr: false });

export interface TestResultsModalProps {
  closeModal: () => void;
  testResults: string;
  show: boolean;
  isLoading: boolean;
}

export default function TestResultsModal(props: TestResultsModalProps) {
  return (
    <Dialog
      fullWidth
      maxWidth={'xl'}
      open={props.show}
      onClose={props.closeModal}
    >
      <Box>
        <DialogTitle>
          {props.isLoading ? 'Now Loading...' : 'Results'}
        </DialogTitle>
        <DialogContent>
          {props.isLoading ? (
            <CircularProgress />
          ) : (
            <JSONEditor value={props.testResults} onChange={() => {}} />
          )}
        </DialogContent>
      </Box>
    </Dialog>
  );
}
