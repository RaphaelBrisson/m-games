const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const PATHS = {
    root: path.join(__dirname, '/'),
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
};

new webpack.EnvironmentPlugin(['NODE_ENV']);

config = {

    mode: 'production',

    entry: './src/js/index.js',

    output: {
        filename: 'main.js',
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            ctx: {
                                env: 'production'
                            }
                        }
                    }
                }, 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: PATHS.src,
                            name: `[path][name].[ext]`,
                            esModule: false,
                        },
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        context: PATHS.src,
                        name: '[path][name].[ext]',
                        esModule: false,
                    },
                }]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: './src/img/favicon.png'
        }),
        new MiniCssExtractPlugin({
            filename: `style.css`
        })
    ]
};

module.exports = config;