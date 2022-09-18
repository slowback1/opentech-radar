import { NextApiRequest, NextApiResponse } from 'next';
import { ScraperConfigDTO, UnitOfWork } from '@opentech-radar/db-access';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await Post(req, res);
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
  }
};

async function Post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as ScraperConfigDTO;

  const unitOfWork = await UnitOfWork.Create();

  const result = await unitOfWork.ScraperConfig.Save(body);

  if (result.result) res.status(201).json(body);
  else res.status(500).json({ message: 'Error Saving Data' });
}
