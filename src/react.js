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

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children
  }
}


// 함수형 컴포넌트
// children 은 배열
export function createElement(tag, props, ...children) {
  props = props || {}

  // typeof 연산자는 함수와 Class 모두 'function'으로 처리를 한다
  if(typeof tag === 'function') {
    // 실제 React 는 고유의 Symbol을 Class 에 만들어서 있는지 없는지를 체크
    if(tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } 
    else {
      // React 의 디자인 방식은 children 도 props 의 일부분으로 들어가게 하는 것
      if(children.length > 0) {
        return tag(makeProps(props, children))
      } else {
        // 함수를 호출하면 JSX 문법이 return 되고 그 JSX 는 createElement 함수를 호출하게 될 것
        return tag(props);
      }
    }
  } else {
    return { tag, props, children }
  }
}

// 클래스형 컴포넌트
export class Component {
  // Instance 를 만들 때, 생성자가 props 를 받는다. Constructor 는 함수형 컴포넌트의 함수 역할
  constructor(props) {
    this.props = props; 
  }
}

export function render(vdom, container) {
  container.appendChild(createDom(vdom));
}


