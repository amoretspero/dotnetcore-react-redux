const path = require('path');
const webpack = require('webpack');
/**
 * This extracts texts from bundle(s) to seperate file.
 * Will be used for css(s) not to be included in bundle, rather resides in seperate css files.
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        stats: {
            modules: false  // This excludes information about built modules. https://webpack.js.org/configuration/stats/
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'] // File extensions to resolve. https://webpack.js.org/configuration/resolve/#resolve-extensions
        },
        output: { // Output settings for bundles.
            filename: '[name].js', // Name of the output file. https://webpack.js.org/configuration/output/#output-filename
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix.
            // This option specifies the public URL of the output directory when serving resources like images, files and others needed.
            // https://webpack.js.org/configuration/output/#output-publicpath
        },
        module: {
            rules: [
                // These rules specify how modules should be made. https://webpack.js.org/configuration/module/#rule
                {
                    test: /\.tsx?$/, // This test indicates given regex should be matched to use this rule. https://webpack.js.org/configuration/module/#condition
                    include: /ClientApp/, // This indicates files that should be included. IF directory is given, sub files, directories are selected. https://webpack.js.org/configuration/module/#condition
                    use: 'awesome-typescript-loader?silent=true' // What loader should be used for matched files. https://webpack.js.org/configuration/module/#rule-use
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                }
            ]
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            new CheckerPlugin() // This plugin is for asynchronous error report. https://github.com/s-panferov/awesome-typescript-loader#configuration
        ]
    });

    // -------------------------------------------------------------------------

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist'; // This directory is ASP.NET Core convention.

    // Client bundle configuration is made by merging shared configuration and client specific configurations.
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { // The entry point for each module. https://webpack.js.org/concepts/entry-points/
            'main-client': './ClientApp/boot-client.tsx' // The entry point for 'main-client' module.
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({ // CSS should be in seperate file.
                        use: isDevBuild ? 'css-loader' : 'css-loader?minimize' // What loader to use for converting resource to a CSS exporting module.
                    })
                }
            ]
        },
        output: { // Output settings for bundles.
            path: path.join(__dirname, clientBundleOutputDir) // Path that bundles should be in.
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            new ExtractTextPlugin('site.css'), // Text extraction plugin. Result goes to 'site.css' file. https://github.com/webpack-contrib/extract-text-webpack-plugin
            new webpack.DllReferencePlugin({ // Dll plugin can make bundling faster, by making precompiled bundle consisting of infrequently changing files, i.e. node_modules. By referencing, webpack finds precompiled bundles in given context. https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c
                context: __dirname, // Absolute path to use for referencing dll bundles. Used by manifest file. https://webpack.js.org/plugins/dll-plugin/
                manifest: require('./wwwroot/dist/vendor-manifest.json') // An object containing content and name, or a string to the absolute path of the JSON manifest file to be loaded upon compilation. https://webpack.js.org/plugins/dll-plugin/
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({ // Provides source map. https://webpack.js.org/plugins/source-map-dev-tool-plugin/
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin() // Uglifies javascript files.
            ])
    });

    // ------------------------------------------------------------------------

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { // How files should be resolved.
            mainFields: ['main'] // Which fields in package.json file should be checked when importing packages. https://webpack.js.org/configuration/resolve/#resolve-mainfields
        },
        entry: { // The entry point for each module. https://webpack.js.org/concepts/entry-points/
            'main-server': './ClientApp/boot-server.tsx' // The entry point for 'main-server' module.
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            new webpack.DllReferencePlugin({ // Dll plugin can make bundling faster, by making precompiled bundle consisting of infrequently changing files, i.e. node_modules. By referencing, webpack finds precompiled bundles in given context. https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c
                context: __dirname, // Absolute path to use for referencing dll bundles. Used by manifest file. https://webpack.js.org/plugins/dll-plugin/
                manifest: require('./ClientApp/dist/vendor-manifest.json'), // An object containing content and name, or a string to the absolute path of the JSON manifest file to be loaded upon compilation. https://webpack.js.org/plugins/dll-plugin/
                sourceType: 'commonjs2', // How dll module should be exposed. This specifies what module definition type should be used. https://webpack.js.org/plugins/dll-plugin/
                name: './vendor' // Name where the dll is exposed. https://webpack.js.org/plugins/dll-plugin/
            })
        ],
        output: { // Output settings for bundles.
            libraryTarget: 'commonjs', // Which javascript target that library should be exposed as. https://webpack.js.org/configuration/output/#output-librarytarget
            path: path.join(__dirname, './ClientApp/dist') // Path that bundles should be in.
        },
        target: 'node', // Target javascript runtime.
        devtool: 'inline-source-map' // How source maps should be generated. https://webpack.js.org/configuration/devtool
    });

    return [clientBundleConfig, serverBundleConfig];
};