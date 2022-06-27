/* @jsx createElement */
import { createDom, createElement, render } from './react'

// Title 안에서 JSX 문법을 사용하고
// h1 태그는 Transpiling 되면서 createElement 를 호출하게 되고
// vdom 스코프 내에서 <Title></Title> 이 호출하는 것은 createElement 함수
// 하지만 추가적인 작업 없이는 <Title></Title> 함수로 호출하지는 못한다
// Babel Try it out 에서 다음의 코드를 한 번 쳐보고 <Title></Title> 이 어떻게 바뀌는지 찾아볼 것
/**
 * const Title = <h1>React 만들기</h1>
 * const app = <p><Title></Title></p>
 */

function Title() {
  return <h1>React 만들기</h1>
}


const vdom = <p>
  <Title></Title>
  <ul>
    <li style="color:red">첫 번째 아이템</li>
    <li style="color:blue">두 번째 아이템</li>
    <li style="color:green">세 번째 아이템</li>
  </ul>
</p>

render(vdom, document.querySelector('#root'));