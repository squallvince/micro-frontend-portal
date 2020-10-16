/*
 * @Author: Squall Sha 
 * @Date: 2020-02-19 15:47:02 
 * @Last Modified by:   Squall Sha 
 * @Last Modified time: 2020-02-19 15:47:02 
 */

 import { AUTH, IAuthCheckAction, IUserInfo } from 'store/auth/types';

export const checkAuth = (userInfo: IUserInfo): IAuthCheckAction => {
  return {
    type: AUTH,
    payload: userInfo
  };
};
