var React = require('react/addons');
var EditUser = require('./EditUser.react');
var AuthActions = require('../actions/AuthActions');
var MessageDispatcher = require('../dispatcher/AppDispatcher').MessageDispatcher;

var UpdateUser = React.createClass({
  update: function () {
    var userData = arguments[0];
    if (userData.password !== userData.confirmPassword) {
      MessageDispatcher.dispatch({
        actionType: 'REFRESH_MESSAGE',
        content: ['Are you sure you confirmed the password?']
      });
    } else {
      AuthActions.update({
        id   : AuthStore.getId(),
        data : userData
      });
    }
  },

  render: function () {
    return <EditUser btnLabel='Update' action={this.update}/>;
  }
});

module.exports = UpdateUser;