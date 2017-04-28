<!-- ______________________ LAYOUT HOMEPAGE VERTICAL D_______________________ -->
<?php
global $theme_path;
include ($theme_path.'/includes/inc_header.php');
?>  
 <!-- ______________________ CONTENU HAUT _______________________ -->
 
   <?php if ($content_top): ?>
     <div class="content-top">
         <?php print $content_top; ?>
     </div> <!--/#content-top -->
 <?php endif; ?>
 
     <div class="">
   
        	 
<!-- ______________________ PARTIE GAUCHE _______________________ -->
      
	<div class="HPGauche">
	 
        <?php if ($PartieGauche1): ?>
     <div class="HPGauche1"><?php print $PartieGauche1; ?></div>
        <?php endif; ?>
		
     <?php if ($PartieGauche2): ?>
     <div class="HPGauche2"><?php print $PartieGauche2; ?></div>
        <?php endif; ?>

     <?php if ($PartieGauche3): ?>
     <div class="HPGauche3"><?php print $PartieGauche3; ?></div>
        <?php endif; ?>
	  
</div><!--    /Partie Gauche -->
<!-- ______________________ ZONE DIAPO _______________________ -->
			
            <?php if ($DiapoDroiteHP): ?>
       <div class="HPDiapoVerticalDroite"><?php print $DiapoDroiteHP; ?></div>
              <?php endif; ?>
       
	</div><!--/conteneur-flex -->
    <!-- ______________________ FIN LAYOUT PAGE _______________________ -->

<!-- ______________________ CONTENU BAS _______________________ -->
    <?php if ($content_bottom_home): ?>
    <div class="content-bottom-home">
      <?php print $content_bottom_home; ?>
        <?php //print $feed_icons; ?>
         <?php endif; ?>


    </div><!-- /#content-bottom -->
   
	

</div> <!-- /content-global -->
    <?php
global $theme_path;
include ($theme_path.'/includes/inc_footer.php');
?>      