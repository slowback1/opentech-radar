import { config } from 'dotenv';
import { schedule } from 'node-cron';
import { GetInvoker, Log } from '@opentech-radar/utilities';
import { Retriever } from './app/Retriever';
import Sender from './app/Sender';

config();
const scanTechRadar = async () => {
  const now = new Date();
  Log(`****TechRadar Starting at ${now.toISOString()}****`);

  const sections = await Retriever();
  await Sender(sections);

  const after = new Date();
  Log(`****TechRadar Finishing at ${after.toISOString()}****`);
};

const scheduleTasks = () => {
  scheduleTask('0 30 5 * * *', scanTechRadar);
};

const scheduleTask = (expression: string, task: () => void) => {
  schedule(expression, GetInvoker(task));
  Log(`[X] Scheduled Task ${task.name} to run on ${expression}`);
};

scheduleTasks();
if (process.env['NODE_ENV'] === 'development')
  scanTechRadar();
