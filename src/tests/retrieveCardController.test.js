const request = require('supertest')
const { app } = require('../index')
const {handler: retrieveCardController} = require('../controllers/retrieveCardController')
const { query } = require('express')



describe('TODOs retrieveCardController', () => {

    const card = [{
        cardid: 2,
        userfk: 2,
        cardtype: "Credit",
        cardbank: "Visa",
        cardnumber: "4190 3552 1445 6360",
        expirationdate: "07/2025",
        cvc: "272",
        cardholdername:"Aldo Acosta"
    }]

    it('GET /cards/:userid --> brings all cards that user has registered', async () => {
        const response = await request(app)
            .get('/cards/2')

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body["rows"]).toEqual(card)
    })
})