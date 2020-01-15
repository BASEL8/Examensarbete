const request = require('supertest');
const mongoose = require('mongoose');
const user = require('../models/user');
require('dotenv').config();

const uri = process.env.DATABASE;
const url = process.env.API_URL;

//create database test sample
beforeAll((done) => { });
//delete test sample from database
afterAll((done) => { });
//all users
describe('get /users', () => { })
//user
describe('get /user/:username', () => { });
//publish
describe('post /user/publish', () => { });
//update user
describe('put /user/update', () => { });
//delete user
describe('delete /delete-my-account', () => { });
//delete user by admin
describe('delete /remove-user/:userId', () => { });

