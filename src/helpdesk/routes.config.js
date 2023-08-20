const rootPath="../../";
  const HelpdeskController = require('./helpdesk.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'subject',format:'text',required:true,max:250,min:2},
{ctrl:'details',format:'',required:true,max:600,min:0}
  ];
  exports.routesConfig = function (app) {
      app.post('/helpdesk', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdeskController.insert
      ]);
      
      
    app.post('/helpdesk/upload/:columnName/:rowId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.helpdeskInsertPermission(),  // 
        //PermissionMiddleware.jhelpdeskInsertLimit(),     // 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdeskController.uploadfile
    ]);
        
      app.get('/helpdesk', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          HelpdeskController.list
      ]);
      app.get('/helpdesk/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdeskController.listAll
    ]);
    app.get('/helpdesk/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdeskController.listSuggestions
    ]);
      app.get('/helpdesk/:helpdeskId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          HelpdeskController.getById
      ]);
      app.patch('/helpdesk/:helpdeskId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          HelpdeskController.patchById
      ]);
      app.delete('/helpdesk/:helpdeskId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          HelpdeskController.removeById
      ]);
  };
  
    