import GetContext from "../context/GetContext";
import { FilterWordDTO } from "../DTOs/FilterWordDTO"
import FilterWordsRepo from './FilterWordsRepo';

describe("FilterWordsRepo", () => {
    function getTestData() {
        let dto = new FilterWordDTO();

        dto.value = "chicken";

        return dto;
    }
    let repo: FilterWordsRepo
    beforeEach(async () => {
        let context = await GetContext();
        repo = new FilterWordsRepo(context);
    })


    it("Save is successful", async () => {
        let result = await repo.Save(getTestData());

        expect(result.result).toBeTruthy();

        let getResult  = await repo.GetAll();

        expect(getResult.length).toEqual(1);
    });

})