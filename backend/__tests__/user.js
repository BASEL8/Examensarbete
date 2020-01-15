const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();
const url = process.env.API_URL
let data = [
  {
    username: 'basel' + Math.floor(Math.random() * 10000),
    name: 'basel munawwar',
    email: 'basel8sd4mn@gmail.com' + Math.floor(Math.random() * 10000),
    profile: '/basel_munawwar',
    password: 'password'
  },
  {
    username: 'basel' + Math.floor(Math.random() * 10000),
    name: 'basel munawwar',
    email: 'basel@gmail.com' + Math.floor(Math.random() * 10000),
    profile: '/basel_munawwar',
    password: 'password',
    published: true
  },
  {
    username: 'basel' + Math.floor(Math.random() * 10000),
    name: 'basel munawwar',
    email: 'basel@gmail.com' + Math.floor(Math.random() * 10000),
    profile: '/basel_munawwar',
    password: 'password',
    published: true
  }]
describe('User Model Test', () => {
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
    for (let index = 0; index < data.length; index++) {
      await User.remove({ _id: data[index]._id })
    }
    return done()
  })
  it('create & save user successfully', async (done) => {
    for (let index = 0; index < data.length; index++) {
      const user_1 = new User(data[index]);
      const savedUser = await user_1.save();
      data[index] = {};
      data[index]._id = savedUser._id
      expect(savedUser._id).toBeDefined();
      expect(savedUser._id).toBe(data[index]._id);
    }
    return done()
  });
  //all users
  it('get /users', async (done) => {
    const response = await request(url)
      .get(`/users`)
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.users).toBeDefined();
    response.body.users.forEach(user => {
      expect(data.map(u => u.username).indexOf(user.username))
        .not
        .toBe(-1)
      expect(user.published).toBeTruthy()
      expect(user.email).toBeUndefined()
      expect(user.hashed_password).toBeUndefined()
    });
    return done()
  })
  ///user
  it('get /user/:_id', async (done) => {
    const response = await request(url)
      .get(`/user/${data[0]._id}`)
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body.username).toEqual(data[0].username)
    expect(response.body.email).toBeUndefined()
    expect(response.body.hashed_password).toBeUndefined()
    return done()
  });
  // //publish
  it('put /user/publish', async (done) => {
    const response = await request(url)
      .put(`/user/publish`)
      .send({
        _id: data[0]._id,
      })
    console.log(response.body._id.toString() === data[0]._id.toString())
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('object');
    expect(response.body._id.toString()).toEqual(data[0]._id.toString())
    expect(response.body.email).toBeUndefined()
    expect(response.body.hashed_password).toBeUndefined()
    expect(response.body.published).toBeTruthy()
    return done()
  });
  // //update user
  it('put /user/update', () => { });
  // //delete user
  it('delete /delete-my-account', () => { });
  // //delete user by admin
  it('delete /remove-user/:userId', () => { });
})

