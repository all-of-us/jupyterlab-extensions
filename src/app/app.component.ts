/*
 *  Adapted from original source:
 *  <https://github.com/SimonBiggs/scriptedforms/blob/master/scriptedforms/src/app/app.component.ts>
 *
 *  See guide at:
 *  <https://github.com/SimonBiggs/scriptedforms/blob/master/scriptedforms/
 *   docs/create-your-own-angular-jupyterlab-extension.md>
 *
 *  Copyright 2017 Simon Biggs
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


import {Component} from '@angular/core';

// JupyterLab doesn't have custom webpack loaders. Need to be able to
// inline the loaders so that they get picked up without having access to the
// webpack.config.js file
// See https://github.com/jupyterlab/jupyterlab/pull/4334#issuecomment-383104318
import * as htmlTemplate from 'html-loader!./app.component.html';
import './app.component.css';

// This is currently needed to silence the angular-language-service not finding
// a template for this component.
// See https://github.com/angular/angular/issues/23478
const linterWorkaroundHtmlTemplate = '' + htmlTemplate;

@Component({
  selector: 'app-root',
  template: linterWorkaroundHtmlTemplate
})
export class AppComponent {
}

