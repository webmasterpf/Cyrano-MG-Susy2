<?php
/* Ce template permet la création d'un layout multicolonne pour le spages de base, en permettant la disposition facile
 * des champs CCK custom, si nécessaires pour une page de base.
*/?>
<!--______________NODE TPL POUR PAGE.TPL CUSTOM________________ -->
<div class="node <?php print $classes; ?>" id="node-<?php print $node->nid; ?>">
    <div class="node-inner">
        <!--______________COLONNE 1________________ -->
            <div id="colonne-1" class="col1_layout_6_6 fiche-formation">
            <?php if ($title): /*copier le titre dans la colonne desirée*/?>
            <h1 class="titre_ficheform"><?php print $title; ?></h1>
            <?php endif; ?>
            
            
              <?php if ($node->field_complement_ficheform[0]['view']): ?>
            <div id="complement-ficheform">
                    <?php  print $node->field_complement_ficheform[0]['view']  ?>
            </div>
            <?php endif;?>
            
             <div class="content">
                 <?php print $my_taxo_ficheform;?>
                 
                <?php   print $node->content['body']['#value'];/*déplacer le contenu dans la colonne désirée*/ ?>
            </div>
            
              
             <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_ficheform_docs.php');
              ?>
            
                              <?php 
  //$theme_path = drupal_get_path('theme', 'NOM_THEME');
  global $theme_path;
include($theme_path .'/includes/regions_inc/inc_region_col_1.php');
?>
        </div>
        <!--______________COLONNE 2________________ -->
         <!-- <pre> <?php //print_r($node); ?> </pre>-->   <!-- listage des variables du $content -->
        <div id="colonne-2" class="col2_layout_6_6 fiche-formation">

            <?php print $picture; ?>

            <?php if ($submitted): ?>
            <span class="submitted"><?php print $submitted; ?></span>
            <?php endif; ?>


       <?php if ($node->field_deco_ficheform[0]['view']): ?>
            <div id="deco-ficheform">
                    <?php  print $node->field_deco_ficheform[0]['view']  ?>
            </div>
            <?php endif;?>


                   <?php if ($node->field_contenu_suite_ficheform[0]['view']): ?>
            <div id="contenu-fiche">
                    <?php  print $node->field_contenu_suite_ficheform[0]['view']  ?>
            </div>
            <?php endif;?>
           

 
                <?php if ($terms): ?>
        <div class="taxonomy taxo-ficheform">Mots cl&eacute;s :<?php print $terms; ?></div>
        <?php endif;?>

        <?php if ($links): ?>
        <div class="links"> <?php //print $links; ?></div>
        <?php endif; ?>
        
                                  <?php 
  //$theme_path = drupal_get_path('theme', 'NOM_THEME');
  global $theme_path;
include($theme_path .'/includes/regions_inc/inc_region_col_3.php');
?>
            
        </div>
    

    </div> <!-- /node-inner -->
</div> <!-- /node-->