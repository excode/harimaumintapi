const rootPath="../../";
  const BanksController = require('./banks.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'bankname',format:'text',required:true,max:50,min:2},
{ctrl:'swiftcode',format:'text',required:true,max:20,min:4},
{ctrl:'bankaddress',format:'text',required:true,max:300,min:10},
{ctrl:'city',format:'text',required:true,max:50,min:1},
{ctrl:'state',format:'text',required:true,max:20,min:2},
{ctrl:'postcode',format:'text',required:true,max:20,min:2},
{ctrl:'accountname',format:'text',required:true,max:100,min:2},
{ctrl:'accountnumber',format:'text',required:true,max:30,min:3},
{ctrl:'active',format:'boolean',required:false}
  ];
  exports.routesConfig = function (app) {
      app.post('/banks', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        BanksController.insert
      ]);
      
      
    app.post('/banks/upload/:columnName/:rowId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.banksInsertPermission(),  // 
        //PermissionMiddleware.jbanksInsertLimit(),     // 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        BanksController.uploadfile
    ]);
        
      app.get('/banks', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          BanksController.list
      ]);
      app.get('/banks/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        BanksController.listAll
    ]);
    app.get('/banks/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        BanksController.listSuggestions
    ]);
      app.get('/banks/:banksId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          BanksController.getById
      ]);
      app.patch('/banks/:banksId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          BanksController.patchById
      ]);
      app.delete('/banks/:banksId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          BanksController.removeById
      ]);
  };
  
    