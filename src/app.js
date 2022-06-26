import { createDom, render } from './react'

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
          props: {
            style: "color:red"
          },
          children: ["React 만들어 보기 1"]
        },     
        {
          tag: 'li',
          props: {
            style: "color:blue"
          },
          children: ["React 만들어 보기 2"]
        },     
        {
          tag: 'li',
          props: {
            style: "color:green"
          },
          children: ["React 만들어 보기 3"]
        }
      ]
    }
  ]
}

render(vdom, document.querySelector('#root'));