import fetch from 'isomorphic-fetch'
import { API } from '../config'
import { handleResponse } from './auth'
export const preSignup = (user) => {
  return fetch(`${API}/pre-signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json()).catch(error => error)
}
export const signup = (activationToken) => {
  return fetch(`${API}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ activationToken })
  }).then(res => res.json()).catch(error => error)
}
export const login = (user) => {
  return fetch(`${API}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json()).catch(error => error)
}
export const getUserProfile = (token, _id) => {
  return fetch(`${API}/user/${_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    handleResponse(res)
    return res.json()
  }).catch(error => error)
}