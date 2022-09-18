import { FilterWords } from "../Models/FilterWords";

export class FilterWordDTO {

    static CreateFromModel(model: FilterWords) {
        let dto = new FilterWordDTO();
        dto.id = model.id;
        dto.value = model.value;

        return dto;
    }

    static ToDatabaseModel(dto: FilterWordDTO) {
        let model = new FilterWords();

        model.id = dto.id;
        model.value = dto.value;

        return model;
    }

    id?: number;
    value?: string;
}