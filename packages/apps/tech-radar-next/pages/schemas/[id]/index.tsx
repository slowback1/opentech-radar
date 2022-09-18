import { ScraperConfigDTO, UnitOfWork } from '@opentech-radar/db-access';
import React from 'react';
import { Clone } from '@opentech-radar/utilities';
import SchemaEditor from '../../../components/schemaEditor';

/* eslint-disable-next-line */
export interface EditSchemaPageProps {
  config: ScraperConfigDTO;
}

export function Id(props: EditSchemaPageProps) {
  return <SchemaEditor config={props.config} />;
}

export default Id;

export async function getServerSideProps(router): Promise<{
  props: EditSchemaPageProps;
}> {
  const { id } = router.query;

  const unitOfWork = await UnitOfWork.Create();

  const config = await unitOfWork.ScraperConfig.GetById(Number(id));

  return { props: { config: Clone(config) } };
}
