let data = require('./GlobalInputData/ProjectData'),
user_login_data = require('./TestCaseInputData/UserLoginData') , user_data = require('./TestCaseInputData/UserProfileData') , admin_login_data = require('./TestCaseInputData/AdminLoginData');


Feature('Verify Negative Condtion With Maximum Price');

Before((I)=>{
  I.amOnPage('/');
});

xScenario('Verify Negative Condtion With Above Maximum Price', function* (I, userLoginPage) {
      // Login in Application
      I.click('#loginicon');
      I.waitForElement({xpath: "//*[contains(text(), 'Login')]"},10);
      I.click('#enhancedLoginLink');
      I.waitForElement({xpath: "//*[contains(text(), 'Username')]"},10);
      userLoginPage.login();

      // Open Investment Page
      I.click({xpath: "//div[@id='dnngo_megamenu']/div/ul/li/a"});

      // Store Project Name At Run Time
      let Projectname = yield I.grabTextFrom({xpath: "(//div[@class='col-md-4 col-sm-6 col-xs-12']/div/a/div/h3)[1]"});
      console.log("Value printed for the data=", Projectname);
      data.property_name = Projectname;

      let Projectmaxamount = yield I.grabTextFrom({xpath: "(//div[@class='col-md-4 col-sm-6 col-xs-12']/div/div[2]/ul/li[1]/span)[1]"});

      Projectmaxamount = Number(Projectmaxamount.replace(/[^0-9\.]+/g,""));
      console.log("Minium Project Amount ",Projectmaxamount);


      // Open Project Deatil page
      I.click({xpath: "//div[@class='col-md-4 col-sm-6 col-xs-12']/div/a"});
      // Open Investment Page

      I.click('#btnInvestNow');

      // Fill Investment Details In Step One

      const maxAmount = Projectmaxamount+5000;
      console.log(maxAmount);
      I.fillField('#amountToInvest', maxAmount.toString());
      I.wait(4);
      I.fillField('#dnn_ctr1993_InVStep1_SSN','1111111111');
      I.wait(4);
      I.fillField('#dnn_ctr1993_InVStep1_DOB', '112281986');
      I.wait(2);
      I.click('#btnNext1');
      I.wait(5);
      // Verify Error for Validation message
      let errormessage = yield I.grabTextFrom({xpath: "//div[@id='dnnSkinMessage']/span"});
      console.log("Error message showign because amount is greater then ", errormessage);
      I.wait(5);
      // Now clear filed with above max amount and enter new amount
      I.clearField('#amountToInvest');
      const projectamount = Projectmaxamount-200000;
      I.fillField('#amountToInvest', projectamount.toString());
      I.wait(4);
      I.click('#dnn_ctr1993_InVStep1_DOB');
      I.click({xpath: "//div[@class='form-group']/input[@id='btnNext1']"});
      I.wait(10);
      //Second Investment Form
      I.checkOption("//div[@class='checkbox']/label");
      let signaturename = yield I.grabTextFrom({xpath: "//div[@class='wizard-inner']/div[5]/div/div/label/span"});
      I.wait(3);
      I.fillField('#txtSignature', signaturename);
      I.wait(3);
      I.click('#btnNext2');

      // Complete Investment Deatils with Third steps
      I.checkOption("//div[@id='dvAccreditted1']/div[1]/label");
      I.click('#btnNext3');
      I.checkOption("(//div[@class='checkbox']/label)[1]");
      I.fillField('#txtaccountant_contact_info', "121212121")
      I.click('#btnNext3b')

      // Select CHECK Payment Method From Step 4

      I.waitForElement({xpath: "//*[contains(text(), 'Check')]"},10);

      //Need to write code for Check Process



});



xScenario('Delete User Investment Record From Admin', (I, adminLoginPage) =>  {
     // Login in Application With Admin Detail
     I.click('#loginicon');
     I.waitForElement({xpath: "//*[contains(text(), 'Login')]"},10);
     I.click('#enhancedLoginLink');
     I.waitForElement({xpath: "//*[contains(text(), 'Username')]"},10);
     adminLoginPage.adminLogin();

     // Open Site Admin Screen
     I.wait(5);
     I.click({xpath: "//*[contains(text(),'Site Admin')]"});
     I.wait(5);
     // Open Promoter Dashboard Screen
     I.click({xpath: "//*[@class='sidebar-menu']/li[2]/a"});

     // Match Project Name As Per Dynamic Data Coming From Test Case 1
     I.click({xpath: "//h3[contains(text(), '"+ data.property_name +"')]/parent::div/parent::div/div[3]/div/button"});
     I.wait(3);
     // Open Investment Detail For Seelected Project Name
     I.click({xpath: "//h3[contains(text(), '"+ data.property_name +"')]/parent::div/parent::div/div[3]/div/ul/li[1]/input"});
     I.wait(4);
     //  Delete User Investment Record From Investment List
     I.click({ xpath: "//td[contains(text(), '" + user_data.firstname + " " + user_data.lastname+"')]/parent::tr/td[last()]/a" });
     //I.click({xpath: "//*[@id='grdProjectInvestmentDetail']/tbody/tr/td[contains(text(), '" + data.project_entity_name +"')]/parent::tr/td/a"});
     I.wait(4);
     // Wait For Delete Confirmation Box And After CLick On Yes button
     I.click({xpath: "//div[@class='ui-dialog ui-widget ui-widget-content ui-corner-all ui-front dnnFormPopup dnnClear ui-dialog-buttons']//div[3]/div/button[contains(text(), 'Yes')]"});
     I.wait(4);
});
