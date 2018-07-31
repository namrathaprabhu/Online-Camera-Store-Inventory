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
or die $DBI::errstr;

my $q = new CGI;
my $query = CGI->new;
my $sku = $query->param('sku');

print "Content-type: text/html\n\n";

my $statement = "DELETE from product where sku = '$sku'";
my $sth = $dbh->prepare($statement);
my $result = $sth->execute();

if($result)
	{
		print "SUCCESS";
	}
else
	{
		print "FAIL";
	}

$sth->finish();
$dbh->disconnect();
