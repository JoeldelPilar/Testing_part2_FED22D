import { movieSort } from "../functions";
import { testData } from "../dataArrayMock";

describe("MovieSort", () => {
    test('should sort by title desc order if desc is true', () => {
        //Arrange
        let data = testData
        let result = [
        {Title: "Aa", imdbID: "4321", Type:"Action", Poster:"Done", Year:"2023" },
        {Title: "Bb", imdbID: "1234", Type:"Bction", Poster:"None", Year:"2022" },
        {Title: "Bb", imdbID: "1234", Type:"Bction", Poster:"None", Year:"2022" },
        {Title: "Cc", imdbID: "5678", Type:"Cction", Poster:"Bone", Year:"2024" }
    ];
        //Act
        movieSort(data);
        //Assert
        expect(data).toEqual(result);
        expect(data[0].Title).toBe("Aa");
        expect(data[1].Title).toBe("Bb");
        expect(data[2].Title).toBe("Bb");
        expect(data[3].Title).toBe("Cc");
    });

    test('should sort by title ascc order if desc is false ', () => {
        //Arrange
        let data = testData
        let result = [
        {Title: "Cc", imdbID: "5678", Type:"Cction", Poster:"Bone", Year:"2024" },
        {Title: "Bb", imdbID: "1234", Type:"Bction", Poster:"None", Year:"2022" },
        {Title: "Bb", imdbID: "1234", Type:"Bction", Poster:"None", Year:"2022" },
        {Title: "Aa", imdbID: "4321", Type:"Action", Poster:"Done", Year:"2023" },
        
    ];
        //Act
        movieSort(data, false);
        //Assert
        expect(data).toEqual(result);
        expect(data[0].Title).toBe("Cc");
        expect(data[1].Title).toBe("Bb");
        expect(data[2].Title).toBe("Bb");
        expect(data[3].Title).toBe("Aa");
    });
});