import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@bower_components/air-cascade-validator/air-cascade-validator.js';
import './air-cruddy-adapter-elasticsearch-mixin.js';
import './air-cruddy-mixin.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="air-cruddy-elasticsearch">
    <template strip-whitespace="">
        <style>
            :host {
                display: block;
            }
        </style>
        <air-cascade-validator id="validator" invalid-nodes="{{invalidNodes}}" auto-focus="[[autoFocus]]">
            <slot id="crudContent"></slot>
        </air-cascade-validator>
    </template>


    

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * `air-cruddy-elasticsearch` manage all crud server request (Create / Retrieve / Update / Delete) with an elasticsearch backend
 *
 *
 * @customElement
 * @group Air Elements
 *
 * @demo demo/index.html
 */
class AirCruddyElasticsearch extends FiveElements.AirCruddyAdapterElasticsearchMixin(FiveElements.AirCruddyMixin(PolymerElement)) {
    static get is() {
        return 'air-cruddy-elasticsearch';
    }

    static get properties() {
        return {
            invalidNodes: {
                type: Array,
                readonly: true,
                notify: true
            },
            autoFocus: {
              type: Boolean,
              value: true
            }
        };
    }

}

window.customElements.define(AirCruddyElasticsearch.is, AirCruddyElasticsearch);
