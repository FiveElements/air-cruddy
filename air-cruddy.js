import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@bower_components/air-cascade-validator/air-cascade-validator.js';
import './air-cruddy-mixin.js';
import './air-cruddy-adapter-elasticsearch-mixin.js';


const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="air-cruddy">
    <template strip-whitespace="">
        <style>
            :host {
                display: block;
            }
        </style>
        <!--<button on-tap="retrieve">Retrieve</button>-->
        <!--<button on-tap="retrieveById">Retrieve 404</button>-->
        <!--<button on-tap="newEntity">New</button>-->

        <!--<button on-tap="validate">Validate</button>-->
        <!--<button on-tap="save">Save</button>-->
        <!--<button on-tap="delete">Delete</button>-->

        <!--<h2 on-tap="retrieve">Hello [[url]]</h2>-->
        <air-cascade-validator id="validator" invalid-nodes="{{invalidNodes}}" auto-focus="[[autoFocus]]">
            <slot id="crudContent"></slot>
        </air-cascade-validator>
    </template>

    
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
 * `air-cruddy` manage all crud server request (Create / Retrieve / Update / Delete) with a backend server.
 *
 * @customElement
 * @group Air Elements
 *
 * @demo demo/index.html
 */
class AirCruddy extends  FiveElements.AirCruddyMixin(PolymerElement)  {
    static get is() {
        return 'air-cruddy';
    }

    static get properties() {
        return {
            invalidNodes: {
                type: Array,
                readonly: true,
                notify: true
            },
            /**
             * Auto focus on invalid Nodes
             */
            autoFocus: {
                type: Boolean,
                value: true
            }
        };
    }

}

window.customElements.define(AirCruddy.is, AirCruddy);
