const request = require('supertest');
const express = require('express');
const nock = require('nock');
const { responseProductsByQueryMock, responseProductByIdMock, responseProductByIdDescriptionMock } = require('../mocks/searchProducts.mock')
const app = express();

app.use('/api/items', require('../routes/items.routes'));

describe("Items Controller", () => {

  afterEach(() => {
    nock.restore
  });

  test('buscarUsuarios', async (done) => {
    const query = 'apple'
    nock("https://api.mercadolibre.com")
      //define the method to be intercepted
      .get(`/sites/MLA/search?q=${query}`)
      //respond with a OK and the specified JSON response
      .reply(200, {
        "status": 200,
        ...responseProductsByQueryMock
      });
    const res = await request(app).get(`/api/items?q=${query}`).expect(200);
    expect(res.body.author.name).toEqual('Felipe');
    expect(res.body.items.length).toEqual(1);
    done();
  })

  test('buscarUsuario', async (done) => {
    const id = 'apple'
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
    const res = await request(app).get(`/api/items/${id}`).expect(200);
    expect(res.body.item.id).toEqual('MLA877487392');
    done();
  })


});