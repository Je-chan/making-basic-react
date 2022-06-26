function createDom(node) {
  if(typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  node.children
    .map(createDom)
    .forEach(element.appendChild.bind(element));

  return element;
}

const vdom = {
  tag: 'p',
  props: {},
  children: [
    {
      tag: 'h1',
      props: {},
      children: ["Making React"]
    },
    {
      tag: 'ul',
      props: {},
      children: [
        {
          tag: 'li',
          props: {},
          children: ["React 만들어 보기 1"]
        },     
        {
          tag: 'li',
          props: {},
          children: ["React 만들어 보기 2"]
        },     
        {
          tag: 'li',
          props: {},
          children: ["React 만들어 보기 3"]
        }
      ]
    }
  ]
}

document
  .querySelector("#root")
  .appendChild(createDom(vdom))