const rootPath="../../";
  const WalletTypeController = require('./walletType.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'name',format:'text',required:true,max:20,min:0},
{ctrl:'code',format:'text',required:true,max:5,min:0},
{ctrl:'decimalposition',format:'int',required:true,max:9,min:0},
{ctrl:'maxtransfer',format:'number',required:true}
  ];
  exports.routesConfig = function (app) {
      app.post('/wallettype', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WalletTypeController.insert
      ]);
      
      
      app.get('/wallettype', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          WalletTypeController.list
      ]);
      app.get('/wallettype/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WalletTypeController.listAll
    ]);
    app.get('/wallettype/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        WalletTypeController.listSuggestions
    ]);
      app.get('/wallettype/:wallettypeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          WalletTypeController.getById
      ]);
      app.patch('/wallettype/:wallettypeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          WalletTypeController.patchById
      ]);
      app.delete('/wallettype/:wallettypeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          WalletTypeController.removeById
      ]);
  };
  
    