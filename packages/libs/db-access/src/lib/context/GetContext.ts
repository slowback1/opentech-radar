import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ScraperConfig } from '../Models/ScraperConfig';
import TestModel from '../Models/TestModel';
import { PreviousScrapeResult } from '../Models/PreviousScrapeResult';
import PreviousScrapeResultRepo from '../Repositories/PreviousScrapeResultRepo';
import { seedPreviousScrapeResults } from '../seedData/seedPreviousScrapeResults';
import { seedScraperConfig } from '../seedData/seedScraperConfig';
import ScraperConfigRepo from '../Repositories/ScraperConfigRepo';
import { Log } from '@opentech-radar/utilities';
import { FilterWords } from '../Models/FilterWords';

const {
  NX_POSTGRES_USER,
  NX_POSTGRES_PASSWORD,
  NX_POSTGRES_DB,
  NX_POSTGRES_PORT,
  NODE_ENV,
  NX_POSTGRES_HOST,
} = process.env;

export default async function GetContext() {
  let contextOptions: DataSourceOptions;

  const isTestEnv = NODE_ENV === 'test';
  const hasDbConnectionVariables =
    NX_POSTGRES_DB &&
    NX_POSTGRES_PASSWORD &&
    NX_POSTGRES_USER &&
    NX_POSTGRES_PORT &&
    NX_POSTGRES_HOST;

  const isInMemory = isTestEnv || !hasDbConnectionVariables;

  if (isInMemory) {
    if (!isTestEnv)
      Log(
        'Warning: Database Environment Variables are not set!  Using a temporary in-memory database'
      );
    contextOptions = CreateInMemoryContextOptions();
  } else {
    contextOptions = CreateRealDatabaseContextOptions();
  }

  let context = new DataSource(contextOptions);

  await context.initialize();

  if (isInMemory) await seedDatabase(context);
  else await context.synchronize(false);

  return context;
}

async function runDBCreationQuery(context: DataSource) {
  await context.query(`CREATE DATABASE ${NX_POSTGRES_DB} `);
}

async function seedDatabase(context: DataSource) {
  let previousResultRepo = new PreviousScrapeResultRepo(context);
  let configRepo = new ScraperConfigRepo(context);

  let promises = seedPreviousScrapeResults
    .map((result) => {
      return previousResultRepo.Save(result);
    })
    .concat(
      seedScraperConfig.map((config) => {
        return configRepo.Save(config);
      })
    );

  await Promise.all(promises);
}

function GetEntities() {
  return [ScraperConfig, PreviousScrapeResult, FilterWords];
}

function CreateInMemoryContextOptions(): DataSourceOptions {
  return {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [...GetEntities(), TestModel],
    synchronize: true,
    logging: false,
  };
}

function CreateRealDatabaseContextOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    database: NX_POSTGRES_DB,
    username: NX_POSTGRES_USER,
    password: NX_POSTGRES_PASSWORD,
    port: Number(NX_POSTGRES_PORT),
    host: NX_POSTGRES_HOST,
    entities: GetEntities(),
    migrationsTransactionMode: 'all',
  };
}
