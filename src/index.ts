
import {
    INotebookTracker
} from '@jupyterlab/notebook';

import {
  ContentsManager
} from '@jupyterlab/services';

import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';

// Activate the jupyterhub extension.
function activateExtension(app: JupyterLab, notebooks: INotebookTracker): void {
    const tracker = notebooks;
    tracker.currentChanged.connect(() =>
    {
      if (tracker.currentWidget) {
        let path = tracker.currentWidget.context.path;
        console.log('path = ' + path);
        let slashIndex = path.lastIndexOf('/');
        let directory = ''
        if (slashIndex != -1) {
          directory = path.substring(0, slashIndex + 1);
        }
        console.log('directory = ' + directory);
        let contents = new ContentsManager();
        contents.get(directory + '.all_of_us_config.json').then(
              (model) => {
                console.log('json: ', model.content);
              }
        );

      } else {
        console.log('No notebook selected.');
      }
    });
    console.log('Hello World 2!');
}


/**
 * Initialization data for the jupyterlab_allofus extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_allofus',
  autoStart: true,
  activate: activateExtension,
  requires: [INotebookTracker]
};

export default extension;

