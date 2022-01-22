import path from "path";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import express from "express";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    entry: "./src/index.tsx",
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            [
                                "@babel/preset-react",
                                {
                                    "runtime": "automatic"
                                }
                            ],
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    devServer: {
        static: path.join(__dirname, "build"),
        compress: true,
        port: 4000,
        setupMiddlewares: (middlewares, devServer) => {
            devServer.app?.use('/lang/', express.static(path.resolve(__dirname, 'lang')));
            return middlewares;
        }
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: "./src/**/*",
            },
        }),
    ],
};

export default config;