const rootPath="../../";
  const EwalletsController = require('./ewallets.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
{ctrl:'wallettype',format:'text',required:true},
{ctrl:'balance',format:'number',required:true},
{ctrl:'name',format:'text',required:true,max:25,min:2}
  ];
  exports.routesConfig = function (app) {
      app.post('/ewallets', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        EwalletsController.insert
      ]);
      
      
      app.get('/ewallets', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          EwalletsController.list
      ]);
      app.get('/ewallets/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        EwalletsController.listAll
    ]);
    app.get('/ewallets/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        EwalletsController.listSuggestions
    ]);
      app.get('/ewallets/:ewalletsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          EwalletsController.getById
      ]);
      app.patch('/ewallets/:ewalletsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          EwalletsController.patchById
      ]);
      app.delete('/ewallets/:ewalletsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          EwalletsController.removeById
      ]);
  };
  
    