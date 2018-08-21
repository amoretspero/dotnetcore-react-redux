const path = require('path');
const webpack = require('webpack');
/**
 * This extracts texts from bundle(s) to seperate file.
 * Will be used for css(s) not to be included in bundle, rather resides in seperate css files.
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('vendor.css');

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = {
        stats: {
            modules: false // This excludes information about built modules. https://webpack.js.org/configuration/stats/
        },
        resolve: {
            extensions: ['.js'] // File extensions to resolve. https://webpack.js.org/configuration/resolve/#resolve-extensions
        },
        module: {
            rules: [
                // These rules specify how modules should be made. https://webpack.js.org/configuration/module/#rule
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, // This test indicates given regex should be matched to use this rule. https://webpack.js.org/configuration/module/#condition
                    use: 'url-loader?limit=100000' // What loader should be used for matched files. https://webpack.js.org/configuration/module/#rule-use
                }
            ]
        },
        entry: { // The entry point for each module. https://webpack.js.org/concepts/entry-points/
            vendor: [ // The entry point for 'vendor' module. In this case, since array of strings are passed, webpack creates 'multi-main entry', which injects multiple dependent files or libraries then graph their dependencies into one chunk. https://webpack.js.org/concepts/entry-points/ 
                'bootstrap',
                'bootstrap/dist/css/bootstrap.css',
                'domain-task',
                'event-source-polyfill',
                'history',
                'react',
                'react-dom',
                'react-router-dom',
                'react-redux',
                'redux',
                'redux-thunk',
                'react-router-redux',
                'jquery'
            ],
        },
        output: { // Output settings for bundles.
            publicPath: 'dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix.
            // This option specifies the public URL of the output directory when serving resources like images, files and others needed.
            // https://webpack.js.org/configuration/output/#output-publicpath
            filename: '[name].js', // Name of the output file. https://webpack.js.org/configuration/output/#output-filename
            library: '[name]_[hash]', // Role of this value depends on output.libraryTarget value.
            // For below case when we use "commonjs2" as output.libraryTarget value,
            // value of output.library actually does nothing, i.e. this is not required.
            // When output.libraryTarget is "commonjs2", The return value of entry point will be assigned to the `module.exports`.
            // https://webpack.js.org/configuration/output/#output-librarytarget
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            // This will automatically loads modules instead of having to import or require them everywhere.
            // https://webpack.js.org/plugins/provide-plugin
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            // This allows replacing resources that match certain regexp with new resource provided.
            // https://webpack.js.org/plugins/normal-module-replacement-plugin
            new webpack.DefinePlugin({ // Used to create global constants which can be configured at webpack compile time. https://webpack.js.org/plugins/define-plugin
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"' // Defines NODE_ENV constant.
            })
        ]
    };

    // Client bundle configuration is made by merging shared configuration and client specific configurations.
    const clientBundleConfig = merge(sharedConfig, {
        output: {// Output settings for bundles.
            path: path.join(__dirname, 'wwwroot', 'dist') // Path that bundles should be in.
        },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    use: extractCSS.extract({ // CSS should be in seperate file.
                        use: isDevBuild ? 'css-loader' : 'css-loader?minimize' // What loader to use for converting resource to a CSS exporting module.
                    })
                }
            ]
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            extractCSS, // Text extraction plugin. Result goes to 'site.css' file. https://github.com/webpack-contrib/extract-text-webpack-plugin
            new webpack.DllPlugin({ // Dll plugin can make bundling faster, by making precompiled bundle consisting of infrequently changing files, i.e. node_modules. By referencing, webpack finds precompiled bundles in given context. https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'), // An absolute path to where manifest file should be in.
                name: '[name]_[hash]' // Name of the exposed Dll function.
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin() // When in production environment, use js uglifier.
        ])
    });

    // ------------------------------------------------------------------------

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig, {
        target: 'node', // Target javascript runtime.
        resolve: { // How files should be resolved.
            mainFields: ['main'] // Which fields in package.json file should be checked when importing packages. https://webpack.js.org/configuration/resolve/#resolve-mainfields
        },
        output: {
            path: path.join(__dirname, 'ClientApp', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: { // Output settings for bundles.
            rules: [
                {
                    test: /\.css(\?|$)/, // CSS should be in seperate file.
                    use: isDevBuild ? 'css-loader' : 'css-loader?minimize' // What loader to use for converting resource to a CSS exporting module.
                }
            ]
        },
        entry: { // The entry point for each module. https://webpack.js.org/concepts/entry-points/
            vendor: ['aspnet-prerendering', 'react-dom/server'] // The entry point for 'vendor' module.
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            new webpack.DllPlugin({ // Dll plugin can make bundling faster, by making precompiled bundle consisting of infrequently changing files, i.e. node_modules. By referencing, webpack finds precompiled bundles in given context. https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c
                path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'), // An absolute path to where manifest file should be in.
                name: '[name]_[hash]' // Name of the exposed Dll function.
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
};
