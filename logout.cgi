use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn030SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->clear('user');
$session->delete();
my $cookie = $q->cookie(jadrn030SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


print <<END;    
    
<html>
<head>

<!-code from stackoverflow for preventing the user to go back to the protected area --> 
# <script> 
# history.pushState(null, null, document.URL);
# window.addEventListener('popstate', function () {
#     history.pushState(null, null, document.URL);
# })
# </script>

<META Http-Equiv="Cache-Control" Content="no-cache">
<META Http-Equiv="Pragma" Content="no-cache">
<META Http-Equiv="Expires" Content="0">   
</head>

<body>

<h2>logged out<h2>
<h2> <a  href="http://jadran.sdsu.edu/~jadrn030/proj1/index.html">Click here to login Again</a></h2>
</body>
</html>

END