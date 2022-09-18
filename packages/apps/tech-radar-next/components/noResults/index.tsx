import { Paper, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export interface NoResultsProps {
  scan: () => Promise<void>;
  isLoading: boolean;
}

export default function NoResults(props: NoResultsProps) {
  return (
    <Paper>
      <Typography variant={'h2'}>Radar Has Not Scanned Today</Typography>
      <LoadingButton
        onClick={props.scan}
        loading={props.isLoading}
        loadingPosition={'start'}
        variant={'contained'}
        color={'primary'}
      >
        Scan Tech Radar
      </LoadingButton>
    </Paper>
  );
}
