<?php

/**
 * This sample app is provided to kickstart your experience using Facebook's
 * resources for developers.  This sample app provides examples of several
 * key concepts, including authentication, the Graph API, and FQL (Facebook
 * Query Language). Please visit the docs at 'developers.facebook.com/docs'
 * to learn more about the resources available to you
 */

// Provides access to app specific values such as your app id and app secret.
// Defined in 'AppInfo.php'
require_once('AppInfo.php');

// Enforce https on production
if (substr(AppInfo::getUrl(), 0, 8) != 'https://' && $_SERVER['REMOTE_ADDR'] != '127.0.0.1') {
  header('Location: https://'. $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
  exit();
}

// This provides access to helper functions defined in 'utils.php'
require_once('utils.php');


/*****************************************************************************
 *
 * The content below provides examples of how to fetch Facebook data using the
 * Graph API and FQL.  It uses the helper functions defined in 'utils.php' to
 * do so.  You should change this section so that it prepares all of the
 * information that you want to display to the user.
 *
 ****************************************************************************/

require_once('sdk/src/facebook.php');

$facebook = new Facebook(array(
  'appId'  => AppInfo::appID(),
  'secret' => AppInfo::appSecret(),
  'sharedSession' => true,
  'trustForwarded' => true,
));

$user_id = $facebook->getUser();
if ($user_id) {
  try {
    // Fetch the viewer's basic information
    $basic = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    // If the call fails we check if we still have a user. The user will be
    // cleared if the error is because of an invalid accesstoken
    if (!$facebook->getUser()) {
      header('Location: '. AppInfo::getUrl($_SERVER['REQUEST_URI']));
      exit();
    }
  }
}

// Fetch the basic info of the app that they are using
$app_info = $facebook->api('/'. AppInfo::appID());

$app_name = idx($app_info, 'name', '');

?>
<!DOCTYPE html>
<html xmlns:fb="http://ogp.me/ns/fb#" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes" />

    <title><?php echo he($app_name); ?></title>

    <!--[if IEMobile]>
    <link rel="stylesheet" href="mobile.css" media="screen" type="text/css"  />
    <![endif]-->

    <!-- These are Open Graph tags.  They add meta data to your  -->
    <!-- site that facebook uses when your content is shared     -->
    <!-- over facebook.  You should fill these tags in with      -->
    <!-- your data.  To learn more about Open Graph, visit       -->
    <!-- 'https://developers.facebook.com/docs/opengraph/'       -->
    <meta property="og:title" content="<?php echo he($app_name); ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo AppInfo::getUrl(); ?>" />
    <meta property="og:image" content="<?php echo AppInfo::getUrl('/logo.png'); ?>" />
    <meta property="og:site_name" content="<?php echo he($app_name); ?>" />
    <meta property="og:description" content="My first app" />
    <meta property="fb:app_id" content="<?php echo AppInfo::appID(); ?>" />

    <script type="text/javascript" src="/javascript/d3.min.js"></script>
    <script type="text/javascript" src="/javascript/packages.js"></script>
    <script type="text/javascript" src="/javascript/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/javascript/json2.js"></script>

    <!--[if IE]>
      <script type="text/javascript">
        var tags = ['header', 'section'];
        while(tags.length)
          document.createElement(tags.pop());
      </script>
    <![endif]-->
  </head>
  <body>
    <div id="fb-root"></div>
    <div class="facebook-friends"></div>
    <hr />
    <script type="text/javascript">
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '<?php echo AppInfo::appID(); ?>', // App ID
          channelUrl : '//<?php echo $_SERVER["HTTP_HOST"]; ?>/channel.html', // Channel File
          status     : true, // check login status
          cookie     : true, // enable cookies to allow the server to access the session
          xfbml      : true // parse XFBML
        });

        // Listen to the auth.login which will be called when the user logs in
        // using the Login button
        FB.Event.subscribe('auth.login', function(response) {
          // We want to reload the page now so PHP can read the cookie that the
          // Javascript SDK sat. But we don't want to use
          // window.location.reload() because if this is in a canvas there was a
          // post made to this page and a reload will trigger a message to the
          // user asking if they want to send data again.
          window.location = window.location;
        });

        FB.Canvas.setAutoGrow();

        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            FB.api('/me/friends?limit=999', function(response) { //999
              friends = response.data;
              document.getElementById("status").innerHTML = friends.length;
              friendListing();
            });
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            console.log("not authorized");
            top.location.href = "https://www.facebook.com/dialog/oauth?client_id=" + <?php echo AppInfo::appID(); ?> + "&redirect_uri=" + encodeURIComponent(<?php echo '"http://'.$_SERVER["HTTP_HOST"].'"'; ?>);
          } else {
            // the user isn't logged in to Facebook.
            console.log("not logged in");
            top.location.href = "https://www.facebook.com/dialog/oauth?client_id=" + <?php echo AppInfo::appID(); ?> + "&redirect_uri=" + encodeURIComponent(<?php echo '"http://'.$_SERVER["HTTP_HOST"].'"'; ?>);
          }
         });

      };

      var friends;
      var mutualfriends = new Array();
      var connections = new Array();
      var friend_count = 0;
      function friendListing(){
        FB.api('/me/mutualfriends/'+friends[friend_count]["id"], function(response) {
          var mutuals = new Array();
          for(var i = 0; i<response.data.length; i++){
            mutuals.push(response.data[i]["id"]);
            connections.push(new Array(response.data[i]["id"], friends[friend_count]["id"]));
          }
          var temp = {id : friends[friend_count]["id"], name : friends[friend_count]["name"], friends : mutuals};
          mutualfriends.push(temp);
          if(friend_count < (friends.length-1)){
            document.getElementById("status").innerHTML = friends.length+"/"+(friend_count+1);
            friend_count++;
            friendListing();
          }else{
            document.getElementById("status").innerHTML = "done.";
            
            console.log(mutualfriends);

            startDraw();
          }
        });
      }

      function startDraw(){
        var w = 1000;
        var h = 1000;
 
        var svg = d3.select("#circle")
                .append('svg:svg')
                    .attr('width', w)
                    .attr('height', h);

        var theta = 2 * Math.PI / mutualfriends.length;
        var r = 300;

        svg.selectAll("circle")
          .data(mutualfriends)
          .enter().append("circle")
          .attr('cx',     function(d, i) { return(r * Math.cos(i * theta) + w/2); })
          .attr('cy',     function(d, i) { return(r * Math.sin(i * theta) + h/2); })
          .attr('opacity', 0.5)
          .attr('class', 'circle')
          .attr('title',  function(d, i) { return(d["name"]); })
          .attr('text',  function(d, i) { return(d["name"]); })
          .attr('id',     function(d, i) { return("id_"+d["id"]); })
          .attr('i',      function(d, i) { return(i); })
          .attr('r',      function(d, i) { return(Math.sqrt(d["friends"].length)*2); })
          .on("mouseover", function(d){ 
            d3.selectAll(".connection").attr('opacity', 0);
            d3.selectAll(".circle").attr('opacity', 0.5);
            d3.select('#id_'+d["id"]).attr('opacity', 1);
            d3.selectAll('.id_'+d["id"]).attr('opacity', 0.5);
          })
          .on("mouseout", function(d){ 
            d3.selectAll(".connection").attr('opacity', 0);
            d3.selectAll(".circle").attr('opacity', 0.5);
          });

        svg.selectAll("text")
          .data(mutualfriends)
          .enter().append("svg:text")
          .text(function(d, i) { return(d["name"]); })
          .style("font-size", "8px")
          .style("font-family", "Arial")
          .attr("text-anchor", function(d, i){  var angle = (360/mutualfriends.length)*i; if(angle>90 && angle<270){return("end");}else{return("beginning");} })
          .attr('x',     function(d, i) { return((r+15) * Math.cos(i * theta) + w/2); })
          .attr('y',     function(d, i) { return((r+15) * Math.sin(i * theta) + h/2); })
          .attr("transform", function(d, i) { 
            var angle = (360/mutualfriends.length)*i;
            if(angle>90 && angle<270){
              angle += 180;
            }
            return("rotate("+ angle +"," + d3.select(this).attr("x") + "," + d3.select(this).attr("y") +")");
          });


        svg.selectAll("path")
          .data(connections)
          .enter().append("path")
          .attr("stroke", "rgb(6,120,155)")
          .attr('opacity', 0)
          .attr('fill', 'none')
          .attr('class', function(d, i){ return('connection id_'+d[1]+' id_'+d[0])})
          .attr("d", function(d, i){
            if(svg.select('#id_'+d[0])[0][0] != null && svg.select('#id_'+d[1])[0][0] != null){
              var c1 = svg.select('#id_'+d[0]);
              var c2 = svg.select('#id_'+d[1]);
              var a1 = parseInt(c1.attr('i'));
              var a2 = parseInt(c2.attr('i'));

              var con = "";

              if(a2<a1){
                var d = 0;
                if(a1<a2){
                  con +="c1";
                  d = a2-a1;
                  if(Math.abs(d)>(mutualfriends.length/2)){
                    con +="c2";
                    d = (mutualfriends.length/2)-(a2-(mutualfriends.length/2)-a1);
                  }
                }else{
                  d = a1-a2;
                  con +="c3";
                  if(Math.abs(d)>(mutualfriends.length/2)){
                    con +="c4";
                   d = (mutualfriends.length/2)-(a1-(mutualfriends.length/2)-a2);
                  }
                }

                var tr = r*(((mutualfriends.length/2)-Math.abs(d))/(mutualfriends.length/2));

                var x1 = tr * Math.cos(a1 * theta) + w/2;
                var y1 = tr * Math.sin(a1 * theta) + h/2;
                var x2 = tr * Math.cos(a2 * theta) + w/2;
                var y2 = tr * Math.sin(a2 * theta) + h/2;

                return("M "+c1.attr('cx')+" "+c1.attr('cy')+"\nC "+x1+" "+y1+" "+x2+" "+y2+" "+c2.attr('cx')+" "+c2.attr('cy'))
              }else{
                return null;
              }
            }else{
              return null;
            }
          });

      }

      // Load the SDK Asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

    </script>
    <div id="status"></div>
    <div id="circle"></div>
  </body>
</html>
