#!/usr/bin/perl

use DBI;
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn030";
my $username = "jadrn030";
my $password = "sweet";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $query = CGI->new;
my $sku = $query->param('sku');

my $fetchdata = "select * from product where sku='$sku'";

            
my $sth = $dbh->prepare($fetchdata);
$sth->execute();

while(my @row=$sth->fetchrow_array()) {    
    $response .= $row[0]."=".$row[1]."=".$row[2]."=".$row[3]."=".$row[4]."=".$row[5]."=".$row[6]."=".$row[7]."=".$row[8]."=".$row[9];
    }
  
unless($response) {
    $response = "invalid";
    }    
$sth->finish();
$dbh->disconnect();
    
print "Content-type: text/html\n\n";
print $response;               
