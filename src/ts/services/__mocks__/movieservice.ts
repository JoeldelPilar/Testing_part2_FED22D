import { IMovie } from "../../models/IMovie";

let testData:IMovie[] = [
    {Title: "The Rock", imdbID: "1234", Type:"Action", Poster:"none", Year:"2023" },
    {Title: "The Mock", imdbID: "1234", Type:"Action", Poster:"none", Year:"2023" }
];
   

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise<IMovie[]>((resolve) => {
        resolve(testData);
    });
};
