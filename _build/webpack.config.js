'use strict'
const path = require('path')
const config = require('./config');
const utils = require('./utils');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const IS_PROD = process.env.NODE_ENV === 'production';
function extractCss(arr) {
    return !IS_PROD ? ['style-loader'].concat(arr) : ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: arr
    });
}
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
let webpackConfig = {
    context: process.cwd(),
    entry: {
        app: './src/app.tsx',
        polyfills: './src/polyfills.tsx',
        style: './src/style.less'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: IS_PROD
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/gi,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.css$/,
                enforce: 'post',
                use: extractCss(['style-loader', 'css-loader'])
            }, {
                test: /\.scss$/,
                enforce: 'post',
                use: extractCss(['style-loader', 'css-loader', 'sass-loader']),
            }, {
                test: /\.less$/,
                enforce: 'post',
                use: extractCss(['to-string-loader', 'css-loader', 'less-loader']),
            }, {
                test: /\.html$/,
                use: 'raw-loader',
                include: [path.join(__dirname, '../src/index.html')]
            }, {
                test: /\.html$/,
                loader: 'vue-template-loader',
                exclude: [path.join(__dirname, '../src/index.html')],
                options: {
                    transformToRequire: {
                      img: 'src'
                    },
                    scoped: true
                }
            }, {
                test: /\.tsx?$/,
                use: [ "babel-loader", {
                    loader: 'awesome-typescript-loader',
                    options: {
                        errorsAsWarnings: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, '../static'),
              to: config.build.assetsSubDirectory,
              ignore: ['.*']
            }, {
                from: 'src/assets',
                to: 'assets'
            }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: function (a, b) {
              const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main", "app"];
              return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
            },
            inject: 'body',
            xhtml: true,
            minify: IS_PROD ? {
              caseSensitive: true,
              collapseWhitespace: true,
              keepClosingSlash: true
            } : false
        }),
    ],
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
if(IS_PROD) {
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
    webpackConfig.output.filename = utils.assetsPath('js/[name].[chunkhash].js');
    webpackConfig.output.chunkFilename = utils.assetsPath('js/[id].[chunkhash].js')
    if(config.build.zip) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')
        webpackConfig.plugins.push(
            new CompressionWebpackPlugin({
              asset: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
              ),
              threshold: 10240,
              minRatio: 0.8
            })
        )
    }
    webpackConfig.plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: false,//config.build.productionSourceMap,
        parallel: true
    }));
    webpackConfig.plugins.push(new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css'),
        allChunks: true,
    }));
    webpackConfig.plugins.push(new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
    }));

} else {
    webpackConfig.devServer = {
        clientLogLevel: 'warning',
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
          ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: process.env.HOST || config.dev.host,
        port: process.env.PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
          ? { warnings: false, errors: true }
          : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
          poll: config.dev.poll,
        }
    };
    [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ].forEach((plugin) => {
        webpackConfig.plugins.push(plugin);
    })
}
module.exports = webpackConfig;