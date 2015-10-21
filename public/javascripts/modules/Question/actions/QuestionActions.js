import $ from 'jquery';
import { QuestionDispatcher } from '../../Common/dispatcher/AppDispatcher';
import QuestionStore from '../stores/QuestionStore';
import history from '../../../router/history';

const QuestionActions = {
  new: (args) => {
    $.ajax({
      type: 'POST',
      url: '/question/new',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      history.replaceState(null, '/home');
    });
  },

  get: (args) => {
    $.ajax({
      type: 'POST',
      url: '/question/get',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus, jqXHR) => {
      QuestionDispatcher.dispatch({
        actionType: 'GET_QUESTIONS',
        content: data
      });
    });
  },

  update: (args) => {
    $.ajax({
      type: 'PUT',
      url: '/question/update',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      history.goBack();
      QuestionDispatcher.dispatch({
        actionType: 'UPDATE_QUESTION'
      });
    })
  },

  destroy: (args) => {
    $.ajax({
      type: 'DELETE',
      url: '/question/destroy',
      data: JSON.stringify(args),
      contentType: 'application/json',
      dataType: 'JSON'
    }).done((data, textStatus,jqXHR) => {
      QuestionDispatcher.dispatch({
        actionType: 'DELETE_QUESTION'
      });
    })
  },

  selectQuestion: (id) => {
    QuestionDispatcher.dispatch({
      actionType: 'SELECT_QUESTION',
      data: id
    });
  },

  unselectQuestion: (id) => {
    QuestionDispatcher.dispatch({
      actionType: 'UNSELECT_QUESTION',
      data: id
    });
  }
};

export default QuestionActions;