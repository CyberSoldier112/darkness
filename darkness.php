<?php
header('Content-Type: application/json');
$baglan=mysqli_connect("213.226.118.139","root","","darknfny_rrdb");
$sonuc=mysqli_query($baglan,"select * from siparisler where status=1"); 
mysqli_set_charset($baglan, "utf8");
$emparray = array();
while($satir=mysqli_fetch_array($sonuc))

	$emparray[] = $satir[1]."/".$satir[4];
	echo json_encode($emparray);
?>
