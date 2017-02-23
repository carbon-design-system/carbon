(() => {
  const contextHtml = `<style id="offleft-style" type="text/css">
    .offleft {
      position: absolute;
      top: 0;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
  </style>
  <link id="library-style" rel="stylesheet" onload="this.loaded = true" href="/base/dist/bluemix-components.css">
  <div role="main">
    <a class="offleft" href="#maincontent">Skip to main content</a>
    <a name="maincontent"></a>
    <div id="html-fragment-container"></div>
    <form>
      <fieldset data-invalid class="bx--form__fieldset">
        <legend class="bx--form__legend">Dummy legend for g497</legend>
        <div id="form-html-fragment-container"></div>
      </fieldset>
      <button class="bx--btn" type="submit">Submit</button><!-- Dummy submit button for g324 -->
    </form>
  </div>`;

  document.title = 'Karma runner context';
  document.documentElement.setAttribute('lang', 'en');
  document.body.insertAdjacentHTML('afterBegin', contextHtml);
})();
