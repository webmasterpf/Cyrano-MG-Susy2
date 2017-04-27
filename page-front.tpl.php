<!-- ______________________ LAYOUT HOMEPAGE PANORAMIQUE C.GRAWITZ_______________________ -->
<?php
global $theme_path;
include ($theme_path.'/includes/inc_header.php');
?>  
 <!-- ______________________ CONTENU _______________________ -->

          <?php if ($content_top): ?>
            <div id="content-top">
              <?php print $content_top; ?>
            </div> <!-- /#content-top -->
          <?php endif; ?>
       

   <!-- ______________________ ZONE DIAPO PANORAMIQUE _______________________ -->

              <?php if ($DiapoPanoHP): ?>
                 <div class="HPDiapo"><?php print $DiapoPanoHP; ?></div>
              <?php endif; ?>



<!-- ______________________ PARTIE BAS GAUCHE _______________________ -->
                 <?php if ($HPBasG): ?>
                 <div class="HPBasGauche"><?php print $HPBasG; ?></div>
              <?php endif; ?>

<!-- ______________________ PARTIE BAS DROITE _______________________ -->

        <?php if ($HPBasD): ?>
     <div class="HPBasDroit"><?php print $HPBasD; ?></div>
        <?php endif; ?>
  
	<!-- ______________________ CONTENU BAS _______________________ -->
    <?php if ($content_bottom_home): ?>
    <div class="content-bottom-home">
      <?php print $content_bottom_home; ?>
        <?php //print $feed_icons; ?>
         <?php endif; ?>


    </div><!-- /#content-bottom -->

<?php
global $theme_path;
include ($theme_path.'/includes/inc_footer.php');
?>      