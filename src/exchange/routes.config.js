const rootPath="../../";
  const ExchangeController = require('./exchange.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'sourcewallet',format:'',required:true},
{ctrl:'wallet',format:'',required:true},
{ctrl:'amount',format:'number',required:true},
{ctrl:'comments',format:'',required:true,max:300,min:0},
{ctrl:'sourcewallettype',format:'',required:true},
{ctrl:'wallettype',format:'',required:true},
{ctrl:'status',format:'',required:true}
  ];
  exports.routesConfig = function (app) {
      app.post('/exchange', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ExchangeController.insert
      ]);
      
      
      app.get('/exchange', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          ExchangeController.list
      ]);
      app.get('/exchange/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ExchangeController.listAll
    ]);
    app.get('/exchange/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ExchangeController.listSuggestions
    ]);
      app.get('/exchange/:exchangeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          ExchangeController.getById
      ]);
      app.patch('/exchange/:exchangeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          ExchangeController.patchById
      ]);
      app.delete('/exchange/:exchangeId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          ExchangeController.removeById
      ]);
  };
  
    