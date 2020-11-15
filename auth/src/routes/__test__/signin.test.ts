import request from 'supertest';
import { app } from '../../app';

it('fails with wrong email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test12312@test.com',
      password: 'password',
    })
    .expect(400);
});

it('succeeds with right email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tester@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'tester@test.com',
      password: 'password',
    })
    .expect(200);
});

it('fails with wrong pass', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tester@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'tester@test.com',
      password: 'password1',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
