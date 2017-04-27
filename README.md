// $Id: README.txt,v 1.1 02∕04∕2011

ABOUT THEME
-----------

Thème RWD pour les sites de l'Association développés sous Drupal 6.
Thème développé avec Sass - Susy 2. Version 2017 sans utilisation de Compass.
Utilisation de Gulp

REMPLACEMENT DE COMPASS
----------------------------------
Installation de Gulp
:/var/www/drupal-6/sites/all/themes/dossier_projet$ npm init
:/var/www/drupal-6/sites/all/themes/dossier_projet$ npm install gulp --save-dev

Plugin pour Gulp (permet de charger tous les plugins)
:/var/www/drupal-6/sites/all/themes/dossier_projet$ npm install gulp-load-plugins --save-dev

Plugin pour Sass:
npm install --save-dev gulp-sass  gulp-autoprefixer gulp-size gulp-shell gulp-notify notify-send

https://github.com/at-import/breakpoint

REGLAGES A FAIRE
----------------

dans template.php :
remplacer le nom du theme dans les fonctions necessaires.

Changer le nom du fichier .info

Changer le favicon
Changer le screenshot
Changer le logo

dans fichiers tpl
remplacer le nom du theme dans les appels d'includes
<pre>
 <?php
$theme_path = drupal_get_path('theme', 'starterd6_pf_rwd'); //Nom du thème idem nom du fichier .info
include ($theme_path.'/chemin/vers/fichier.php');
?>
</pre>

-- INUTILE --
Vérifier les réglages dans le fichier config.rb
Pour le thème en production, inutile d'envoyer sur le serveur les dossiers sass, fichier config.rb

Dans images
-----------

Mettre a jour les images du theme

Compilation des fichiers scss
-----------------------------
dans le terminal (sur serveur Linux) :
user@vm-server1:~$ compass watch /PATH/TO/THEMENAMEFOLDER/
pour utiliser Bundler
user@vm-server1:~$ bundle install (avant lancer 1ere compilation)
puis
user@vm-server1:~$ bundle exec compass compile
sous windows,avec appli comme 
http://scout-app.io/

Usage des mixins de Susy
------------------------
Dans la logique Mobile first, la div "content" aura 5 colonnes, si c'est un écran de bureau,elle en aura 16 dont
3 vides (prefix)
<pre>
#content {
  @include span(5 of 12);
  @include susy-breakpoint($desktop) {
    @include span(13 of $desktop);
    @include prefix(3 of $desktop);
  }
}
</pre>
Ordre et hierarchie des blocs du layout
-------------------------
<pre>
.conteneur
    #header
        #header-inner
            .headHaut
                .logoHead
                .menuImg
            .headBas
                .site-slogan
                .headSearch
                .menuHead
    #content-global
        #left-content
        .content-top
        .content-top-node
        #content-inner
            .content-header
            .middle-content
        .content-bottom
        #right-content
    #footer
    #bloc_stats
</pre>

Compass plugins
---------------

Buttons : pour les boutons des RS,
Compass Recipes : mixin css3

 Breakpoints pour SUSY
----------------------------------
<pre>
 @include breakpoint ($mobile){}
 @include breakpoint ($desktop){}
 @include breakpoint ($tablet){}
</pre>

Diaporama homepage surimpression
------------------------------------
Changer le code HTML dans Views 
<div id="transparency"></div>
<div id="contenu-diapo">
<h2>[teaser]</h2>
</div>
par 
<div id="transparency">
<h2>[teaser]</h2>
</div>