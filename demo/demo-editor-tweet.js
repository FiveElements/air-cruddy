import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-input-error.js';
//import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class DemoEditorTweet extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <h2>Edit Tweet [[data.id]]</h2>
        <paper-input value="{{data.user}}" required="" maxlength="20" label="User"></paper-input>
        <paper-input value="{{data.message}}" required="" maxlength="100" label="Message"></paper-input>
        <paper-input value="{{data.post_date}}" maxlength="20" label="Date"></paper-input>
`;
  }

  static get is() {
      return 'demo-editor-tweet';
  }

  static get properties() {
      return {
          data: {
              type: Object,
              notify: true
          }
      };
  }

  createEmptyEntityModel() {
      console.log('------------------------- createEmptyEntityModel --- Hello World !!!! -----------------------------');
      return {user: 'Five Elements'};
  }
}

window.customElements.define(DemoEditorTweet.is, DemoEditorTweet);
