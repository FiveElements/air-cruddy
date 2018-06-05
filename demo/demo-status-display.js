import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class DemoStatusDisplay extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <div>
            <h3>Stauts</h3>
            <p>[[statusStr]]</p>
        </div>
`;
  }

  static get is() {
      return 'demo-status-display';
  }

  static get properties() {
      return {
          status: {
              type: Object
          },
          statusStr: {
              type: String,
              computed: '_computeStatusStr(status)'
          }
      };
  }

  _computeStatusStr(status) {
      return JSON.stringify(status, null, '  ');
  }
}

window.customElements.define(DemoStatusDisplay.is, DemoStatusDisplay);
