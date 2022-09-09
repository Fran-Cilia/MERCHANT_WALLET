const request = require('supertest')
const { app } = require('../index')
const {handler: retrieveCardController} = require('../controllers/retrieveCardController')
const { query } = require('express')



describe('CONTROLLERS TEST', () => {

    //TEST: retrieveCardController

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


    it('GET /cards/users/:user_id --> brings all cards that user has registered', async () => {
        const response = await request(app)
            .get('/cards/users/2')

        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body["rows"]).toEqual(card)
    })

    //TEST: retrieveTransactionsController

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

    //TEST: ingestCardController 
    
    const newCard = {
        userfk: 1,
        cardType: 'Credit',
        cardBank: 'Master Card',
        cardNumber: '1234 5678 9123 4567',
        expirationDate: '02/2023',
        cvc: '989',
        cardholderName:'Francisco Cilia'
    }

    it('POST /cards/users/:user_id --> saves users card in DB', async () => {
        const response = await request (app)
            .post('/cards/users/1')
            .send(newCard)
        
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(200);
    })

    it('POST /cards/users/:user_id --> sending improper JSON body recieves status 400', async () => {
        const response = await request (app)
            .post('/cards/users/1')
            .send({userfk: 1})
        
        expect(response.status).toEqual(400);
    })

})