/* eslint-disable */
'use strict';
import '../libs/es6-promise.auto.min';
import * as singleSpa from 'single-spa'; 
import { registerApp } from './Register';

async function bootstrap() {
  let projectConfig = await SystemJS.import('/project.config.js' )
  projectConfig.projects.forEach( project => {
    registerApp({
      name: project.name,
      main: project.main,
      url: project.prefix,
      store: project.store,
      base: project.base,
      path: project.path
    });
  });

  singleSpa.start();
}

bootstrap();
