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
        template: './public/index.html'
    }),
    new ModuleFederationPlugin({
        name:'consumer',
        filename:'remoteEntry.js',
        remotes: {provider:'provider@http://localhost:3001/remoteEntry.js'},
        shared: {
            'react': { singleton: true, eager: true , requiredVersion: '^18.3.1'},
            '@mui/material':{singleton: true, eager: true , requiredVersion: "^6.1.4"}
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

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    devServer: {
        hot: true,
        port: 8080,
        open:true,
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
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
                        presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]],
                        cacheDirectory: true,
                    },
                },
            },
      ],
    }
}