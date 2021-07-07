const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'eval', // 빠르게
    resolve: { // entry app의 변환할 파일명
        extensions: ['.jsx', '.js'],
        fallback: {
            "util": false,
            // "buffer": require.resolve('buffer-browserify'),
            "stream": require.resolve('stream-browserify'),
            "crypto": require.resolve('crypto-browserify')
        }
    },
    entry: { // 코드의 시작지점 (입력)
        app: './lib/index.js' // 여러개면 배열로 넣으면 됨
    },
    module: { // 웹팩이 사용할 플러그인 지정
        rules: [{ // 여러개의 규칙들 (배열)
            test: /\.jsx?/, // 규칙 적용할 대상 확장자 (정규 표현식)
            // jsx? => js, jsx
            exclude: /node_modules/, // 제외
            loader: 'babel-loader',
            options: {
                presets: [ // plugin 설정들의 모음
                    ['@babel/preset-env', {
                        targets: { // 예전 브라우저 지원
                            browsers: ['> 0.25% in KR', 'not dead'],
                            ios: "13"
                        }, // 한국에서 1% 이상 점유율 가진 브라우저
                        // debug: true, // 개발용
                        useBuiltIns: "entry",
                        corejs: 3
                    }]
                ],
                plugins: [],
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    ],
    output: { // 컴파일한 코드를 내놓을 위치 (출력)
        path: path.join(__dirname, 'dist'), // 파일위치할 디렉토리를 절대 경로로 지정
        filename: 'did-jwt-vc.js', // 저장할 파일명 지정
        library:
        {
            type: "global"
        }
    },
}