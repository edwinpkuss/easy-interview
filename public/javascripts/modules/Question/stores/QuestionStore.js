import NProgress from 'nprogress';
import QuestionActions from '../actions/QuestionActions';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import { QuestionEvent } from '../../Common/events';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import QuestionReducer from '../reducers/QuestionReducer';
import { fetchQuestions, getQuestions } from '../actions/QuestionActions';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';

export const store = compose(
  applyMiddleware(thunkMiddleware),
  reduxReactRouter({ createHistory })
)(createStore)(QuestionReducer);

store.dispatch(fetchQuestions({}));

var QuestionStore = {
  _records                  : [],
  _selectedQuestions        : [],
  _searchConditions  : {},

  _registerToActions: function (action) {
    switch (action.actionType) {
      case 'GET_QUESTIONS':
        this._records = action.content;
        NProgress.set(0.5);
        QuestionEvent.emit('LOAD_QUESTION');
        break;

      case 'UPDATE_QUESTION':
        NProgress.set(0.5);
        QuestionActions.get(this.getSearchConditions());
        break;

      case 'DELETE_QUESTION':
        NProgress.set(0.5);
        QuestionActions.get(this.getSearchConditions());
        break;

      case 'SELECT_QUESTION':
        this._selectedQuestions = this._selectedQuestions.concat(this._records.filter(
          (record) => record.id === action.data
        ));
        QuestionEvent.emit('SELECTION_CHANGE');
        break;

      case 'UNSELECT_QUESTION':
        for (var i = 0, l = this._selectedQuestions.length; i < l; ++i) {
          if (this._selectedQuestions[i].id === action.data)
            break;
        }
        this._selectedQuestions.splice(i, 1);
        QuestionEvent.emit('SELECTION_CHANGE');
        break;

      default:
        break;
    };
  },

  getQuestions: function () {
    return this._records;
  },

  getQuestionIds: function () {
    return this._records.map((question) => question.id);
  },

  getSelectedQuestions: function () {
    return this._selectedQuestions;
  },

  getSelectedQuestionIds: function () {
    return this._selectedQuestions.map((question) => question.id);
  },

  isSelected: function (id) {
    return this.getSelectedQuestionIds().indexOf(id) === -1 ? false : true;
  },

  initSearchConditions: function (condition) {
    this._searchConditions = condition;
  },

  getSearchConditions: function () {
    return this._searchConditions;
  }
};

QuestionDispatcher.register(QuestionStore._registerToActions.bind(QuestionStore));

export default QuestionStore;