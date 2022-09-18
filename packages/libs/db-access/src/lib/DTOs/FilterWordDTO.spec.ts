import { FilterWords } from '../Models/FilterWords';
import { FilterWordDTO } from './FilterWordDTO';

describe("FilterWordDTO", () => {
    it("data survives round trip", () => {
        let originalModel = new FilterWords();
        originalModel.id = 1;
        originalModel.value = "test";

        let dto = FilterWordDTO.CreateFromModel(originalModel);

        let resultingModel = FilterWordDTO.ToDatabaseModel(dto);

        expect(resultingModel).toEqual(originalModel);

    })
})