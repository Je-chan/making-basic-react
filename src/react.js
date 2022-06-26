// DOM API 를 조작하는 것은 대부분 여기에서 컨트롤
// 바깥 쪽(app.js)에서 내부 구조에 관심을 두지 않도록 만드는 것

export function createDom(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);
  
  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value))

  node.children
    .map(createDom)
    .forEach(element.appendChild.bind(element));

  return element;
}

export function createElement(tag, props, ...children) {
  return { tag, props, children }
}

export function render(vdom, container) {
  container.appendChild(createDom(vdom));
}
