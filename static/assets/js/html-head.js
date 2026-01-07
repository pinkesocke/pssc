class HTMLHead extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="robots" content="noindex">

    <meta name="description" content="The official home of the Pinke Socke Song Contest">
    <meta property="og:description"  content="The official home of the Pinke Socke Song Contest">
    <meta property="twitter:description" content="The official home of the Pinke Socke Song Contest">
    <meta property="og:site_name" content='Pinke Socke Song Contest'>
    <meta property="og:title" content="Welcome to the Pinke Socke Song Contest">
    <meta property="og:type" content="website">

    <link rel="icon" type="image/png" href="/static/images/favicon.png" sizes="96x96" />
    <link rel="shortcut icon" href="/favicon.ico">

    <link rel="stylesheet" href="/static/assets/css/styles.css" />
    <link rel="stylesheet" href="https://use.typekit.net/rkg3ipq.css">

        `;
    }
  }
  
  customElements.define('html-head', HTMLHead);
