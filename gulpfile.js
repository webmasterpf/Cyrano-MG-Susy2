"use strict";
var options = {};

// #############################
// Réglages des différents chemins
// #############################

var basePaths = {
    project:  './',
    projectsourcemap:  '../',
    src: './sass/**/*.scss', // fichiers scss à surveiller
    dest:  './css/', // dossier à livrer
    tpl: '**/*.tpl.php',
    node_modules: './node_modules/',
    gems:'/home/webmaster/vendor/bundle/gems/'
};

//Chemins spécifiques
var folderPaths = {
    styles: {
        src: basePaths.projectsourcemap + 'sass/',
        dest: basePaths.theme + 'css/'
    },
    images: {
        src: basePaths.project + 'images/',
        dest: basePaths.theme + 'images/'
    },
    templates: {
        d6: basePaths.project + '**/*.tpl.php',
        d8: basePaths.project + '**/*.html.twig'
    },
    settings: {
        d6: basePaths.project + '**/*.php',
        d8: basePaths.project + '**/*.php'
    },
    js: {
        jsd68: basePaths.project + 'js/**/*.js'
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
    basePaths.node_modules +  'typey/stylesheets/_typey.scss'
  ],
  javascript: [
    
       
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
var gutil = require('gulp-util');


// Autoprefixer : Navigateurs à cibler pour le préfixage CSS
var AUTOPREFIXER_BROWSERS = [

'> 1%',
'ie >= 8',
'ie_mob >= 10',
'ff >= 45',
'chrome >= 45',
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
    return gulp.src(basePaths.src)
//    return gulp.src('./sass/**/*.scss')
        .pipe(plugins.plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
            .pipe(plugins.sourcemaps.init()) // Start Sourcemaps
            .pipe(plugins.sass({
                noCache: true,
                outputStyle: 'compressed',
                errLogToConsole: true,
                includePaths: [].concat(
                        assetsPath.gems,
                        assetsPath.node_modules,
                        folderPaths.styles.src
                        )
            }).on('error', plugins.sass.logError))
            .pipe(plugins.autoprefixer
                    (
                            {
                                browsers: AUTOPREFIXER_BROWSERS,
                                cascade: false
                            }
                    ))
            .pipe(plugins.sourcemaps.write('.', {sourceRoot: folderPaths.styles.src}))//Pour créer le fichier css.map à coté du css
            .pipe(gulp.dest(basePaths.dest))
            .pipe(plugins.size({title: 'Taille du fichier css'}))
            .pipe(plugins.notify({
                title: "SASS Compilé - Fichier Map créé",
                message: "Les fichiers SCSS sont compilés dans le dossier CSS",
                onLast: true
            }))
            .pipe(bs_reload({stream: true}))// rechargement des navigateurs par BS après compilation
            ;
});

gulp.task('browser-sync', function() {
browserSync.init({
        //changer l'adresse du site pour lequel utiliser browserSync
        proxy: "http://d6-gasquet.vmdev",
        open: false,
        logLevel: 'info',//debug pour avoir toutes les infos
        logConnections: true
    });
});

//Tâche de surveillance et d'automatisation
gulp.task('default', ['browser-sync'], function(){
//    gulp.task('default', function(){
  gulp.watch(basePaths.src, ['sasscompil']);
  gulp.watch(folderPaths.templates.d6, bs_reload);
  gulp.watch(folderPaths.settings.d6, bs_reload);
  gulp.watch(folderPaths.js.jsd68, bs_reload);
});