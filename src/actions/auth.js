import cookie from 'js-cookie'
import { history } from '../index'
import { API } from '../config'

export const handleResponse = (res) => {
  if (res.status === 401) {
    removeCookie('token');
    removeLocalStorage('user');
    history.push('/')
  }
}
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 })
  }
}
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key)
  }
}
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key)
  }
}
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}
export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next();
}
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
      }
      return false
    }
  }
}
export const signout = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  history.push('/');
  next(false);
  return fetch(`${API}/signout`, { method: 'GET' }).then(res => res).catch(error => console.log(error))
}