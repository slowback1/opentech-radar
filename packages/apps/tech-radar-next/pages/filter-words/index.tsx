import { UnitOfWork } from '@opentech-radar/db-access';
import { FilterWordDTO } from '../../../../libs/db-access/src/lib/DTOs/FilterWordDTO';
import { Button, Stack } from '@mui/material';
import FilterWordEditor from '../../components/FilterWordEditor';
import { useState } from 'react';
import { Clone } from '@opentech-radar/utilities';

export function Index(props: { data: FilterWordDTO[] }) {
  const [newWords, setNewWords] = useState<FilterWordDTO[]>([]);

  const createFilterWord = () => {
    const clone = Array.from(newWords);
    clone.push({ value: '', id: newWords.length + props.data.length + 1 });
    setNewWords(clone);
  };

  return (
    <Stack direction={'column'} spacing={2}>
      {props.data.map((filterWord) => (
        <FilterWordEditor {...filterWord} key={filterWord.id} />
      ))}
      {newWords.map((filterWord) => (
        <FilterWordEditor {...filterWord} key={filterWord.id} />
      ))}
      <Button onClick={createFilterWord}>Create New Word</Button>
    </Stack>
  );
}

export async function getServerSideProps() {
  const unitOfWork = await UnitOfWork.Create();

  let data = await unitOfWork.FilterWord.GetAll();

  return { props: { data: Clone(data) } };
}

export default Index;
