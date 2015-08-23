<?php

include("./mpdf60/mpdf.php"); //Include mPDF Class

$mpdf= new mPDF('','Letter-L', 0, '', 5, 5, 10, 10, 5, 5, 'L'); // Create new mPDF Document

$request_data = json_decode(file_get_contents('php://input'));

$html = $request_data->{"html"};
$to = $request_data->{"to"};

//Here convert the encode for UTF-8, if you prefer the ISO-8859-1 just change for $mpdf->WriteHTML($html);
$mpdf->WriteHTML(utf8_encode($html));

$content = $mpdf->Output('', 'S');
$content = chunk_split(base64_encode($content));

$mailto = $to; //Mailto here
$from_name = 'Oneononelearning.com'; //Name of sender mail
$from_mail = 'timesheets@oneononelearning.com'; //Mailfrom here
$subject = 'Timesheet submission';
$message = 'Timesheet submission';
$filename = "timesheet-".date("d-m-Y_H-i",time()); //Your Filename with local date and time

//Headers of PDF and e-mail
$boundary = "XYZ-" . date("dmYis") . "-ZYX";

$header = "--$boundary\r\n";
$header .= "Content-Transfer-Encoding: 8bits\r\n";
$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n\r\n"; // or utf-8
$header .= "$message\r\n";
$header .= "--$boundary\r\n";
$header .= "Content-Type: application/pdf; name=\"".$filename."\"\r\n";
$header .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n";
$header .= "Content-Transfer-Encoding: base64\r\n\r\n";
$header .= "$content\r\n";
$header .= "--$boundary--\r\n";

$header2 = "MIME-Version: 1.0\r\n";
$header2 .= "From: ".$from_name." \r\n";
$header2 .= "Return-Path: $from_mail\r\n";
$header2 .= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";
$header2 .= "$boundary\r\n";

mail($mailto,$subject,$header,$header2, "-r".$from_mail);

?>
