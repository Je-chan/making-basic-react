/* @jsx createElement */
import { createElement, render } from './react'

// Title 안에서 JSX 문법을 사용하고
// h1 태그는 Transpiling 되면서 createElement 를 호출하게 되고
// vdom 스코프 내에서 <Title></Title> 이 호출하는 것은 createElement 함수
// 하지만 추가적인 작업 없이는 <Title></Title> 함수로 호출하지는 못한다
// Babel Try it out 에서 다음의 코드를 한 번 쳐보고 <Title></Title> 이 어떻게 바뀌는지 찾아볼 것
/**
 * const Title = () => <h1>React 만들기</h1>
 * const app = <p><Title></Title></p>
 * 
 * 이렇게 될 경우 
 * 
 * const Title = () => React.createElement("h1", null, "React \uB9CC\uB4E4\uAE30")
 * const app = React.createElement("p", null, React.createElement(Title, null))
 * 
 * 이렇게 되면 저기 React.createElement(Title, null) 에서 Title 이 함수인지 체크하고,
 * 함수라면 그 함수를 호출했을 때 return 되는 값은 JSX 를 반환한다는 것만을 By Design 으로 지정하면 될 것
 * 
 * const title = () => <h1>React 만들기</h1> 
 * const app = <p><title></title></p> 
 * 
 * 이렇게 하면 아래처럼 트랜스파일링이 된다
 * 
 * const app = React.createElement("p", null, React.createElement("title", null));
 * 
 * 소문자로 하게 되면 "문자열" 로 받고, 대문자로 하게 되면 "함수" 로 받는 것
 * 문자열로 처리할지, 함수로 처리할 지. 그것을 구분하기 위해서 첫 시작을 소문자, 대문자로 설정한 것
*/

function Title(props) {
  return <h1>{ props.children }</h1>
}

function Description(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>
}

const vdom = <p>
  <Title>React를 잘 만들어 볼게요</Title>
  <ul>
    <Description color="red">React 만들기 빨강</Description>
    <Description color="blue">React 만들기 파랑</Description>
    <Description color="green">React 만들기 초록</Description>
  </ul>
</p>

render(vdom, document.querySelector('#root'));