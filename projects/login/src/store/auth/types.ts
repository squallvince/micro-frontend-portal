/*
 * @Author: Squall Sha 
 * @Date: 2020-02-19 15:46:44 
 * @Last Modified by:   Squall Sha 
 * @Last Modified time: 2020-02-19 15:46:44 
 */

export const AUTH = 'AUTH';

export interface IUserInfo {
  login: string
  password: string
}

export interface IAuthState {
  isAuth: boolean
  login: string
  password: string
}

export interface IAuthCheckAction {
  type: typeof AUTH
  payload: {
    login: string
    password: string
  }
}
