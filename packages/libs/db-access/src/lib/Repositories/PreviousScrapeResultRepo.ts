import { DataSource, Repository } from 'typeorm';
import { PreviousScrapeResult } from '../Models/PreviousScrapeResult';
import { PreviousScrapeResultDTO } from '../DTOs/PreviousScrapeResultDTO';

export default class PreviousScrapeResultRepo {
  constructor(private context: DataSource) {
    this.previousScraperResultRepository =
      context.getRepository(PreviousScrapeResult);
  }
  private previousScraperResultRepository: Repository<PreviousScrapeResult>;

  private static Complete(result) {
    if (result.id) return { result: true };
    else return { result: false };
  }

  async Save(scraperConfig: PreviousScrapeResultDTO) {
    let saveResult = await this.previousScraperResultRepository.save(
      PreviousScrapeResultDTO.ToDatabaseModel(scraperConfig)
    );

    return PreviousScrapeResultRepo.Complete(saveResult);
  }

  async GetById(id: number) {
    let findResult = await this.previousScraperResultRepository.findOne({
      where: { id: id },
    });
    return PreviousScrapeResultRepo.CompleteFind(findResult);
  }

  private static CompleteFind(findResult: PreviousScrapeResult) {
    if (findResult) return PreviousScrapeResultDTO.CreateFromModel(findResult);

    return null;
  }

  async DeleteById(id: number) {
    let deleteResult = await this.previousScraperResultRepository.delete({
      id: id,
    });

    return { result: deleteResult.affected > 0 };
  }

  async FindByName(name: string) {
    let findResult = await this.previousScraperResultRepository.findOne({
      where: { title: name },
    });

    return PreviousScrapeResultRepo.CompleteFind(findResult);
  }

  async NameExists(name: string) {
    let findResult = await this.previousScraperResultRepository.findBy({
      title: name,
    });

    return findResult.length > 0;
  }

  async GetAllForDate(date: Date) {
    let likeString = PreviousScrapeResultRepo.getLikeString(date);

    let findResult = await this.previousScraperResultRepository.find({
      where: {
        date: likeString,
      },
    });

    return this.ProcessFindMany(findResult);
  }

  private ProcessFindMany(findResult: PreviousScrapeResult[]) {
    return findResult.map((result) =>
      PreviousScrapeResultDTO.CreateFromModel(result)
    );
  }

  private static getLikeString(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` as any;
  }

  async GetAllForDateAndConfig(date: Date, configID: number) {
    let likeString = PreviousScrapeResultRepo.getLikeString(date);

    let findResult = await this.previousScraperResultRepository.find({
      where: {
        date: likeString,
      },
    });

    return this.ProcessFindMany(findResult);
  }
}
