import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_allofus extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_allofus',
  autoStart: true,
  activate: (app: JupyterLab) => {
    /* TODO: Replace this with real stuff */
    console.log('Hello World');
  }
};

export default extension;
