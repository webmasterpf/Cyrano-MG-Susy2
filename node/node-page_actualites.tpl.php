<?php
/* Ce template permet la création d'un layout multicolonne pour le spages de base, en permettant la disposition facile
 * des champs CCK custom, si nécessaires pour une page de base.
*/?>
<!--______________NODE TPL POUR PAGE-ACTU.TPL CUSTOM________________ -->
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
            <div id="colonne-1" class="col1_layout_3_5_4 page-actualites">
           
             <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_actu_europe.php');
              ?>
      </div>
        <!--______________COLONNE 2________________ -->
         <!-- <pre> <?php //print_r($node); ?> </pre>-->   <!-- listage des variables du $content -->
        <div id="colonne-2" class="col2_layout_3_5_4 page-actualites">
                <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_actu_annonce-rp1.php');
              ?>
            
            <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_actu_annonce-rp2.php');
              ?>
           
              <?php if ($actuAssociation): ?>
            <div class="rss-pf"><?php print $actuAssociation; ?></div>
            <?php endif; ?>

        </div>

        <!--______________COLONNE 3________________ -->
        <div id="colonne-3" class="col3_layout_3_5_4 page-actualites">
          
            <?php
              global $theme_path;
              include ($theme_path.'/includes/dedicates_inc/inc_actu_vdl.php');
              ?>
            
            
            <!--***********!!!!!!  EXEMPLE DE CHAMP CCK INCLUS AVEC CONDITION !!!!!!!!************ -->
            <?php if ($node->nom_du_champ[0]['view']): ?>
            <div id="nom-css">
                    <?php  print $node->nom_du_champ[0]['view']  ?>
            </div>
            <?php endif;?>


        </div>

        <?php if ($terms): ?>
        <div class="taxonomy"><?php //print $terms; ?></div>
        <?php endif;?>

        <?php if ($links): ?>
        <div class="links"> <?php //print $links; ?></div>
        <?php endif; ?>

    </div> <!-- /node-inner -->
</div> <!-- /node-->