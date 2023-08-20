const rootPath="../../";
  const AccountsController = require('./accounts.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'accounttype',format:'text',required:true},
{ctrl:'quantity',format:'number',required:true},
{ctrl:'unitprice',format:'number',required:true},
{ctrl:'total',format:'number',required:true},
{ctrl:'maturedate',format:'date',required:true},
{ctrl:'termscount',format:'int',required:true},
{ctrl:'monthcount',format:'int',required:true},
{ctrl:'status',format:'text',required:true},
{ctrl:'block',format:'boolean',required:true},
{ctrl:'owner',format:'email',required:true}
  ];
  exports.routesConfig = function (app) {
      app.post('/accounts', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        AccountsController.insert
      ]);
      
      
      app.get('/accounts', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          AccountsController.list
      ]);
      app.get('/accounts/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        AccountsController.listAll
    ]);
    app.get('/accounts/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        AccountsController.listSuggestions
    ]);
      app.get('/accounts/:accountsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          AccountsController.getById
      ]);
      app.patch('/accounts/:accountsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          AccountsController.patchById
      ]);
      app.delete('/accounts/:accountsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          AccountsController.removeById
      ]);
  };
  
    