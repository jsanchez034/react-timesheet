import App from '../../app/app';

var attachElement = document.getElementById('app');

var app;

// Create new app and attach to element
app = new App();

app.renderToDOM(attachElement);
