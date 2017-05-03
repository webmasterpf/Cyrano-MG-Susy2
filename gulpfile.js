"use strict";
var options = {};

// #############################
// Edit these paths and options.
// #############################

var importOnce = require('node-sass-import-once'),
  path = require('path');
  
// The root paths are used to construct all the other paths in this
// configuration. The "project" root path is where this gulpfile.js is located.
// While Zen distributes this in the theme root folder, you can also put this
// (and the package.json) in your project's root folder and edit the paths
// accordingly.
options.rootPath = {
  project     : __dirname + '/',
  styleGuide  : __dirname + '/styleguide/',
  theme       : __dirname + '/'
};

options.theme = {
  root  : options.rootPath.theme,
  css   : options.rootPath.theme + 'css/',
  sass  : options.rootPath.theme + 'sass/',
  js    : options.rootPath.theme + 'js/'
};

// Set the URL used to access the Drupal website under development. This will
// allow Browser Sync to serve the website and update CSS changes on the fly.
options.drupalURL = '';
// options.drupalURL = 'http://localhost';



//Variable pour les gems (à adapter selon environnement)
// File paths to various assets are defined here.
var PATHS = {
  gems: [
    '/home/webmaster/vendor/bundle/gems/susy-2.2.2/sass',
    '/home/webmaster/vendor/bundle/gems/breakpoint-2.7.1/stylesheets',
    '/home/webmaster/vendor/bundle/gems/'
  ],
   node_modules: [
    options.rootPath.project + 'node_modules/typey/stylesheets'
       
  ],
  javascript: [
    '',
       
  ]
};
// Requis
var gulp = require('gulp');

// Include plugins
// tous les plugins de package.json
var plugins = require('gulp-load-plugins')();


// Variables de chemins des fichiers à compiler/surveiller
var source = './sass/**/*.scss'; // dossier de travail
//var source = './sass/**/application.scss'; // dossier de travail
var destination = './css/'; // dossier à livrer

// Autoprefixer : Navigateurs à cibler pour le préfixage CSS
var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3'
];
// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('sasscompil', function () {
    return gulp.src(source)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                noCache: true,
                bundleExec: true,
                includePaths:[].concat(PATHS.gems, PATHS.node_modules),
                sourceMap: true,
                outputStyle: 'compressed'
                
            })
//            .on('error', plugins.sass.logError)
                    //    .on('error', console.error.bind(console, 'SASS Error :'))
                    //Avec fonction anti-crash sur erreurs
                    .on('error', onError)
                    )

//    .pipe(plugins.csscomb())
//    .pipe(plugins.cssbeautify({indent: '  '}))
            .pipe(plugins.autoprefixer
                    (
                            {
                                browsers: COMPATIBILITY,
                                cascade: false
                            }
                    ))
            .pipe(plugins.sourcemaps.write(destination))
            .pipe(gulp.dest(destination))
            .pipe(plugins.size())
            .pipe(plugins.notify({
                title: "SASS Maps Compilé",
                message: "Les fichiers SCSS sont compilés dans le dossier CSS",
                onLast: true
            }));
});

/**
 * Defines a task that triggers a Drush cache clear (css-js).
 */
gulp.task('drush:cc', function () {
  
//  return gulp.src(source)
//    .pipe(plugins.shell([
//      'drush @vmdevd6mg cc all'
//    ])) 
//    .pipe(plugins.notify({
//      title: "Caches cleared",
//      message: "Drush Drupal CSS/JS caches cleared.",
//      onLast: true
//    }));
});

// Run drush to clear the theme registry.
gulp.task('drush', plugins.shell.task([
   'drush @vmdevd6mg cc all'
]));

//// Tâche "watch" = je surveille *scss
gulp.task('watch', function() {
  // Watch - surveiller.scss files
  gulp.watch(source, ['sasscompil','drush:cc' ]);
  //Surveiller les images pour les sprites
});
//
//// Tâche par défaut
gulp.task('default', ['watch']);


//Debug des plugins chargés : liste les plugins chargés
 console.log(Object.keys(plugins)); 
 //Empêcher crash de Gulp en cas d'erreur
 function onError(err) {
  console.log(err);
  this.emit('end');
}