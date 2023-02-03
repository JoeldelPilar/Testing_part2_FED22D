/** 
 * @jest-environment jsdom
*/

import * as movieApp from '../movieApp'
import { getData } from '../services/movieservice';
import { IMovie } from '../models/IMovie';
import { testData } from '../dataArrayMock';

beforeEach(() => {
    document.body.innerHTML = ``;
    // jest.restoreAllMocks();
});

jest.mock('../services/movieservice');

describe('testing init function works as expected', () => {

    test('Should call handleSubmit() correctly', () => {

        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        `

        let spyOnHandleSubmit = jest.spyOn(movieApp, 'handleSubmit').mockReturnValue(new Promise<void>((resolve)=> {
            resolve();
        }));
        //Act
        movieApp.init();
        (document.getElementById('searchForm') as HTMLFormElement).submit();
        //Assert
        expect(spyOnHandleSubmit).toHaveBeenCalled();
        spyOnHandleSubmit.mockRestore();
    });
});

describe('Tests for handleSubmit function', () => {

    test('Should get data correctly and call createHtml', async () => {

        //Arrange
        let movies: IMovie[] = [];

        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `

        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = 'test';
        let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

        let spyOnCreateHtml = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
        // let spyOnDisplayNoResults = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();
    
        //Act
        await movieApp.handleSubmit()
        movies = await getData(searchText);

        let foundContainer = document.getElementsByClassName('movies');

        //Assert
        expect(movies.length).toBe(4);
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toBeCalledWith(movies, container);
        expect(foundContainer).toBeTruthy();

        // spyOnDisplayNoResults.mockRestore();
        spyOnCreateHtml.mockRestore();
        
    });

    test('should call displayNoResults when movies.length <= 0', async () => {

        //Arrange
        let movies: IMovie[] = [];

        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `

        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = '';
        let spyOnDisplayNoResults = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();
        
        //Act
        await movieApp.handleSubmit();

        //Assert
        expect(spyOnDisplayNoResults).toHaveBeenCalled();
        spyOnDisplayNoResults.mockRestore();
    });

    test('Should get an error and call displayNoResult', async () => {

        //Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `
        
        let searchText = (document.getElementById("searchText") as HTMLInputElement).value = 'error';

        let spyOnDisplayNoResults = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();
    
        //Act
        await movieApp.handleSubmit();

        //Assert
        expect(spyOnDisplayNoResults).toHaveBeenCalled();

        spyOnDisplayNoResults.mockRestore();
        
    });
});

describe('Testing createHtml function', () => {

    test('should create html correctly', () => {

        //Arrange
        document.body.innerHTML = `
        <div id="movie-container"></div>
        `
        let container = document.getElementById('movie-container') as HTMLDivElement;
        //Act
        movieApp.createHtml(testData, container);
        //Assert
        let titleCheck = container.firstChild?.firstChild?.textContent;
        let check = document.getElementsByClassName('movie');
        expect(container.innerHTML).toContain('h3');
        expect(container.innerHTML).toContain('img');
        expect(check).toBeTruthy();
        expect(titleCheck).toContain('Bb');
    });

});

describe('Testing displayNoResult', () => {

    test('displayNoResult should generate and display noMessage', () => {

        //Arrange
        document.body.innerHTML = `<div id="movie-container"></div>`

        let container = document.getElementById('movie-container') as HTMLDivElement;

        //Act
        movieApp.displayNoResult(container);

        let assert = container.firstChild?.textContent

        //Assert
        expect(container.innerHTML).toContain('p');
        expect(assert).toBe('Inga sökresultat att visa');
    });
});