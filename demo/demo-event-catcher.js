import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-toast/paper-toast.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class DemoEventCatcher extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }

            #toastError {
                --paper-toast-background-color: red;
                --paper-toast-color: white;
            }

            #toastResponse {
                --paper-toast-background-color: green;
                --paper-toast-color: white;
            }
        </style>
        <paper-toast id="toastResponse" class="capsule" text="[[lastResponse]]"></paper-toast>
        <paper-toast id="toastError" class="capsule" horizontal-align="right" text="[[lastError]]"></paper-toast>

        <slot></slot>
`;
  }

  static get is() {
      return 'demo-event-catcher';
  }

  static get properties() {
      return {
          lastError: {
              type: String,
              value: 'Error is Raised',
          },
          lastResponse: {
              type: String,
              value: 'Response is Receive',
          },
      };
  }


  ready() {
      super.ready();
      this.addEventListener('air-cruddy-retrieve', e => this._handleResponseRetrieve(e));
      this.addEventListener('air-cruddy-update', e => this._handleResponseUpdate(e));
      this.addEventListener('air-cruddy-create', e => this._handleResponseCreate(e));
      this.addEventListener('air-cruddy-delete', e => this._handleResponseDelete(e));
      this.addEventListener('air-cruddy-error', e => this._handleError(e));
  }



  _handleResponseRetrieve(e) {
      this._showToastResponse(e, 'Retrieve Success');
  }

  _handleResponseUpdate(e) {
      this._showToastResponse(e, 'Update Success');
  }

  _handleResponseCreate(e) {
      this._showToastResponse(e, 'Create Success');
  }

  _handleResponseDelete(e) {
      this._showToastResponse(e, 'Delete Success');
  }

  _showToastResponse(e, message) {
      let detail = e.detail;
      e.preventDefault();
//                console.log('Handle response : ', detail);
      this.$.toastResponse.show(message);
  }

  _handleError(e) {
      let detail = e.detail;
      console.error('Handle Error : ', detail);
      e.preventDefault();
//                this.lastError = detail.message  || 'Error is Raised';
//                this.$.toastError.open();
      this.$.toastError.show(detail.message);
  }
}

window.customElements.define(DemoEventCatcher.is, DemoEventCatcher);
