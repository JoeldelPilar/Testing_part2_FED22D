import { getData } from '../services/movieservice';
import { testData } from '../dataArrayMock'

jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if(url.endsWith("error")) {
                reject([]);
            } else {
                resolve([testData]);
            }
        });
    }
}));

describe('testing happy-flow and error catch in getData', () => {
    test('should get data correctly', async () => {
        let data = await getData("test");
        expect(data.length).toBe(3);
    });
});

