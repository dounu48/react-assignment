var path = require('path');

module.exports = {
    // 가장 처음 읽을 스크립트파일
    // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
    entry: './src/index.js',

    // 파일을 합치고 ./public/bundle.js 에 저장한다.
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    // ES6 문법과 JSX 문법을 사용한다
    module: {
        rules: [
           {
                           test: /\.js$/,
                            exclude: /node_modules/,
                           include: path.resolve(__dirname, 'src'),
                               use: [{
                                  loader: 'babel-loader',
           }]},

           {
                   test: /\.css$/,
                   use: [ 'style-loader', 'css-loader' ]
                 }
        ]
    },

    resolve: {
            modules: [
                path.join(__dirname, 'src'),
                "node_modules"
            ]
        }
};