const rootPath="../../";
  const TransferController = require('./transfer.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'amount',format:'number',required:true},
{ctrl:'wallettype',format:'',required:true},
{ctrl:'wallet',format:'',required:true},
{ctrl:'sourcewallet',format:'text',required:true},
{ctrl:'comments',format:'',required:false,max:300,min:0}
  ];
  exports.routesConfig = function (app) {
      app.post('/transfer', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        TransferController.insert
      ]);
      
      
      app.get('/transfer', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          TransferController.list
      ]);
      app.get('/transfer/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        TransferController.listAll
    ]);
    app.get('/transfer/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        TransferController.listSuggestions
    ]);
      app.get('/transfer/:transferId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          TransferController.getById
      ]);
      app.patch('/transfer/:transferId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          TransferController.patchById
      ]);
      app.delete('/transfer/:transferId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          TransferController.removeById
      ]);
  };
  
    