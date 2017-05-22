"use strict";
var options = {};

// #############################
// Réglages des différents chemins
// #############################

var basePaths = {
    project:  '../',
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
//var displayError = function(error) {
//    // Initial building up of the error
//    var errorString = '[' + error.plugin + ']';
//    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
//    // If the error contains the filename or line number add it to the string
//    if(error.fileName)
//        errorString += ' in ' + error.fileName;
//    if(error.lineNumber)
//        errorString += ' on line ' + error.lineNumber;
//    // This will output an error like the following:
//    // [gulp-sass] error message in file_name on line 1
//    console.error(errorString);
//}


// #############################
// Tâches à accomplir - Tasks
// #############################
// 
// 
gulp.task('sasscompil', function () {
    return gulp.src('./sass/**/*.scss')
            .pipe(plugins.sourcemaps.init()) // Start Sourcemaps
            .pipe(plugins.sass({
                noCache: true,
//                outputStyle: 'compressed',
//                errLogToConsole: true,
                includePaths: [].concat(
                        assetsPath.gems,
                        assetsPath.node_modules,
                        folderPaths.styles.src
                        )
            }).on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write('.', {sourceRoot: folderPaths.styles.src}))//Pour créer le fichier css.map à coté du css
            .pipe(gulp.dest('./css'));
});