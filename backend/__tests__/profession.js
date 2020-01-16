const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const url = process.env.API_URL
const testUser = { name: 'admin', email: 'basel84mn@gmail.com', password: '12121212', role: '1', profile: '123123', username: '234234' }
describe('Profession Model Test', () => {
  let token;
  let professions = [
    { name: 'Test', subProfessions: [{ name: 'rest' }, { name: 'r' }] },
    { name: 'Designer', subProfessions: [{ name: 'UI/UX' }, { name: 'Graphic design' }] },
    { name: 'Developer', subProfessions: [{ name: 'FrontEnd' }, { name: 'Backend' }] }
  ];
  beforeAll(async (done) => {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      return done()
    });
  });
  afterAll(async (done) => {
    await User.remove({ _id: testUser._id })
    return done()
  })
  it('create & save user successfully', async (done) => {
    const user = new User(testUser);
    const savedUser = await user.save();
    testUser._id = savedUser._id
    token = jwt.sign({ _id: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return done()
  });
  /*
  router.post('/profession', requiresignin, adminMiddleware, create)
  router.get('/profession', requiresignin, adminMiddleware, list)
  router.delete('/profession/adminRemoveProfession', requiresignin, adminMiddleware, adminRemoveProfession)
  //router.delete('/blog/userRemoveProfession/:slug', requiresignin, userRemoveProfession)
  router.put('/profession/:_id', requiresignin, update)
  router.get('/profession/search', listSearch);
  router.post('/profession/related', listRelated);
  */
  it('post /profession', async (done) => {
    for (let index = 0; index < professions.length; index++) {
      const response = await request(url)
        .post(`/profession`)
        .set({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
        .send({ ...professions[index] })
      console.log(response.body)
      expect(response.status).toEqual(200);
      expect(response.body._id).toBeDefined()
      if (response.status === 200) {
        professions[index] = { ...response.body }
      }
    }
    done()
    return
  })
  it('delete /profession/adminRemoveProfession', async (done) => {
    for (let index = 0; index < professions.length; index++) {
      const response = await request(url)
        .delete('/profession/adminRemoveProfession')
        .set({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        })
        .send({
          _id: professions[index]._id
        })
      expect(response.status).toEqual(200)
      expect(response.body.message).toBe('profession deleted successfully')
    }
    done()
  })
})

