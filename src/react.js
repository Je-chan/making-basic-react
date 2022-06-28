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
    // 애초에 이렇게 만들지도 않을 것.
    // 함수형 컴포넌트라면 호출할 때마다 새로운 스코프를 만들어 동일한 결과를 반환
    // 클래스형 컴포넌트라면 인스턴스에서 지속적으로 유지되는 State 를 만들 수 있음 
    // 그런데 아래의 코드는 instance 가 계속 만들어지니 함수형이랑 별반 다를바 없음
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

    // 얘가 Virtual DOM의 Input Data 역할. 이 객체의 특징은 Tree 구조라는 것
    // 단일 객체를 가지고 Real DOM을 만들고 있다 (createDOM 으로)
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

/**
 * 함수 컴포넌트 VS 클래스 컴포넌트
 * 
 * [클래스 컴포넌트]
 * 클래스 컴포넌트는 인스턴스를 만들고 컴포넌트가 삭제될 때까지 계속 유지하면서 render 함수를 호출
 * 그래서 함수 컴포넌트는 상태를 가질 수 없고 클래스 컴포넌트는 상태를 가질 수 있다
 * 
 * 실제로 instance 가 한 번 만들어지고 컴포넌트가 사라지기 전까지 React 가 모든 것을 관장하므로
 * 컴포넌트가 업데이트 되거나 props 가 새로 전달되거나 컴포넌트가 삭제될 때의 타이밍을 React 가 알게 된다
 * 거기에 맞는 라이프 사이클 메소드를 만들어서 호출
 * 
 * [함수 컴포넌트]
 * 그러나 이제는 함수 컴포넌트가 대세가 된다
 * Hook 이라는 마법을 제공. 결과론적으로 함수 컴포넌트도 상태를 가질 수 있게 됨
 * 라이프 사이클 메소드나 instance 를 만들어서 언제 마운트되고, 언제 삭제되고를 신경쓰지 않아도 됨
 */

export function render(vdom, container) {
  container.appendChild(createDom(vdom));
}


