
'use strict';

let I, adminlogin_data = require('../TestCaseInputData/AdminLoginData');

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


  adminLogin() {
    I.fillField(this.fields.username, adminlogin_data.username);
    I.fillField(this.fields.password, adminlogin_data.password);
    I.click(this.loginBtn);
  }
}
