
'use strict';

let I, user_login_data = require('../TestCaseInputData/UserLoginData');

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  fields : {
    username :{
      xpath : '//*[contains(@id, "dnn1224Username")]'
    },
    password :{
      xpath : '//*[contains(@id, "dnn1224Password")]'
    }
  },

  loginBtn : {
    xpath : '//button[contains(@id,"dnn1224Login")]'
  },


  login() {
    I.fillField(this.fields.username, user_login_data.username);
    I.fillField(this.fields.password, user_login_data.password);
    I.click(this.loginBtn);
  }


}
