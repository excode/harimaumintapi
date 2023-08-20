const rootPath="../../";
  const WithdrawController = require('./withdraw.controller');
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
{ctrl:'status',format:'',required:true},
{ctrl:'comment',format:'',required:true,max:300,min:0}
  ];
  exports.routesConfig = function (app) {
      app.post('/withdraw', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WithdrawController.insert
      ]);
      
      
      app.get('/withdraw', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          WithdrawController.list
      ]);
      app.get('/withdraw/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WithdrawController.listAll
    ]);
    app.get('/withdraw/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WithdrawController.listSuggestions
    ]);
      app.get('/withdraw/:withdrawId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          WithdrawController.getById
      ]);
      app.patch('/withdraw/:withdrawId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          WithdrawController.patchById
      ]);
      app.delete('/withdraw/:withdrawId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          WithdrawController.removeById
      ]);
  };
  
    