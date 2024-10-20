
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {ModuleFederationPlugin} = require('@module-federation/enhanced/webpack')

let mode = 'development'; 
if (process.env.NODE_ENV === 'production') { 
  mode = 'production';
}

const plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css', 
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html',
    }),
    new ModuleFederationPlugin({
        name: 'weatherProvider',
        filename: 'remoteEntry.js',
        exposes: {
          "./WeatherModule": './src/components/weatherModule/weatherModule',
        },
        shared: {
            'react': { singleton: true, eager: true , requiredVersion: '^18.3.1'},
            '@mui/material':{singleton: true, eager: true , requiredVersion: "^6.1.4"},
            '@mui/icons-material':{singleton: true, eager: true , requiredVersion: "^6.1.4"},
            'openmeteo':{singleton:true, eager: true, requiredVersion: '^1.1.4'}
        },
      }),
  ];

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,
    plugins,
    entry: './src/entry', 
  
    devtool: 'source-map',

    devServer: {
        hot: true,
        port: 3002,
    },
    optimization: {
        minimize: false,
    },

    output: {
        publicPath: 'auto',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ['html-loader'] },
            {
            test: /\.(s[ac]|c)ss$/i, 
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
            }, 
            {
                test: /\.jsx?$/, // обновляем регулярное выражение для поддержки jsx
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        cacheDirectory: true,
                    },
                },
            },
      ],
    }
}