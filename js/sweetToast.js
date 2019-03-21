/**
 * @file SweetToast.js
 * @author Kevin Aguilar
 * @class SweetToast
 * @description desc
 * @version 1.0.0
 */
class SweetToast {
  constructor(pToastData) {
    this._toastOptions = pToastData;
    if (this.sweetToastOptions.message === undefined) {
      console.error(`You need to set a message to display the ${this.sweetToastType}`);
    }
    this.createStartStyles();
    this.createStartElements();
    console.log('Sweet Toast: ', this);
  }

  // Getters

  get sweetToastBaseStyle() {
    return `
    #parentSweetToast {
      position: absolute;
      position: fixed;
      width: calc(100% - 3.750em);
      max-width: 2.500em;
      z-index: 100;
    }
    
    #baseToast {
      background:rgba(255, 255, 255, 1);
      border-left-style: solid;
      border-left-width: 0.313em;
      border-radius: 4px;
      box-shadow: 0em 0.125em 0.313em 0em rgba(0,0,0,0.2);
      padding: 0.625em 0.938em 0em;
    }
    
    .sweetToast-default {
      border-left-color: rgba(170, 170, 170, 1);
    }
    
    .sweetToast-success {
      border-left-color:rgba(46, 204, 64, 1);
    }
    
    .sweetToast-warning {
      border-left-color: rgba(255, 133, 27, 1);
    }
    
    .sweetToast-danger {
      border-left-color: rgba(255, 65, 54, 1);
    }
    `;
  }

  get sweetToastContainer() {
    return this._toastContainer;
  }

  get sweetToastElement() {
    return this._toastElement;
  }

  get sweetToastOptions() {
    return this._toastOptions;
  }

  get sweetToastType() {
    let type;
    if (this.sweetToastOptions.type === undefined) {
      type = `default`;
    } else {
      type = this.sweetToastOptions.type;
    }
    return type;
  }

  // Setters

  set sweetToastContainer(pNewSweetToastContainer) {
    this._toastContainer = pNewSweetToastContainer;
  }

  set sweetToastElement(pNewSweetToastElement) {
    this._toastElement = pNewSweetToastElement;
  }

  set sweetToastOptions(pNewSweetToastOptions) {
    this._toastOptions = pNewSweetToastOptions;
  }

  // Methods

  /**
   * @method SweetToast.createStartStyles
   * @description desc
   */
  createStartStyles() {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerHTML = this.sweetToastBaseStyle;
    document.getElementsByTagName("head")[0].appendChild(styleElement);
  }

  createStartElements() {
    this.sweetToastContainer = this.createElement({
      element: `div`,
      id: `parentSweetToast`,
      class: `sweetToastContainer`,
      ariaHidden: true,
      role: `alert`
    });
    this.sweetToastElement = this.createElement({
      element: `div`,
      id: `baseToast`,
      class: `sweetToastElement`
    });
    this.sweetToastContainer.appendChild(this.sweetToastElement);
    document.body.appendChild(this.sweetToastContainer);
  }

  createElement(pElementToCreate) {
    let element = document.createElement(pElementToCreate.element);
    if (pElementToCreate.id != undefined) {
      element.id = pElementToCreate.id;
    }
    if (pElementToCreate.class != undefined) {
      if (Array.isArray(pElementToCreate.class)) {
        for (let i = 0; i < pElementToCreate.class.length; i++) {
          element.classList.add(pElementToCreate.class[i]);
        }
      } else {
        element.classList.add(pElementToCreate.class);
      }
    }
    if (pElementToCreate.ariaHidden != undefined) {
      element.setAttribute(`aria-hidden`, pElementToCreate.ariaHidden);
    }
    if (pElementToCreate.role != undefined) {
      element.setAttribute(`role`, pElementToCreate.role);
    }
    if (pElementToCreate.value != undefined) {
      element.setAttribute(`value`, pElementToCreate.value);
    }
    return element
  };
}