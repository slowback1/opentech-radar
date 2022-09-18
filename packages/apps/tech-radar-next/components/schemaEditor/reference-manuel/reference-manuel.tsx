/* eslint-disable-next-line */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Theme,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import {
  StepReference,
  TopLevelReference,
} from '../../../utils/ConfigReferenceData';

export interface ReferenceManuelProps {}

export function ReferenceManuel(props: ReferenceManuelProps) {
  const accordionStyles = (theme) => ({
    backgroundColor: theme.palette.grey.A700,
  });
  const accordionHeaderStyles = (theme: Theme) => ({
    backgroundColor: theme.palette.background.default,
  });

  return (
    <Paper sx={{ padding: 2, overflowY: 'auto', height: '80vh' }}>
      <Typography variant={'h6'}>Config Reference</Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Top Level</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {TopLevelReference.map((reference) => (
            <Accordion key={reference.title}>
              <AccordionSummary
                sx={accordionHeaderStyles}
                expandIcon={<ExpandMore />}
              >
                <Typography>{reference.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={accordionStyles}>
                <Typography>
                  <b>{reference.type}</b> : {reference.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Steps</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {StepReference.map((reference) => (
            <Accordion key={reference.title}>
              <AccordionSummary
                sx={accordionHeaderStyles}
                expandIcon={<ExpandMore />}
              >
                <Typography>{reference.title}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={accordionStyles}>
                <Typography>
                  <b>{reference.type}</b> : {reference.text}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default ReferenceManuel;
