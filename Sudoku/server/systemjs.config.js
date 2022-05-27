/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      app: 'out',
      // other libraries
      
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      "controllers": {
        defaultExtension: "js"
      },
      app: {
        main: './main.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);