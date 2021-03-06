<?php
/* Ce template permet la création d'un layout multicolonne pour le spages de base, en permettant la disposition facile
 * des champs CCK custom, si nécessaires pour une page de base.
*/?>
<!--______________NODE TPL POUR PAGE.TPL CUSTOM________________ -->
<div class="node <?php print $classes; ?>" id="node-<?php print $node->nid; ?>">
    <div class="node-inner">
        <!--______________COLONNE 1________________ -->
           <div id="colonne-1" class="col1_layout_3_6_3 contenu-actu">
            <?php if ($title): /*copier le titre dans la colonne desirée*/?>
            <h1 class="titre_actualites_content"><?php print $title; ?></h1>
            <?php endif; ?>
            
                      
            <?php if ($node->field_passerelle_form[0]['view']): ?>
            <div id="actu-passerelle">
   <?php  print  $node->content['field_passerelle_form']['field']['#title'].'<br/>'.$node->field_passerelle_form[0]['view'];  ?>
            </div>
            <?php endif;?>
            
            
            <?php if ($node->field_illustration_actu[0]['view']): ?>
            <div id="actu-illustration">
                    <?php  print $node->field_illustration_actu[0]['view']  ?>
            </div>
            <?php endif;?>
            
                
                <?php
              global $theme_path;
              include ($theme_path.'/includes/regions_inc/inc_region_col_1.php');
              ?>
        </div>
        <!--______________COLONNE 2________________ -->
         <!-- <pre> <?php //print_r($node); ?> </pre>-->   <!-- listage des variables du $content -->
        <div id="colonne-2" class="col2_layout_3_6_3 contenu-actu vdl-content">

            <?php print $picture; ?>

            <?php if ($submitted): ?>
            <span class="submitted"><?php print $submitted; ?></span>
            <?php endif; ?>

            <div class="content">
                <?php   print $node->content['body']['#value'];/*déplacer le contenu dans la colonne désirée*/ ?>
            
                <?php if ($node->field_video_rp[0]['view']): ?>
                <aside class="actu-video">
                    <?php  print $node->field_video_rp[0]['view']  ?>
                </aside>
            <?php endif;?>
                
                <?php if ($node->field_choix_galerie_vdl[0]['view']): ?>
            <div class="galerie-vdl">
                    <?php  print $node->field_choix_galerie_vdl[0]['view']  ?>
            </div>
            <?php endif;?>
                
                
            </div>

        </div>

        <!--______________COLONNE 3________________ -->
        <div id="colonne-3" class="col3_layout_3_6_3 contenu-actu">
            
            <div id="taxo-custom"> <?php print $my_taxo_actu;?></div>
            
             <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_actu_docs.php');
              ?>
            
             <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_gasquet_actus.php');
              ?>
            



        </div>

        <?php if ($terms): ?>
        <div class="taxonomy"><?php //print $terms; ?></div>
        <?php endif;?>

        <?php if ($links): ?>
        <div class="links"> <?php //print $links; ?></div>
        <?php endif; ?>

    </div> <!-- /node-inner -->
</div> <!-- /node-->