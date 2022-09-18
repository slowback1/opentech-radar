import { DataSource, Repository } from 'typeorm';
import { ScraperConfig } from '../Models/ScraperConfig';
import { ScraperConfigDTO } from '../DTOs/ScraperConfigDTO';

export default class ScraperConfigRepo {
  constructor(private context: DataSource) {
    this.scraperConfigRepository = context.getRepository(ScraperConfig);
  }
  private scraperConfigRepository: Repository<ScraperConfig>;

  private static Complete(result) {
    if (result.id) return { result: true };
    else return { result: false };
  }

  async Save(scraperConfig: ScraperConfigDTO) {
    let saveResult = await this.scraperConfigRepository.save(
      ScraperConfigDTO.CreateDBModel(scraperConfig)
    );

    return ScraperConfigRepo.Complete(saveResult);
  }

  async GetById(id: number) {
    let findResult = await this.scraperConfigRepository.findOne({
      where: { id: id },
    });

    if (findResult) return ScraperConfigDTO.CreateFromDBModel(findResult);

    return null;
  }
  async GetAll() {
    let scraperConfigs = await this.scraperConfigRepository.find();

    return scraperConfigs.map((scraperConfig) =>
      ScraperConfigDTO.CreateFromDBModel(scraperConfig)
    );
  }

  async DeleteById(id: number) {
    let deleteResult = await this.scraperConfigRepository.delete({ id: id });

    return { result: deleteResult.affected > 0 };
  }
}
