var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;//提取代码中的公共模, 然后将公共模块打包到一个独立的文件中去，以便在其它的入口和模块中使用
var DefinePlugin = webpack.DefinePlugin;

module.exports = {
    //页面入口文件配置
    entry: {
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        index: path.resolve('index.js'),
    },
    //入口文件输出配置
    output: {
        path: 'dist',
        publicPath: 'dist',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.js$/,
            loader: 'babel', //'babel?presets[]=react,presets[]=es2015'
            query: {
                plugins: [
                    'transform-runtime',
                    'add-module-exports',
                    'transform-decorators-legacy'
                ],
                presets: ['es2015', 'react', 'stage-0']
            },
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ]
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpe?g|gif|eot|svg|ttf|woff2?)$/,
            loader: `file?name=images/[name].[ext]`
        }]
    },
     //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    //插件项
    // plugins: (function(){
    //     var arr = [
    //         new CommonsChunkPlugin({
    //             name: 'common', //合并后的chuknk名
    //             chunks: ['index'] //与entry一一对应，表示要提取这些模块中的公共模块
    //         }),
    //         new CommonsChunkPlugin({
    //             name: 'lib',
    //             filename: 'lib.js',
    //             chunks: ['lib', 'common']
    //         }),
    //         new ExtractTextPlugin(
    //             '[name].css',
    //             {allChunks: true}
    //         )
    //     ];
    //
    //     return arr;
    // })()
};
