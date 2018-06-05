import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';

class DemoControl extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <div>
            <div>Options</div>
            <paper-toggle-button checked="{{autoSave}}">Auto Save</paper-toggle-button>
            <paper-toggle-button checked="{{debug}}">Debug</paper-toggle-button>
        </div>
        <div class="control">
            <paper-icon-button icon=":create-new-folder" disabled\$="[[status.isDirty]]" action="newEntity" on-tap="_handleActionControl"></paper-icon-button>


            <paper-icon-button icon="check" disabled\$="[[!status.isDirty]]" action="save" on-tap="_handleActionControl"></paper-icon-button>

            <paper-icon-button icon="restore" disabled\$="[[!status.isDirty]]" action="reset" on-tap="_handleActionControl"></paper-icon-button>

            <paper-icon-button icon="delete" disabled\$="[[!_isCrudModeUpdate(status.mode)]]" action="delete" on-tap="_handleActionControl"></paper-icon-button>

        </div>
`;
  }

  static get is() {
      return 'demo-control';
  }

  static get properties() {
      return {
          status: {
              type: Object
          },
          autoSave: {
              type: Boolean,
              notify: true
          },
          debug: {
              type: Boolean,
              notify: true,
              value: true
          },
          command: {
              type: String,
              notify: true
          }
      };
  }

  _handleActionControl(e){
      const target = e.target;
      const action = target.getAttribute('action');
      if (action) {
          this.command = action;
      }
  }


  _isCrudModeUpdate(crudMode) {
      return (crudMode === 'update');
  }
}

window.customElements.define(DemoControl.is, DemoControl);
