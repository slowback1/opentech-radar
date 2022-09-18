import { NextApiRequest, NextApiResponse } from 'next';
import { UnitOfWork } from '@opentech-radar/db-access';
import { FilterWordDTO } from '../../../../../libs/db-access/src/lib/DTOs/FilterWordDTO';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await Post(req, res);
      break;
    case 'DELETE':
      await Delete(req, res);
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
};

async function Post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as FilterWordDTO;

  const unitOfWork = await UnitOfWork.Create();

  const result = await unitOfWork.FilterWord.Save(body);

  if (result.result) res.status(201).json(body);
  else res.status(500).json({ message: 'Error Saving Data' });
}

async function Delete(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as FilterWordDTO;

  const unitOfWork = await UnitOfWork.Create();

  const result = await unitOfWork.FilterWord.Delete(body);

  if (result) res.status(200).json(body);
}
