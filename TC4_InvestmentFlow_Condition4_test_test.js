let data = require('./GlobalInputData/ProjectData'),
user_login_data = require('./TestCaseInputData/UserLoginData') , user_data = require('./TestCaseInputData/UserProfileData') , admin_login_data = require('./TestCaseInputData/AdminLoginData');

Feature('Positive Condition With Maxium Amount And Wire Payment Method');

Before((I)=>{
  I.amOnPage('/');
});

xScenario('Verify Fourth Conditon With Position Scenario ',function* (I, userLoginPage) {
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

      let Projectmaxamount = yield I.grabTextFrom({xpath: "//div[@class='col-md-4 col-sm-6 col-xs-12']/div/div[2]/ul/li[2]/span"});
      console.log("Projct max Amount for the data", Projectmaxamount);


      // Open Project Deatil page
      I.click({xpath: "//div[@class='col-md-4 col-sm-6 col-xs-12']/div/a"});
      // Open Investment Page

      I.click('#btnInvestNow');
      // Verify Forth Positive Condition With Entity

      I.click('#InvestTypebtn2');
      I.fillField('#jqEntityName','Testing');
      I.selectOption('#EntityType','Sole Proprietor');
      let Entityname = yield I.grabValueFrom({xpath: "//div[@class='step1']/div[4]/div/div/input[@id='ipFullEntityName']"});
      console.log("Projet Entity  Name ", Entityname);
      data.project_entity_name = Entityname;

      I.fillField('#dnn_ctr1993_InVStep1_TaxId','1111111111');
      I.fillField('#amountToInvest',Projectmaxamount);
      I.wait(4);
      I.fillField('#dnn_ctr1993_InVStep1_SSN','1111111111');
      I.wait(4);
      I.fillField('#dnn_ctr1993_InVStep1_DOB', '112281986');
      I.wait(2);
      I.click('#btnNext1');
      // Complete Investment Details With Second Step
      I.wait(10);
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

      // Select Payment Method From Step 4
      I.waitForElement({xpath: "//*[contains(text(), 'Wire')]"},10);
      I.checkOption("//div[@id='ctnWire']/label");
      I.wait(8);
      I.click('#btnclick');
      I.wait(3);
      I.click('#btnWireModalSubmit');
      I.click('dnn$ctr1993$Congratulations$btnNext');

      //Test Execution Complete


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
     I.click({ xpath: "//td[contains(text(), '" + data.project_entity_name +"')]/parent::tr/td[last()]/a" });
     //I.click({xpath: "//*[@id='grdProjectInvestmentDetail']/tbody/tr/td[contains(text(), '" + data.project_entity_name +"')]/parent::tr/td/a"});
     I.wait(4);
     // Wait For Delete Confirmation Box And After CLick On Yes button
     I.click({xpath: "//div[@class='ui-dialog ui-widget ui-widget-content ui-corner-all ui-front dnnFormPopup dnnClear ui-dialog-buttons']//div[3]/div/button[contains(text(), 'Yes')]"});
     I.wait(4);
});
