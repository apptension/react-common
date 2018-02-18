const sourcePath = __dirname;

module.exports.registerGenerator = function (plop) {
  plop.setGenerator('user-auth', {
    description: 'Generate User Auth flow',
    actions: [{
      type: 'addMany',
      destination: 'app/modules',
      templateFiles: sourcePath + '/plopTemplates/modules/*',
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- IMPORT MODULE REDUCER -->)/g,
      template: 'import { reducer as startupReducer } from \'../startup/startup.redux\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- INJECT MODULE REDUCER -->)/g,
      template: 'startup: startupReducer,\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- IMPORT MODULE SAGA -->)/g,
      template: 'import { watchStartup } from \'../startup/startup.sagas\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- INJECT MODULE SAGA -->)/g,
      template: 'fork(watchStartup),\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- IMPORT MODULE REDUCER -->)/g,
      template: 'import { reducer as userAuthReducer } from \'../userAuth/userAuth.redux\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- INJECT MODULE REDUCER -->)/g,
      template: 'userAuth: userAuthReducer,\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- IMPORT MODULE SAGA -->)/g,
      template: 'import { watchUserAuth } from \'../userAuth/userAuth.sagas\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- INJECT MODULE SAGA -->)/g,
      template: 'fork(watchUserAuth),\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- IMPORT MODULE REDUCER -->)/g,
      template: 'import { reducer as userProfileReducer } from \'../userProfile/userProfile.redux\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/reducers.js',
      pattern: /(\/\/<-- INJECT MODULE REDUCER -->)/g,
      template: 'userProfile: userProfileReducer,\n    $1',
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- IMPORT MODULE SAGA -->)/g,
      template: 'import { watchUserProfile } from \'../userProfile/userProfile.sagas\';\n$1', //eslint-disable-line
    }, {
      type: 'modify',
      path: 'app/modules/sagas.js',
      pattern: /(\/\/<-- INJECT MODULE SAGA -->)/g,
      template: 'fork(watchUserProfile),\n    $1',
    }],
  });
};
