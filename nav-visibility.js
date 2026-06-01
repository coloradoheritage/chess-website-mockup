/* Hides navigation and footer links to pages the office has switched off
   in the CMS (data/page-visibility.json). The page file itself still
   exists, but with no links pointing to it, it is effectively hidden.
   Fails silently (everything stays visible) if the file is missing. */
(function () {
  fetch('data/page-visibility.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var hidden = (data.pages || [])
        .filter(function (p) { return p.visible === false; })
        .map(function (p) { return p.page; });
      if (!hidden.length) return;
      document.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        var file = href.split('#')[0].split('?')[0].split('/').pop();
        if (hidden.indexOf(file) !== -1) {
          var li = a.closest('li');
          (li || a).style.display = 'none';
        }
      });
    })
    .catch(function () {});
})();
