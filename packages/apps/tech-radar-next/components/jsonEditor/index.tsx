import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-twilight';
import { NoSsr } from '@mui/material';

export interface JSONEditorProps {
  value: string;
  onChange: (v: string) => void;
}

export default function JSONEditor(props: JSONEditorProps) {
  const tryToFormat = (value: string) => {
    try {
      return JSON.stringify(JSON.parse(value), null, 4);
    } catch {
      return value;
    }
  };

  const handleChange = (v) => props.onChange(tryToFormat(v));

  return (
    <NoSsr>
      <AceEditor
        value={props.value}
        onChange={handleChange}
        mode={'json'}
        theme={'twilight'}
        width={'100%'}
        height={'55vh'}
      />
    </NoSsr>
  );
}
