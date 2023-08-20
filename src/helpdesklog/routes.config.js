const rootPath="../../";
  const HelpdesklogController = require('./helpdesklog.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'subject',format:'text',required:true,max:150,min:2}
  ];
  exports.routesConfig = function (app) {
      app.post('/helpdesklog', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdesklogController.insert
      ]);
      
      
    app.post('/helpdesklog/upload/:columnName/:rowId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.helpdesklogInsertPermission(),  // 
        //PermissionMiddleware.jhelpdesklogInsertLimit(),     // 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdesklogController.uploadfile
    ]);
        
      app.get('/helpdesklog', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          HelpdesklogController.list
      ]);
      app.get('/helpdesklog/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdesklogController.listAll
    ]);
    app.get('/helpdesklog/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        HelpdesklogController.listSuggestions
    ]);
      app.get('/helpdesklog/:helpdesklogId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          HelpdesklogController.getById
      ]);
      app.patch('/helpdesklog/:helpdesklogId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          HelpdesklogController.patchById
      ]);
      app.delete('/helpdesklog/:helpdesklogId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          HelpdesklogController.removeById
      ]);
  };
  
    