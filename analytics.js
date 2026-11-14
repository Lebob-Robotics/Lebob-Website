/* analytics.js — Google Analytics 4 (gtag.js) for every page.
 *
 * SET-UP: put the GA4 web stream Measurement ID (Admin > Data streams >
 * Web > Measurement ID, format G-XXXXXXXXXX) in MEASUREMENT_ID below. While
 * it holds the placeholder, this file does nothing and loads nothing.
 *
 * SCOPE: tracking runs only on the production host, so local previews and
 * the *.github.io mirror do not pollute the reports. Outbound clicks, file
 * downloads (the PDFs under /files/) and scroll depth come from GA4
 * Enhanced Measurement, which is on by default for a web stream.
 */
(function () {
  var MEASUREMENT_ID = 'G-XXXXXXXXXX';
  var HOSTS = ['lebob.com.au', 'www.lebob.com.au'];

  if (!/^G-[A-Z0-9]+$/.test(MEASUREMENT_ID) || MEASUREMENT_ID === 'G-XXXXXXXXXX') return;
  if (HOSTS.indexOf(window.location.hostname) === -1) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(s);
})();
