import { ScraperConfig } from '../Models/ScraperConfig';
import { BuildableWebScraperConfig } from '@opentech-radar/types';

export class ScraperConfigDTO {
  static CreateFromDBModel(model: ScraperConfig) {
    let dto = new ScraperConfigDTO();
    dto.id = model.id;
    dto.name = model.name;
    dto.config = model.config;

    return dto;
  }

  id?: number;
  name: string;
  config: BuildableWebScraperConfig;

  static CreateDBModel(dto: ScraperConfigDTO) {
    let model = new ScraperConfig();

    model.config = dto.config;
    model.id = dto.id;
    model.name = dto.name;

    return model;
  }
}
