import { ScraperConfigDTO, UnitOfWork } from '@opentech-radar/db-access';
import Link from 'next/link';
import { Clone } from '@opentech-radar/utilities';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

/* eslint-disable-next-line */
export interface SchemaPageProps {
  configs: ScraperConfigDTO[];
}

export function SchemaPage(props: SchemaPageProps) {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'h4'}>Today's Radar Hits</Typography>
        <Link href={'/schemas/new'}>
          <Button
            role={'link'}
            variant={'contained'}
            color={'primary'}
            component={'a'}
          >
            Create New Config
          </Button>
        </Link>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={10} />
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.configs.map((d, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Link href={`/schemas/${d.id}`}>
                    <a>
                      <EditIcon />
                    </a>
                  </Link>
                </TableCell>
                <TableCell>{d.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SchemaPage;

export async function getServerSideProps(): Promise<{
  props: SchemaPageProps;
}> {
  const unitOfWork = await UnitOfWork.Create();

  const configs = await unitOfWork.ScraperConfig.GetAll();

  return { props: { configs: Clone(configs) } };
}
