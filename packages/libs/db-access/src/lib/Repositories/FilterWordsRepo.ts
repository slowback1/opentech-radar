import { DataSource, Repository } from 'typeorm';
import { FilterWordDTO } from '../DTOs/FilterWordDTO';
import { FilterWords } from '../Models/FilterWords';

export default class FilterWordsRepo {
  constructor(private context: DataSource) {
    this.filterWordsRepository = context.getRepository(FilterWords);
  }
  private filterWordsRepository: Repository<FilterWords>;

  private static Complete(result) {
    if (result.id) return { result: true };
    else return { result: false };
  }

  async Save(filterWord: FilterWordDTO) {
    let saveResult = await this.filterWordsRepository.save(
      FilterWordDTO.ToDatabaseModel(filterWord)
    );

    return FilterWordsRepo.Complete(saveResult);
  }

  async Delete(filterWord: FilterWordDTO) {
    let saveResult = await this.filterWordsRepository.delete({
      id: filterWord.id,
    });

    return saveResult;
  }

  async GetAll() {
    let results = await this.filterWordsRepository.find();

    let dtos = results.map((result) => FilterWordDTO.CreateFromModel(result));

    return dtos;
  }
}
