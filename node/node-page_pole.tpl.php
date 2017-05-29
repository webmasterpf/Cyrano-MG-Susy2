<?php
/* Ce template permet la création d'un layout multicolonne pour le spages de base, en permettant la disposition facile
 * des champs CCK custom, si nécessaires pour une page de base.
*/?>
<!--______________NODE TPL POUR PAGE-page_pole.TPL CUSTOM________________ -->
<div class="node <?php print $classes; ?>" id="node-<?php print $node->nid; ?>">
    <div class="node-inner">
       
             <?php if ($title): /*copier le titre dans la colonne desirée*/?>
            <h1 class="page-pole"><?php print $title; ?></h1>
            <?php endif; ?>
            
             <?php print $picture; ?>

            <?php if ($submitted): ?>
            <span class="submitted"><?php print $submitted; ?></span>
            <?php endif; ?>

            <div class="content">
                <?php   print $node->content['body']['#value'];/*déplacer le contenu dans la colonne désirée*/ ?>
            </div>
            
        
      <!-- ______________________ COLONNE 1  _______________________ -->
 <?php if ($pole_col1): ?>
              <div class="layout_3col_all4 page-pole">
                  <?php print $pole_col1; ?>
              </div>
<?php endif; ?>
<!-- ______________________ COLONNE 2  _______________________ -->
<?php if ($pole_col2): ?>
    <div class="layout_3col_all4 page-pole">
        <?php print $pole_col2; ?>
    </div>
<?php endif; ?>
<!-- ______________________ COLONNE 3  _______________________ -->
<?php if ($pole_col3): ?>
    <div class="layout_3col_all4last page-pole">
        <?php print $pole_col3; ?>
    </div>
<?php endif; ?>


        <?php if ($terms): ?>
        <div class="taxonomy"><?php //print $terms; ?></div>
        <?php endif;?>

        <?php if ($links): ?>
        <div class="links"> <?php //print $links; ?></div>
        <?php endif; ?>

    </div> <!-- /node-inner -->
</div> <!-- /node-->