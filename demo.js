(function () {
  // Custom log(), dir(), group(), and groupEnd() functions, so we don't have to prepend with console
  //
  function log(m, s) {
    m = m !== undefined ? m : " ";
    if (s) {
      console.log(m, s);
    } else {
      console.log(m);
    }
  }

  function dir(m) {
    console.dir(m);
  }

  function group(m) {
    if (m) {
      console.group(m);
    } else {
      console.group();
    }
  }

  function groupCollapsed(m) {
    if (m) {
      console.groupCollapsed(m);
    } else {
      console.groupCollapsed();
    }
  }

  function groupEnd() {
    console.groupEnd();
  }

  function getRoles(elements) {
    for (let element of elements) {
      group(`${element.tagName.toLowerCase()} role info`);

      const implicitRole = getImplicitRole(element);
      const explicitRole = getExplicitRole(element);
      const ariaRole = getAriaRole(element);
      if (element) {
        log(`${element.id} (implicit): ${implicitRole}`);
        log(`${element.id} (explicit): ${explicitRole}`);
        log(`${element.id} (computed aria): ${ariaRole}`);
        // Check for Chrome's flagged computedRole property
        if (element.computedRole !== undefined) {
          log(`${element.id} (Chrome computed): ${element.computedRole}`);
        }
        //dir(element);
      }
      dir(element);
      groupEnd();
    }
  }

  function getUsableElement(element) {
    element =
      element.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? element.getRootNode().host : element;
    return element;
  }

  function getAllElements(root) {
    function getElements(root) {
      const nodes = root.querySelectorAll("*");

      for (const node of nodes) {
        const element = getUsableElement(node);

        if (element.nodeType === Node.ELEMENT_NODE) {
          allElements.push(element);
        }

        // If node has shadowRoot, re-call this function to get its child nodes.
        if (node.shadowRoot) {
          getElements(node.shadowRoot);
        }
      }
    }

    let allElements = [];
    if (root) {
      getElements(root);
    }
    return allElements;
  }

  function init() {
    console.clear();
    group("rha11y-get-role results");
    const elements = getAllElements(document.body);
    getRoles(elements);
    groupEnd();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
