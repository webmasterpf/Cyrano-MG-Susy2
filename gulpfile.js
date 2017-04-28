"use strict";
// Requis
var gulp = require('gulp');

// Include plugins
// tous les plugins de package.json
var plugins = require('gulp-load-plugins')();


// Variables de chemins des fichiers à compiler/surveiller
var source = './sass/**/*.scss'; // dossier de travail
//var source = './sass/**/application.scss'; // dossier de travail
var destination = './css/'; // dossier à livrer

//Variable pour les gems (à adapter selon environnement)
// File paths to various assets are defined here.
var PATHS = {
  gems: [
    '/home/webmaster/vendor/bundle/gems/susy-2.2.2/sass',
    '/home/webmaster/vendor/bundle/gems/breakpoint-2.7.1/stylesheets',
    '/home/webmaster/vendor/bundle/gems/',
  ],
  javascript: [
    '',
       
  ],
};
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
                bundleExec: true,
                outputStyle: 'compressed',
                includePaths: PATHS.gems

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
                title: "SASS Compilé",
                message: "Les fichiers SCSS sont compilés dans le dossier CSS",
                onLast: true
            }));
});

/**
 * Defines a task that triggers a Drush cache clear (css-js).
 */
gulp.task('drush:cc', function () {
//  if (!config.drush.enabled) {
//    return;
//  }
//
//  return gulp.src('', {read: false})
//    .pipe(shell([
//      config.drush.alias.css_js
//    ]))
//    .pipe(plugins.notify({
//      title: "Caches cleared",
//      message: "Drupal CSS/JS caches cleared.",
//      onLast: true
//    }));
});

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