const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();
let userData = { username: 'baseasdlmsdm' + Math.floor(Math.random() * 1000), name: 'basel munawwar', email: 'basel8sd4msdasdn@gmail.com' + Math.floor(Math.random() * 1000), profile: '/basel_munawwar', password: 'hashed_password' };

describe('User Model Test', () => {
  let connection;
  // It's just so easy to connect to the MongoDB Memory Server 
  // By using mongoose.connect
  beforeAll(async () => {
    connection = await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  afterAll(async () => {
    await User.remove({ _id: userData._id })
  })
  it('create & save user successfully', async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    userData = savedUser
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
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

