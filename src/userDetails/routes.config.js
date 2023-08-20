const rootPath="../../";
  const UserDetailsController = require('./userDetails.controller');
  const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
  const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
  const config = require('../../common/config/env.config');
  const FormValidation = require('../../lib/validation');
  const ADMIN = config.permissionLevels.ADMIN;
  const USER = config.permissionLevels.APP_USER;
  const FREE = config.permissionLevels.NORMAL_USER;
  const formValidationRules=[
    {ctrl:'address',format:'text',required:true,max:300,min:2},
{ctrl:'icpassport',format:'username',required:true,max:25,min:2}
  ];
  exports.routesConfig = function (app) {
      app.post('/userdetails', [
        ValidationMiddleware.validJWTNeeded,
        FormValidation.formValidation(formValidationRules),
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UserDetailsController.insert
      ]);
      
      
    app.post('/userdetails/upload/:columnName/:rowId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.userdetailsInsertPermission(),  // 
        //PermissionMiddleware.juserdetailsInsertLimit(),     // 
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UserDetailsController.uploadfile
    ]);
        
      app.get('/userdetails', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          UserDetailsController.list
      ]);
      app.get('/userdetails/all', [   //  Required to Fill UI Component like Dropdown ,List , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UserDetailsController.listAll
    ]);
    app.get('/userdetails/suggestions', [   //  Required to Fill UI Component like Auto Complete , can be disabled if not required
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UserDetailsController.listSuggestions
    ]);
      app.get('/userdetails/:userdetailsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          UserDetailsController.getById
      ]);
      app.patch('/userdetails/:userdetailsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(USER),
          FormValidation.formValidation(formValidationRules,'UPDATE'),
          UserDetailsController.patchById
      ]);
      app.delete('/userdetails/:userdetailsId', [
          ValidationMiddleware.validJWTNeeded,
          PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
          UserDetailsController.removeById
      ]);
  };
  
    