browser.action.onClicked.addListener(async (tab) => {
  try {
    browser.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      files: [
        'desbloquearCampos.js',
        'cargarNotasPortapapeles.js']
    });
  } catch (err) {
    console.error(`failed to execute script: ${err}`);
  }
  try {
    await browser.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      css: 'input[id^="CRITERIO"]:invalid { border: 2px solid red;}'
     });
  } catch (err) {
    console.error(`failed to insert CSS: ${err}`);
  }

});
