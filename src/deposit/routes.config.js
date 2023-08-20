const rootPath="../../";
  const DepositController = require('./deposit.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'wallettype',format:'',required:true},
{ctrl:'wallet',format:'',required:true},
{ctrl:'amount',format:'number',required:true},
{ctrl:'method',format:'text',required:true},
{ctrl:'comments',format:'',required:true,max:300,min:0},
{ctrl:'status',format:'',required:true}
  ];
  exports.routesConfig = function (app) {
      app.post('/deposit', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        DepositController.insert
      ]);
      
      
    app.post('/deposit/upload/:columnName/:rowId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.depositInsertPermission(),  // 
        //PermissionMiddleware.jdepositInsertLimit(),     // 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        DepositController.uploadfile
    ]);
        
      app.get('/deposit', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          DepositController.list
      ]);
      app.get('/deposit/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        DepositController.listAll
    ]);
    app.get('/deposit/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        DepositController.listSuggestions
    ]);
      app.get('/deposit/:depositId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          DepositController.getById
      ]);
      app.patch('/deposit/:depositId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          DepositController.patchById
      ]);
      app.delete('/deposit/:depositId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          DepositController.removeById
      ]);
  };
  
    