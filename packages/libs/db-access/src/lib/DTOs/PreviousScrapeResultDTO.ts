import { PreviousScrapeResult } from '../Models/PreviousScrapeResult';

export class PreviousScrapeResultDTO {
  static CreateFromModel(model: PreviousScrapeResult) {
    let dto = new PreviousScrapeResultDTO();
    dto.id = model.id;
    dto.title = model.title;
    dto.date = model.date;
    dto.link = model.link;

    return dto;
  }

  static ToDatabaseModel(dto: PreviousScrapeResultDTO) {
    let model = new PreviousScrapeResult();
    model.id = dto.id;
    model.title = dto.title;
    model.date = dto.date;
    model.link = dto.link;

    return model;
  }

  id?: number;
  title: string;
  date?: Date;
  link?: string;
}
