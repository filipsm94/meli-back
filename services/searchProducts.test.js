const nock = require('nock');
const { getAllProductsByQuery, getAllProductsById } = require('./searchProducts');
const { responseProductsByQueryMock, responseProductByIdMock, responseProductByIdDescriptionMock } = require('../mocks/searchProducts.mock')

describe("Search Products", () => {

    afterEach(() => {
        nock.restore
    });

    test("should be return  ", async () => {
        const page = 'auto';
        const limit = 4;
        //specify the url to be intercepted
        nock("https://api.mercadolibre.com")
            //define the method to be intercepted
            .get(`/sites/MLA/search?q=${page}`)
            //respond with a OK and the specified JSON response
            .reply(200, {
                "status": 200,
                ...responseProductsByQueryMock
            });

        const { filters, items } = await getAllProductsByQuery(page, limit);

        expect(filters.length).toEqual(1);
        expect(items.length).toEqual(1);
    });

    test("returns a successful mocked response id", async () => {
        const id = 'auto';
        //specify the url to be intercepted
        nock("https://api.mercadolibre.com")
            //define the method to be intercepted
            .get(`/items/${id}/description`)
            //respond with a OK and the specified JSON response
            .reply(200, {
                "status": 200,
                ...responseProductByIdDescriptionMock
            });

        nock("https://api.mercadolibre.com")
            //define the method to be intercepted
            .get(`/items/${id}`)
            //respond with a OK and the specified JSON response
            .reply(200, {
                ...responseProductByIdMock
            });

        const item = await getAllProductsById(id);

        expect(item.id).toEqual('MLA877487392');
    });
});