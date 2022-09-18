import { FilterWordDTO } from '../../../../libs/db-access/src/lib/DTOs/FilterWordDTO';
import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DeleteOutlined, SaveAs } from '@mui/icons-material';

export default function FilterWordEditor(props: FilterWordDTO) {
  const [value, setValue] = useState(props.value);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const Save = async () => {
    setIsSaving(true);

    let body = {
      value,
      id: props.id,
    };

    let options: RequestInit = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    };

    let result = await fetch('/api/filter-words', options).then((res) =>
      res.json()
    );

    if (result) setSaved(true);

    setIsSaving(false);
  };

  const Delete = async () => {
    let body = {
      value,
      id: props.id,
    };

    let options: RequestInit = {
      body: JSON.stringify(body),
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    };

    let result = await fetch('/api/filter-words', options).then((res) =>
      res.json()
    );

    window.location.reload();
  };

  return (
    <Stack direction={'row'} spacing={4}>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} />
      <LoadingButton
        loadingPosition={'start'}
        loading={isSaving}
        startIcon={<SaveAs />}
        onClick={Save}
        color={'success'}
        variant={'contained'}
      >
        Save Changes
      </LoadingButton>
      <Button
        variant={'contained'}
        startIcon={<DeleteOutlined />}
        onClick={Delete}
        color={'error'}
      >
        Delete
      </Button>
    </Stack>
  );
}
