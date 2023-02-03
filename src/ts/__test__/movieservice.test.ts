import { getData } from '../services/movieservice';
import { testData } from '../dataArrayMock'

jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if(url.endsWith("error")) {
                reject([]);
            } else {
                resolve({ data: {Search: testData } });
            }
        });
    }
}));


describe('testing happy-flow and error catch in getData', () => {

    test('should get data correctly', async () => {

        let result = await getData("fejk data"); 

        expect(result.length).toBe(4);
        expect(result[0].Title).toBe(testData[0].Title);
    });

    test('should not get data', async () => {

        try {
            let result = await getData("error");
        }
        catch(error: any) {
            expect(error.length).toBe(0);
        }
    });
});
