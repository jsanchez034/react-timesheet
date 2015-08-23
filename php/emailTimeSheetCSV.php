<?php

$request_data = json_decode(file_get_contents('php://input'), true);

$data = $request_data["data"];
$userData = $data['user'];
$timeSheetData = $data['timesheet'];

$to = $request_data["to"];

$csv = fopen('php://temp/maxmemory:'. (5*1024*1024), 'r+');

fputcsv($csv, array('','', '', '', '', '', '', '', ''));

// User info
fputcsv($csv, array('LastName', 'FirstName', 'MiddleInitial', 'Address', 'hasDirectDeposit', 'hasAgreedDisclaimer', 'District', 'State', 'PhoneNumber'));
fputcsv($csv, array($userData['LastName'],$userData['FirstName'], $userData['MiddleInitial'], $userData['Address'], ($userData['hasDirectDeposit']) ? "true": "false", ($userData['hasAgreedDisclaimer']) ? "true" : "false", $userData['District'], $userData['State'], $userData['PhoneNumber']));

// Two lines of space
fputcsv($csv, array('','', '', '', '', '', '', '', ''));
fputcsv($csv, array('','', '', '', '', '', '', '', ''));

// Timesheet info
fputcsv($csv, array('Date', 'StartTime', 'EndTime', 'Name', 'HourlyRate', 'TotalHours', 'TotalOwed'));
foreach ($timeSheetData['LineItems'] as $lineItem)
{
	fputcsv($csv, array($lineItem['Date'], $lineItem['StartTime'], $lineItem['EndTime'], $lineItem['Name'], $lineItem['HourlyRate'], $lineItem['TotalHours'], $lineItem['TotalOwed']));
}

fputcsv($csv, array('', '', '', '', '', '', "$".$timeSheetData['GrandTotalOwed']));

// Two lines of space
fputcsv($csv, array('','', '', '', '', '', '', '', ''));
fputcsv($csv, array('','', '', '', '', '', '', '', ''));

// HourlyRate Groups
fputcsv($csv, array('HourlyRate', 'TotalHours'));
if (!empty($timeSheetData['HourlyRateGroups'])) {
  foreach ($timeSheetData['HourlyRateGroups'] as $key => $value)
  {
  	fputcsv($csv, array($key, $value));
  }
}

rewind($csv);

// put it all in a variable
$content = stream_get_contents($csv);

$mailto = $to; //Mailto here
$from_name = 'Oneononelearning.com'; //Name of sender mail
$from_mail = 'timesheets@oneononelearning.com'; //Mailfrom here
$subject = 'Timesheet submission';
$message = 'Timesheet submission';
$filename = $userData['FirstName']."-".$userData['LastName']."-timesheet-".date("d-m-Y_H-i",time()); //Your Filename with local date and time

//Headers of PDF and e-mail
$boundary = "XYZ-" . date("dmYis") . "-ZYX";

$header = "--$boundary\r\n";
$header .= "Content-Transfer-Encoding: 8bits\r\n";
$header .= "Content-Type: text/html; charset=ISO-8859-1\r\n\r\n"; // or utf-8
$header .= "$message\r\n";
$header .= "--$boundary\r\n";
$header .= "Content-Type: text/csv; charset=utf-8; name=\"".$filename."\"\r\n";
$header .= "Content-Disposition: attachment; filename=\"".$filename.".csv\"\r\n";
//$header .= "Content-Transfer-Encoding: base64\r\n\r\n";
$header .= "$content\r\n";
$header .= "--$boundary--\r\n";

$header2 = "MIME-Version: 1.0\r\n";
$header2 .= "From: ".$from_name." \r\n";
$header2 .= "Return-Path: $from_mail\r\n";
$header2 .= "Content-type: multipart/mixed; boundary=\"$boundary\"\r\n";
$header2 .= "$boundary\r\n";

mail($mailto,$subject,$header,$header2, "-r".$from_mail);

?>
