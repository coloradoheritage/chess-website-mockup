(function () {
  /* Inject drawer styles */
  var s = document.createElement('style');
  s.textContent =
    '#mobile-menu{position:fixed;inset:0;z-index:9999;display:flex;align-items:stretch}' +
    '#mobile-menu.hidden{display:none!important}' +
    '#mobile-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.45)}' +
    '#mobile-drawer{position:relative;margin-left:auto;width:17rem;max-width:88vw;' +
      'background:#fff;box-shadow:-6px 0 28px rgba(0,0,0,.2);display:flex;flex-direction:column;height:100%}' +
    '#mobile-drawer-head{display:flex;align-items:center;justify-content:space-between;' +
      'padding:.75rem 1rem;border-bottom:1px solid #f1f5f9;flex-shrink:0;background:#fff}' +
    '#mobile-drawer-body{overflow-y:auto;flex:1;padding:1rem}' +
    '#mobile-menu-close{background:none;border:none;cursor:pointer;color:#6b7280;padding:4px;' +
      'display:flex;align-items:center;justify-content:center;border-radius:4px}' +
    '#mobile-menu-close:hover{color:#1A365D;background:#f3f4f6}';
  document.head.appendChild(s);

  document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('mobile-menu');
    var btn  = document.getElementById('mobile-menu-btn');
    if (!menu || !btn) return;

    /* Grab existing nav link HTML then clear the menu */
    var inner = menu.innerHTML;
    menu.innerHTML = '';
    menu.className = 'hidden'; /* reset — our CSS handles the rest */

    /* Build backdrop */
    var backdrop = document.createElement('div');
    backdrop.id = 'mobile-backdrop';

    /* Build drawer */
    var drawer = document.createElement('div');
    drawer.id = 'mobile-drawer';

    var head = document.createElement('div');
    head.id = 'mobile-drawer-head';
    head.innerHTML =
      '<span style="font-family:Merriweather,serif;font-weight:700;color:#1A365D;font-size:.95rem">Menu</span>' +
      '<button id="mobile-menu-close" aria-label="Close menu">' +
      '<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">' +
      '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>';

    var body = document.createElement('div');
    body.id = 'mobile-drawer-body';
    body.innerHTML = inner;

    drawer.appendChild(head);
    drawer.appendChild(body);
    menu.appendChild(backdrop);
    menu.appendChild(drawer);

    /* Move out of sticky header so it can cover the full viewport */
    document.body.appendChild(menu);

    /* Open / close helpers */
    function open() {
      menu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.add('hidden');
      document.body.style.overflow = '';
    }

    /* Re-wire hamburger button (clone drops old listeners) */
    var newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', open);

    document.getElementById('mobile-menu-close').addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  });
})();
