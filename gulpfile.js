"use strict";
var options = {};

// #############################
// Réglages des différents chemins
// #############################

var basePaths = {
    project:  './',
    src: './sass/**/*.scss', // fichiers scss à surveiller
    dest:  './css/', // dossier à livrer
    tpl: '**/*.tpl.php',
    node_modules: './node_modules/',
    gems:'/home/webmaster/vendor/bundle/gems/'
};

//Chemins spécifiques
var folderPaths = {
    styles: {
        src: basePaths.project + 'sass/',
        dest: basePaths.theme + 'css/'
    },
    images: {
        src: basePaths.project + 'images/',
        dest: basePaths.theme + 'images/'
    },
    templates: {
        d6: basePaths.project + '**/*.tpl.php',
        d8: basePaths.project + '**/*.html.twig'
    }
};

//Variable pour les gems (à adapter selon environnement)
// File paths to various assets are defined here.
var assetsPath = {
  gems: [
//    basePaths.gems + 'susy-2.2.2/sass',
    basePaths.gems + 'breakpoint-2.7.1/stylesheets'
    
    
  ],
   node_modules: [
       //Ajoutés avec les gems pour simplifier     
    basePaths.node_modules +  'susy/sass',
    basePaths.node_modules +  'typey/stylesheets'   
  ],
  javascript: [
    '',
       
  ]
};
// Requis
var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // create a browser sync instance.
var bs_reload = browserSync.reload;
var bs_stream = browserSync.stream();

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
//gulp.task('browser-sync', ['sasscompil'], function() {
gulp.task('browser-sync', function() {
     // Fichiers à surveiller pour lancer browser-sync
    var files = [
        './css/*.css',
        './sass/**/*.scss',
        './js/*.js',
        './**/*.php',
        './**/*.tpl.php',
        './**/*.html.twig',
        './images/**/*.{png,jpg,gif,svg}'
    ];
       browserSync.init(files, {
        //changer l'adresse du site pour lequel utiliser browserSync
        proxy: "http://d6-gasquet.vmdev",
        open: false,
        logLevel: 'info',//debug pour avoir toutes les infos
        logConnections: true
    });
    
    gulp.watch(basePaths.src, ['sasscompil']);
//    gulp.watch(folderPaths.templates.d6).on('change', browserSync.reload);
});

// Tâche "build" = SASS + autoprefixer
gulp.task('sasscompil', function () {
    return gulp.src(basePaths.src)
            .pipe(plugins.sourcemaps.init()) // Start Sourcemaps
            .pipe(plugins.sass({
                noCache: true,
//                bundleExec: true,
                includePaths: [].concat(
                        assetsPath.gems,
                        assetsPath.node_modules,
                        folderPaths.styles.src
                        ),
                sourceMap: true,
                outputStyle: 'compressed',
                errLogToConsole: true
            })
            .on('error', plugins.sass.logError)
                    //    .on('error', console.error.bind(console, 'SASS Error :'))
                    //Avec fonction anti-crash sur erreurs
//                    .on('error', onError)
                    )
//            .on('error', function (err) {
//                displayError(err);
//            })


            .pipe(plugins.autoprefixer
                    (
                            {
                                browsers: AUTOPREFIXER_BROWSERS,
                                cascade: false
                            }
                    ))
//            .pipe(plugins.sourcemaps.write('.'))//Pour créer le fichier css.map à coté du css
            .pipe(plugins.sourcemaps.write('.',{sourceRoot:folderPaths.styles.src}))//Pour créer le fichier css.map à coté du css
            .pipe(gulp.dest(basePaths.dest))
            .pipe(plugins.size({title:'Taille du fichier css'}))
            .pipe(plugins.notify({
                title: "SASS Compilé - Fichier Map créé",
                message: "Les fichiers SCSS sont compilés dans le dossier CSS",
                onLast: true
            }))
//            .pipe(bs_stream)// prompts a reload after compilation
            .pipe(bs_reload({stream: true}))// prompts a reload after compilation

    ;
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




//// Tâche "watch" = je surveille *scss ; sans utiliser browserSync
gulp.task('watch', function() {
  // Watch - surveiller.scss files
  gulp.watch(basePaths.src, ['sasscompil' ])
  
  // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});
//
//// Tâche par défaut (choisir si utilisation de watch ou browserSync
gulp.task('default', [
//    'watch',
    
    'browser-sync'
]);


//Debug des plugins chargés : liste les plugins chargés
 console.log(Object.keys(plugins)); 
 //Empêcher crash de Gulp en cas d'erreur
 function onError(err) {
  console.log(err);
  this.emit('end');
}

