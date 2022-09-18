import { ScraperConfigDTO } from '@opentech-radar/db-access';
import { useState } from 'react';
import { SampleConfig } from '../utils/SampleConfig';

export default function useConfigControl(dto?: ScraperConfigDTO) {
  const [name, setName] = useState(dto?.name ?? '');
  const [config, setConfig] = useState(
    JSON.stringify(dto?.config ?? SampleConfig, null, 2)
  );
  const [id, setId] = useState(dto?.id ?? 0);
  const [isLoadingTest, setIsLoadingTest] = useState(false);
  const [testResults, setTestResults] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const loadTest = async () => {
    setIsLoadingTest(true);
    setShowResults(true);

    const body = JSON.parse(config);

    let result = await fetch(`/api/scraper/run`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    }).then((res) => res.json());

    setTestResults(JSON.stringify(result, null, 2));
    setIsLoadingTest(false);
  };

  const closeModal = () => setShowResults(false);

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleConfigChange = (e: string) => setConfig(e);

  const saveChanges = async () => {
    let body: ScraperConfigDTO = {
      config: JSON.parse(config),
      name: name,
      id: id,
    };

    let saveResult = await fetch(`/api/configs`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => res.json());

    setShowSnackbar(true);

    return !!saveResult.name;
  };

  const hideSnackbar = () => setShowSnackbar(false);

  return {
    handleNameChange,
    handleConfigChange,
    name,
    config,
    saveChanges,
    testResults,
    closeModal,
    loadTest,
    isLoadingTest,
    showResults,
    showSnackbar,
    hideSnackbar,
  };
}
