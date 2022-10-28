class Modal extends HTMLElement {

    constructor() {
      super();
      // defaults
      this.isOpen = false
      this.text = 'oi';
      this['button-text'] = this.getAttribute("button-text")
      this['modal-text'] = this.getAttribute("modal-text")
      
      // attach shadow DOM
      this.shadow = this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
      return ["modal-text", "button-text"]
    }

    get open() {
      return this.isOpen
    }

    set open(value) {
      this.isOpen = value
    }

    connectedCallback() {
      this.render()
    }

    attributeChangedCallback() {
      this.render()
    }

    render() {
      let modalHTMLString = `<div class="modal-bg">
      <div class="modal-wrapper">
        <h3 class="prompt-text">${this["modal-text"]}</h3>
        <div class="button-wrapper">
            <button onclick="console.log(this.isOpen)" class="confirm">Yes</button>
            <button onclick="open(false)" class="cancel">No</button>
        </div>
      </div>
    </div>`

    let styles = `
    <style>
        body {
            margin: 0;
        }
        .content-wrapper {
            width: 100vw;
            height: 90vh;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        .button {
            padding: 5px 10px !important;
        }

        .modal-bg {
            height: 100vh;
            width: 100vw;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .modal-wrapper {
            background-color: white;
            padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
        }
        .button-wrapper {
            width: 100%;
            background-color: red;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }
    </style>
    `   
    
    this.shadow.innerHTML = `
        <div class="content-wrapper">
          <button onclick="open(true)" class="button">${this["button-text"]}</button>
          ${this.isOpen ? modalHTMLString : ''}
        </div>
        ${styles}
    `
    }
  
  }
  // register component
customElements.define('test-modal', Modal );
