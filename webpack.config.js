// 다른 OS 에서도 빌드할 때 문제없이 동작하기 위해서 path 모듈을 가져온다
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 최종적으로 서비스할 거 만들 것인가, 개발만 할 것인가
  mode: 'development',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    compress: true,
    port: 9999
  },

  // webpack 은 entry 에 지정된 자바스크립트에서 시작해서 변환 과정을 거치고 출력
  // 트랜스 파일러 세팅
  module: {
    rules: [
      {
        // 확장자가 js인 것만을 babel-loader에 넘긴다는 것을 의미한다
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }  
    ]
  },
  // 플러그인의 n개의 소프트웨어를 설정해주면 마지막 처리 과정에 개입해서 일을 처리하는 것
  // 최종적으로 output 파일로 넘겨준다
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Making React',
      template: 'index.html'
    })
  ]
}