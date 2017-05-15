"use strict";
var options = {};

// #############################
// Réglages des différents chemins
// #############################

var basePaths = {
    src: './sass/**/*.scss', // fichiers scss à surveiller
    dest:  './css/', // dossier à livrer
    node_modules: 'node_modules/',
    gems:'/home/webmaster/vendor/bundle/gems/'
};

var paths = {
    images: {
        src: basePaths.src + 'images/',
        dest: basePaths.dest + 'images/min/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/min/'
    },
    sprite: {
        src: basePaths.src + 'sprite/*'
    }
};



//Variable pour les gems (à adapter selon environnement)
// File paths to various assets are defined here.
var assetsPath = {
  gems: [
    basePaths.gems + 'susy-2.2.2/sass',
    basePaths.gems + 'breakpoint-2.7.1/stylesheets',
    
    basePaths.node_modules +  'typey/stylesheets'
  ],
   node_modules: [
       //Ajoutés avec les gems pour simplifier     
       
  ],
  javascript: [
    '',
       
  ]
};
// Requis
var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // create a browser sync instance.
var reload = browserSync.reload;

// Include plugins
// tous les plugins de package.json
var plugins = require('gulp-load-plugins')();


// Autoprefixer : Navigateurs à cibler pour le préfixage CSS
var AUTOPREFIXER_BROWSERS = [

'> 1%',
'ie >= 8',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4',
'bb >= 10'
];

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;
    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;
    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}


// #############################
// Tâches à accomplir - Tasks
// #############################
// 
// 
// Tâche pour BrowserSync
gulp.task('browser-sync', ['sasscompil'], function() {
    browserSync.init({
        //changer l'adresse du site pour lequel utiliser browserSync
        proxy: "http://d6-gasquet.vmdev"
    });
});

// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('sasscompil', function () {
    return gulp.src(basePaths.src)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                noCache: true,
                bundleExec: true,
                includePaths: [].concat(
                        assetsPath.gems
                        //assetsPath.node_modules
                        ),
                sourceMap: true,
                outputStyle: 'compressed'
                
            })
//            .on('error', plugins.sass.logError)
                    //    .on('error', console.error.bind(console, 'SASS Error :'))
                    //Avec fonction anti-crash sur erreurs
                    .on('error', onError)
                    )
            
              .on('error', function(err){
        displayError(err);
    })

//    .pipe(plugins.csscomb())
//    .pipe(plugins.cssbeautify({indent: '  '}))
            .pipe(plugins.autoprefixer
                    (
                            {
                                browsers: AUTOPREFIXER_BROWSERS,
                                cascade: false
                            }
                    ))
            .pipe(plugins.sourcemaps.write(basePaths.dest))
            .pipe(gulp.dest(basePaths.dest))
            .pipe(plugins.size({title:'Taille du fichier css'}))
            .pipe(plugins.notify({
                title: "SASS Maps Compilé",
                message: "Les fichiers SCSS sont compilés dans le dossier CSS",
                onLast: true
            }))
            .pipe(reload({stream: true})); // prompts a reload after compilation
});

/**
 * Defines a task that triggers a Drush cache clear (css-js).
 */
gulp.task('drush:cc', function () {
  
  return gulp.src(basePaths.src)
    .pipe(plugins.shell.task([
//      'drush @vmdevd6mg cc all'
       'echo test'
    ])) 
    .pipe(plugins.notify({
      title: "Caches cleared",
      message: "Drush Drupal CSS/JS caches cleared.",
      onLast: true
    }));
});

// Run drush to clear the theme registry.
gulp.task('drush', plugins.shell.task([
//   'drush @vmdevd6mg cc all',
   'echo test'
]));




//// Tâche "watch" = je surveille *scss
gulp.task('watch', function() {
  // Watch - surveiller.scss files
  gulp.watch(basePaths.src, [
      'sasscompil',
//      'drush:cc' 
'browser-sync'
  ])
  
  // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
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

