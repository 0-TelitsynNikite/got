export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return  await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter)
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character)
    }

    async getAllBooks() {
        const books = await this.getResource(`/books/`);
        return books.map(this._transformCharacter)
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformCharacter(book);
    }

    async getAllHouses() {
        const houses = await this.getResource(`/houses/`);
        return houses.map(this._transformCharacter);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformCharacter(house)
    }

    _transformCharacter(char) {

        for(let key in char) {

            if (!char[key]) {
                char[key] = `have no data`
            }

        }

        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {

        for(let key in house) {

            if (!house[key]) {
                house[key] = `have no data`
            }
            
        }

        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBook(book) {

        for(let key in book) {

            if (!book[key]) {
                book[key] = `have no data`
            }
            
        }
        
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}

