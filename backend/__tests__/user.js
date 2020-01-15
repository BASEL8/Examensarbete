const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

let data = [
  {
    username: 'baseasdlmsdm' + Math.floor(Math.random() * 1000),
    name: 'basel munawwar',
    email: 'basel8sd4msdasdn@gmail.com' + Math.floor(Math.random() * 1000),
    profile: '/basel_munawwar',
    password: 'hashed_password'
  },
  {
    username: 'baseasdlmsdm' + Math.floor(Math.random() * 1000),
    name: 'basel munawwar',
    email: 'basel8sd4msdasdn@gmail.com' + Math.floor(Math.random() * 1000),
    profile: '/basel_munawwar',
    password: 'password',
    published: true
  }]
describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  afterAll(async () => {
    for (let index = 0; index < data.length; index++) {
      await User.remove({ _id: data[index]._id })
    }
  })
  it('create & save user successfully', async () => {
    for (let index = 0; index < data.length; index++) {
      const user_1 = new User(data[index]);
      const savedUser = await user_1.save();
      data[index] = savedUser
      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(data[index].username);
    }
  });
  //all users
  it('get /users', () => { })
  ///user
  it('get /user/:username', () => { });
  // //publish
  it('post /user/publish', () => { });
  // //update user
  it('put /user/update', () => { });
  // //delete user
  it('delete /delete-my-account', () => { });
  // //delete user by admin
  it('delete /remove-user/:userId', () => { });
})

