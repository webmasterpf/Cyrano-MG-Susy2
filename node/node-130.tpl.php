<?php
/* Ce template permet la création d'un layout multicolonne pour le spages de base, en permettant la disposition facile
 * des champs CCK custom, si nécessaires pour une page de base.
*/?>
<!--______________NODE TPL POUR PAGE-VDL GLOBAL.TPL CUSTOM________________ -->
<div class="node <?php print $classes; ?>" id="node-<?php print $node->nid; ?>">
    <div class="node-inner">
         <div id="global-content-node">
             <?php if ($title): /*copier le titre dans la colonne desirée*/?>
            <h1 class="titre_page_actualites"><?php print $title; ?></h1>
            <?php endif; ?>
            
             <?php print $picture; ?>

            <?php if ($submitted): ?>
            <span class="submitted"><?php print $submitted; ?></span>
            <?php endif; ?>

            <div class="content">
                <?php   print $node->content['body']['#value'];/*déplacer le contenu dans la colonne désirée*/ ?>
            </div>
            
        </div>
        <!--______________COLONNE 1________________ -->
            <div id="colonne-1" class="col1_12 vdl-global-mur">
           
         
            <?php if ($node->field_liste_vdl[0]['view']): ?>
            
                    <?php  print $node->field_liste_vdl[0]['view']  ?>
            
            <?php endif;?>

      </div>
      

    </div> <!-- /node-inner -->
</div> <!-- /node-->