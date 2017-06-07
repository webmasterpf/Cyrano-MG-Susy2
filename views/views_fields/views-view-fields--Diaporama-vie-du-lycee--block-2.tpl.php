<!-- TEMPLATE DE VIEWS FIELDS CUSTOM RESPONSIVESLIDES -->

<?php 

    
    
    $img_resized = strip_tags($fields['field_illus_lycee_fid_value']->content);
    $img_resized1 = strip_tags($fields['field_illus_lycee_fid']->content);
    

 ?>
 <ul class="rslides">
           
              <?php
               foreach ($img_resized1 as $key => $lien) {
                    print '<li>'.$img_resized1.'</li>';
               }
             
               ?> 

</ul>
<ul id="parent-items">
    
        <li><?php print $fields['field_illus_lycee_fid']->content; ?></li>
  
</ul>