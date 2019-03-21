(() => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
  #parentSweetToast {
    position: absolute;
    position: fixed;
    width: calc(100% - 60px);
    max-width: 400px;
    z-index: 100;
  }
  
  #baseToast {
    min-height: 45px;
    margin: 18px;
    background:rgba(255, 255, 255, 1);
    border-left-style: solid;
    border-left-width: 5px;
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
    padding: 10px 15px 0px;
  }
  
  .sweetToast-topRigth {
    top: 10px;
    right: 0;
    animation: showUp 1s ease-in;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .sweetToast-center {
    top: 10px;
    left: 600px;
    animation: showUp 1s ease-in;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .sweetToast-topLeft {
    top: 10px;
    left: 0;
    animation: showUp 1s ease-in;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .sweetToast-bottomRight {
    bottom: 10px;
    right: 0;
    animation: showDown 1s ease-in;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .sweetToast-bottomLeft {
    bottom: 10px;
    left: 0;
    animation: showDown 1s ease-in;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .sweetToast-outTop {
    animation: hideTop 1s ease-out;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .sweetToast-outBottom {
    animation: hideDown 1s ease-out;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  @keyframes hideTop {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  
  @keyframes hideDown {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
  
  @keyframes showUp {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  @keyframes showDown {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
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
  
  .messageToastSimple {
    margin: 0;
    text-align: center
  }
  `;
  document.getElementsByTagName("head")[0].appendChild(style);
})();

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
    if (this.sweetToastMessage === undefined) {
      console.error(`You need to set a message to display the ${this.sweetToastType}`);
    }
    this.createStartElements();
    this.openSweetToast();
    console.log('Sweet Toast: ', this);
  }

  // Getters

  get sweetToastContainer() {
    return this._toastContainer;
  }

  get sweetToastElement() {
    return this._toastElement;
  }

  get sweetToastMessageElement() {
    return this._messageElement;
  }

  get sweetToastMessage() {
    return this.sweetToastOptions.message;
  }

  get sweetToastPosition() {
    return this.sweetToastOptions.position
  }

  get sweetToastOptions() {
    return this._toastOptions;
  }

  get sweetToastTimeToOut() {
    return this.sweetToastOptions.time;
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

  set sweetToastMessageElement(pNewSweetToastMessageElement) {
    this._messageElement = pNewSweetToastMessageElement;
  }

  set sweetToastOptions(pNewSweetToastOptions) {
    this._toastOptions = pNewSweetToastOptions;
  }

  // Methods

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
    this.sweetToastMessageElement = this.createElement({
      element: `p`,
      id: `messageToastBase`,
      class: `messageToastSimple`
    });
    this.sweetToastElement.appendChild(this.sweetToastMessageElement);
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

  openSweetToast() {
    this.sweetToastContainer.setAttribute('aria-hidden', false);
    this.sweetToastContainer.classList.add(`sweetToast-${this.sweetToastPosition}`);
    this.sweetToastElement.classList.add(`sweetToast-${this.sweetToastType}`);
    this.setFontize();
    this.sweetToastMessageElement.innerHTML = this.sweetToastMessage;

    setTimeout(() => {
      this.closeAndDestroySweetToast();
    }, this.sweetToastTimeToOut);
  }

  closeAndDestroySweetToast() {
    if (this.sweetToastPosition.includes(`bottom`)) {
      this.sweetToastContainer.classList.add(`sweetToast-outBottom`);
    } else {
      this.sweetToastContainer.classList.add(`sweetToast-outTop`);
    }
    setTimeout(() => {
      document.body.removeChild(this.sweetToastContainer);
    }, 1000);
  }

  setFontize() {
    this.sweetToastMessageElement.style.fontSize = `${parseFloat(this.sweetToastElement.offsetWidth / 16).toFixed(2)}px`;
    console.log('this.sweetToastMessageElement.style.fontSize: ', this.sweetToastMessageElement.style.fontSize);

    console.log('width: ', this.sweetToastMessageElement.style.fontSize);
  }
}