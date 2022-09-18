import styles from './index.module.scss';
import {
  PreviousScrapeResultDTO,
  UnitOfWork,
} from '@opentech-radar/db-access';
import { Clone } from '@opentech-radar/utilities';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState } from 'react';
import NoResults from '../components/noResults';

export function Index(props: { data: PreviousScrapeResultDTO[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(props.data);

  const scan = async () => {
    setIsLoading(true);

    let scanResults: PreviousScrapeResultDTO[] = await fetch(
      `/api/scraper/scan`
    ).then((res) => res.json());

    setData(scanResults);

    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <Typography variant={'h4'}>Today's Radar Hits</Typography>
      <br />

      {data.length === 0 ? (
        <NoResults scan={scan} isLoading={isLoading} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={10} />
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <a target={'_blank'} href={d.link}>
                      <OpenInNewIcon />
                    </a>
                  </TableCell>
                  <TableCell>{d.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const unitOfWork = await UnitOfWork.Create();

  let data = await unitOfWork.PreviousScrapeResult.GetAllForDate(new Date());

  return { props: { data: Clone(data) } };
}

export default Index;
