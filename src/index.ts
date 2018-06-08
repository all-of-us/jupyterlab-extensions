
import {
    INotebookTracker
} from '@jupyterlab/notebook';

import {
  ContentsManager
} from '@jupyterlab/services';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import {AllOfUsConfig} from './config';
import {ConceptsWidget} from './concepts-widget';

import '../style/index.css';

// Activate the jupyterhub extension.
function activateExtension(app: JupyterLab,
                           notebooks: INotebookTracker,
                           palette: ICommandPalette): void {
    const tracker = notebooks;
    let allOfUsConfig = new AllOfUsConfig();

    // Create a single widget
    let conceptsWidget: ConceptsWidget = new ConceptsWidget(allOfUsConfig);

    // Add an application command
    const conceptsCommand: string = 'allOfUs:concepts';
    app.commands.addCommand(conceptsCommand, {
      label: 'All of Us Concepts',
      execute: () => {
        if (!conceptsWidget.isAttached) {
          // Attach the widget to the main area if it's not there
          app.shell.addToMainArea(conceptsWidget, { mode: 'split-bottom' });
        }
        // Activate the widget
        app.shell.activateById(conceptsWidget.id);
      }
    });


    // Add the command to the palette.
    palette.addItem({command: conceptsCommand, category: 'All Of Us'});

    let initial_load = true;
    tracker.currentChanged.connect(() =>
    {
      if (tracker.currentWidget) {
        let path = tracker.currentWidget.context.path;
        let slashIndex = path.lastIndexOf('/');
        let directory = ''
        if (slashIndex != -1) {
          directory = path.substring(0, slashIndex + 1);
        }
        let contents = new ContentsManager();
        contents.get(directory + '.all_of_us_config.json').then(
              (model) => {
                allOfUsConfig.setJson(model.content);
              }
        );


      }
      if (initial_load) {
        initial_load = false;
        // As soon as the UI has finished loading, make the concepts widget appear.
        setTimeout(() => { app.commands.execute(conceptsCommand); }, 0);
      }
    });

    console.log('All Of Us JupyterLab extension is enabled.');
}


/**
 * Initialization data for the jupyterlab_allofus extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_allofus',
  autoStart: true,
  activate: activateExtension,
  requires: [INotebookTracker, ICommandPalette]
};

export default extension;

