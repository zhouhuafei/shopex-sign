const myConfig = process.env.NODE_ENV.split('-');
myConfig.forEach(function (v, i, a) {
    a[i] = v.trim();
});
const isProduction = myConfig[0] === 'production'; // 是否是生产环境
const webpack = require('webpack'); // 调用插件需要这个
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // scss文件转css文件需要这个
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html生成的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空目录
const ImageminPlugin = require('imagemin-webpack-plugin').default; // 压缩图片
// 配置入口路径和出口路径
const configPath = {
    entry: `${__dirname}/src/`,
    output: `${__dirname}/${isProduction ? 'dist/' : ''}`,
};
// 环境----开发环境
let configEnvironment = {
    publicPath: '/', // 出口路径----指定资源文件引用的目录
    hash: '[hash:8].', // 图片和字体用到了这个hash
    chunkhash: '', // js用到了这个chunkhash
    contenthash: '', // css用到了这个contenthash
    min: '', // 第三方库是否引用压缩版(生产环境引用压缩版)
    isMinCss: false, // 是否压缩css
    isWatch: true, // 是否监听
    minView: {}, // 压缩视图模板文件
    devtool: '', // #source-map
};
// 环境----生产环境
if (isProduction) {
    configEnvironment = {
        publicPath: '/', // 出口路径----指定资源文件引用的目录
        hash: '[hash:8].', // 图片和字体用到了这个hash
        chunkhash: '[chunkhash].', // js用到了这个chunkhash
        contenthash: '[contenthash].', // css用到了这个contenthash
        min: 'min.', // 第三方库是否引用压缩版(生产环境引用压缩版)
        isMinCss: true, // 是否压缩css
        isWatch: true, // 是否监听
        minView: {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 删除空白符与换行符
        },
        devtool: '#source-map', // #source-map
    };
}
// 别名----配置
const alias = {
    vue: `vue/dist/vue.${configEnvironment.min}js`,
    'vue-router': `vue-router/dist/vue-router.${configEnvironment.min}js`,
    vuex: `vuex/dist/vuex.${configEnvironment.min}js`,
    axios: `axios/dist/axios.${configEnvironment.min}js`,
};
// 入口----配置
const entry = {
    app: `${configPath.entry}/app.js`,
    'this-is-global-file-vendor': ['vue', 'vue-router', 'vuex', 'axios'],
    'this-is-global-file-common': [`${configPath.entry}utils/tools.js`, `${configPath.entry}utils/applications.js`],
};
// 出口----配置
const output = {
    path: configPath.output, // 出口路径----用来存放打包后文件的输出目录
    publicPath: configEnvironment.publicPath, // 出口路径----指定资源文件引用的目录
    filename: `js/pages/[name].${configEnvironment.chunkhash}js`,
    chunkFilename: `js/chunks/[name].[id].chunk.${configEnvironment.chunkhash}js`,
};
// 插件----集合
const plugins = [
    // 插件----清空dist目录
    new CleanWebpackPlugin(['dist'], {root: __dirname, verbose: true, dry: false}),
    // 插件----提取css样式到文件
    new ExtractTextPlugin(`css/[name].${configEnvironment.contenthash}css`),
    // 插件----处理视图模板页面文件
    new HtmlWebpackPlugin({
        template: `${configPath.entry}index.html`,
        filename: 'index.html',
        minify: configEnvironment.minView, // 压缩视图模板文件
    }),
    // 插件----把公用的js提取为this-is-global-file.js
    new webpack.optimize.CommonsChunkPlugin({
        names: ['this-is-global-file-common', 'this-is-global-file-vendor', 'this-is-global-file-manifest'], // this-is-global-file-manifest:抽取变动部分，防止第三方控件的多次打包
    }),
];
if (isProduction) {
    // 插件----压缩js
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        sourceMap: true,
    }));
    // 插件----压缩图片
    plugins.push(new ImageminPlugin({
        disable: false,
        pngquant: {
            quality: '95-100',
        },
    }));
}
const webpackConfig = {
    // devtool----#source-map
    devtool: configEnvironment.devtool,
    // resolve----配置用来影响webpack模块解析规则
    resolve: {
        // 别名----引入开发版本还是生产版本
        alias,
    },
    // 入口----配置
    entry,
    // 出口----配置
    output,
    // 插件----配置
    plugins,
    // 监听----配置
    watch: configEnvironment.isWatch,
    // 模块----配置
    module: {
        // rules----loader加载器的规则集合
        rules: [
            // loader----处理sass
            {
                test: /\.(css|scss)$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: configEnvironment.isMinCss, // css压缩
                            },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                }),
            },
            // loader----es6转成es5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
            },
            // loader----处理图片
            {
                test: /\.(png|jp(e)?g|gif|svg|ico)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `images/[name].${configEnvironment.hash}[ext]`,
                        },
                    },
                ],
            },
            // loader----处理字体
            {
                test: /\.(woff|eot|ttf)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `fonts/[name].${configEnvironment.hash}[ext]`,
                        },
                    },
                ],
            },
            // loader----处理vue单文件
            {
                test: /\.vue$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformToRequire: {
                                img: ['src', 'data-src'],
                                image: 'xlink:href',
                            },
                        },
                    },
                ],
            },
            // loader----处理视图模板文件里的src
            {
                test: /\.html/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src', 'link:href'],
                        },
                    },
                ],
            },
        ],
    },
    // 重载----自动刷新
    devServer: {
        historyApiFallback: true,
        inline: true,
        open: true,
        port: 2555,
        openPage: '',
        // 代理实现接口跨域
        proxy: {
            '/': { // 需要代理的路径
                target: 'http://127.0.0.1:5552/', // 需要代理的域名
                changeOrigin: true, // 必须配置为true，才能正确代理
            },
        },
    },
};
module.exports = webpackConfig;
