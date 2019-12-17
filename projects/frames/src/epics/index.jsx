/*
 * @Author: Squall Sha
 * @Date: 2019-11-20 15:30:00
 */
/* eslint-disable */
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
// import { map } from 'rxjs/operators';
import * as actions from '../actions';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';

// action将封装成Observable对象传入到函数内
function fetch(action$, state$) {
  // 使用ofType方法匹配相应的action
  // console.log(state$);
  return action$.ofType('FETCH_REQUEST')
  // switchMap将返回新的Observable对象，后续的方法将取消对action$的订阅，而订阅新返回的http对象
    .switchMap(action => {
      // ajax将从一个ajax请求中创建一个Observable，并且返回请求的结果
      return ajax({
        url: '/api/platform/getSite',
        method: 'POST',
        responseType: 'json'
      })
      // map/filter方法和数组的相应方法类似，可以用来对返回结果进行处理
        .map(res => res.response || res)
        .map(res => {
          if (res.error) {
            throw new Error(res.error);
          } else if (res.results) {
            return res.results;
          } else {
            throw new Error('invalid response');
          }
        })
        // 当结果处理完成后，就可以将其作为参数交给下一个action：fetchReceive进行dispatch。
        .map(actions.fetchSuccess)
        // 如果有错误的话，就交给相应的action来处理。在这里，这个action必须使用Observable.of方法转为一个observable
        .catch(error => Observable.of(actions.fetchFailure(error)));
    });
}

const epics = combineEpics(fetch);

export default epics;
