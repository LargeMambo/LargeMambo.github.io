(function () {
  function alignPostInfo() {
    const layout = document.querySelector('#content-inner > .layout, .layout');
    if (!layout) return;
    const rect = layout.getBoundingClientRect();
    const style = window.getComputedStyle(layout);
    const pl = parseFloat(style.paddingLeft) || 15;
    const pr = parseFloat(style.paddingRight) || 15;
    const vw = document.documentElement.clientWidth;
    const left = rect.left + pl;
    const right = vw - rect.right + pr;
    document.documentElement.style.setProperty('--post-info-left', left + 'px');
    document.documentElement.style.setProperty('--post-info-right', right + 'px');
  }

  window.addEventListener('load', alignPostInfo);
  window.addEventListener('resize', alignPostInfo);
  document.addEventListener('pjax:complete', alignPostInfo);
})();
