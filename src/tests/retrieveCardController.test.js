const request = require('supertest')
const { app } = require('../index')
const {handler: retrieveCardController} = require('../controllers/retrieveCardController')
const { query } = require('express')



describe('CONTROLLERS TEST', () => {

    const card = [{
        card_id: 2,
        user_fk: 2,
        card_type: "Credit",
        card_bank: "Visa",
        card_number: "4190 3552 1445 6360",
        expiration_date: "07/2025",
        cvc: "272",
        cardholder_name:"Aldo Acosta"
    }]

    it('GET /cards/:userid --> brings all cards that user has registered', async () => {
        const response = await request(app)
            .get('/cards/2')

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body["rows"]).toEqual(card)
    })

    const transactions = [{
        transaction_id: 1,
        recipient: "AldoAcosta",
        giver: "Fran-Cilia"
    },
    {
        transaction_id: 2,
        recipient: "JoseP",
        giver: "AldoAcosta"
    },
    {
        transaction_id: 3,
        recipient: "Fran-Cilia",
        giver: "JoseP"
    }]

    it('GET /transactions --> brings back all transaction stored in DB', async () => {
        const response = await request (app)
            .get('/transactions')
        
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body["rows"]).toEqual(transactions)
    })
})