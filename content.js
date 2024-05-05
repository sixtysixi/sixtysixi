function getCSSPath(node) {
  if (node.id !== '') {
      return '#' + node.id;
  }
  if (node === document.body) {
      return node.tagName;
  }

  var path = [];
  while (node.nodeType === Node.ELEMENT_NODE) {
      var selector = node.nodeName.toLowerCase();
      if (node.id) {
          selector += '#' + node.id;
          path.unshift(selector);
          break;
      } else {
          var sib = node, nth = 1;
          while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() == selector)
                 nth++;
          }
          if (nth != 1)
              selector += ":nth-of-type("+nth+")";
      }
      path.unshift(selector);
      node = node.parentNode;
  }

  return path.join(" > ");
}

document.addEventListener('click', function(e) {
  e.preventDefault();
  var cssPath = getCSSPath(e.target);
  navigator.clipboard.writeText(cssPath);
});