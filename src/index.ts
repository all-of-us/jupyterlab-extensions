
import {Subject} from 'rxjs/Rx';

import {INotebookTracker} from '@jupyterlab/notebook';

import {ContentsManager} from '@jupyterlab/services';

import {ICommandPalette} from '@jupyterlab/apputils';

import {
  JupyterLab,
  JupyterLabPlugin
} from '@jupyterlab/application';

import 'zone.js';

import {AllOfUsConfig} from './config';
import {ConceptsWidget} from './widgets/concepts/concepts-widget';

import '../style/index.css';

// Activate the jupyterhub extension.
function activateExtension(app: JupyterLab,
                           notebooks: INotebookTracker,
                           palette: ICommandPalette): void {
    const configSubject = new Subject<AllOfUsConfig>();
    const configObservable = configSubject.asObservable();

    // Create a single widget
    const conceptsWidget = new ConceptsWidget(configObservable);

    // Add an application command
    const conceptsCommand = 'allOfUs:concepts';
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

    let initialLoad = true;
    let lastJson: string = null;
    notebooks.currentChanged.connect(() => {
      if (notebooks.currentWidget) {
        const path = notebooks.currentWidget.context.path;
        const slashIndex = path.lastIndexOf('/');
        let directory = '';
        if (slashIndex !== -1) {
          directory = path.substring(0, slashIndex + 1);
        }
        const contents = new ContentsManager();
        contents.get(directory + '.all_of_us_config.json').then(
              (model) => {
                if (lastJson !== model.content) {
                  configSubject.next(AllOfUsConfig.fromJson(model.content));
                  lastJson = model.content;
                }
              }
        );
      }
      if (initialLoad) {
        initialLoad = false;
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

