const request = require('supertest');
const app = require('../server');

describe('Users API', () => {
  it('GET /api/users returns list', async () => {
    const res = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  it('GET /api/users/:id returns a user', async () => {
    const res = await request(app).get('/api/users/1').expect(200);
    expect(res.body).toHaveProperty('name','Alice');
  });

  it('POST /api/users creates a user', async () => {
    const res = await request(app).post('/api/users').send({name:'Dave'}).expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Dave');

    const res2 = await request(app).get(`/api/users/${res.body.id}`).expect(200);
    expect(res2.body.name).toBe('Dave');
  });

  it('GET /api/users/999 returns 404', async () => {
    await request(app).get('/api/users/999').expect(404);
  });
});