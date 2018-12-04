import hljs from 'highlight.js/lib/highlight';

import armasm from 'highlight.js/lib/languages/armasm';
import cpp from 'highlight.js/lib/languages/cpp';
import javascript from 'highlight.js/lib/languages/javascript';
import ruby from 'highlight.js/lib/languages/ruby';

hljs.registerLanguage('armasm', armasm);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('ruby', ruby);

const tableOfContents = (options) => {
  if (!options.element) {
    return;
  }

  const container = options.container ? document.querySelector(options.container) : document.body;
  const selectors = options.selectors ? options.selectors.split(',').map(s => s.trim()) : ['h2', 'h3'];
  const tocItems = [];

  // Building dict
  let i = 1;
  selectors.forEach((selector) => {
    const items = container.querySelectorAll(selector);
    items.forEach((item) => {
      const index = item.id || `toc-${i++}`;
      const text = item.textContent.trim();
      const className = selector.replace(/((:+[\w-\d]*)|[^A-z0-9-\s])/g, ' ').replace(/\s{2,}/g, ' ').trim();

      // Set it if none
      if (item.id !== index) {
        item.id = index;
      }

      tocItems.push({ index, text, className });
    });
  });

  // Building markup
  if (tocItems.length > 0) {
    let html = '<ul>';
    tocItems.forEach((item, j) => {
      html += `\n<li class="toc-li-${j} toc-${item.className}"><a href="${window.location.pathname}#${item.index}">${item.text}</a></li>`;
    });
    html += '</ul>';
    document.querySelector(options.element).innerHTML = html;
  } else {
    document.querySelector(options.element).style.display = 'none';
  }

  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView();
      }, 500);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  hljs.initHighlightingOnLoad();
  tableOfContents({
    element: '.toc',
    container: 'article',
    selectors: 'h1,h2,h3',
  });

  // reCaptcha
  if (typeof grecaptcha !== 'undefined') {
    grecaptcha.ready(() => {
      grecaptcha.execute('6LfEtXwUAAAAADBhLYyu3-jdG4fTkrqllf-jswLK', { action: 'edit' }).then((token) => {
        const captcha = document.querySelector('input#g-recaptcha-response');
        if (captcha) {
          captcha.value = token;
        }
      });
    });
  }
});
