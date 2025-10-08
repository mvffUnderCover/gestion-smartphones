// smartphone.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // ton app Express
const Smartphone = require('../models/smartphone');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Smartphone.deleteMany(); // on part d'une base propre
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('🧪 Tests CRUD des smartphones', () => {
  let createdSmartphone;

  // ✅ CREATE
  test('POST /api/smartphones ➜ crée un smartphone', async () => {
    const newSmartphone = {
      nom: 'Pixel 8',
      marque: 'Google',
      prix: 899,
      description: 'Smartphone Google 2023',
      caracteristiques: {
        ram: '8 Go',
        rom: '128 Go',
        ecran: '6.2 pouces'
      },
      photos: ['photo1.jpg'],
      couleurs: ['noir', 'bleu']
    };

    const res = await request(app)
      .post('/api/smartphones')
      .send(newSmartphone);

    expect(res.statusCode).toBe(201);
    expect(res.body.nom).toBe('Pixel 8');
    expect(res.body.id).toBeDefined(); // car ton contrôleur ajoute un id auto-incrémenté

    createdSmartphone = res.body; // on sauvegarde pour les tests suivants
  });

  // ✅ READ ALL
  test('GET /api/smartphones ➜ récupère tous les smartphones', async () => {
    const res = await request(app).get('/api/smartphones');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ✅ READ ONE (ton contrôleur utilise id, pas _id)
  test('GET /api/smartphones/:id ➜ récupère un smartphone par ID', async () => {
    const res = await request(app).get(`/api/smartphones/${createdSmartphone.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nom).toBe('Pixel 8');
  });

  // ✅ UPDATE (par id aussi)
  test('PUT /api/smartphones/:id ➜ met à jour un smartphone', async () => {
    const updateData = { prix: 950 };

    const res = await request(app)
      .put(`/api/smartphones/${createdSmartphone.id}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body.prix).toBe(950);
  });

  // ✅ DELETE (ton middleware attend le header "x-delete-code")
  test('DELETE /api/smartphones/:id ➜ supprime un smartphone avec code valide', async () => {
    const res = await request(app)
      .delete(`/api/smartphones/${createdSmartphone.id}`)
      .set('x-delete-code', process.env.DELETE_CODE || '123'); // correspond à ton middleware

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/supprimé/i);
  });
});
