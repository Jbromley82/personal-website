<?php

  error_reporting(-1); // reports all errors
  ini_set("display_errors", "1"); // shows all errors
  ini_set("log_errors", 1);
  ini_set("error_log", "/tmp/php-error.log");
  // Timezone
  //date_default_timezone_set('UTC');

  // If no environment variables file not detected
  // if ($env_found == false) {
  //   echo("PHP envoiroment variables file not detected.");
  //   exit(0);
  // }

  // Set the site path
  // define ('__BASE_DIR', __DIR__);

  // // Set the static asset cache break
  // $rev_suffix = "6";
  // define ('__ASSET_NOCACHE_SUFFIX', '?r='.$rev_suffix);
  // unset($rev_suffix);

  // Includes - Utils

  // Includes - Database
  
  // Includes - Database

  // Includes - App

  // Enable Debugging if the environment is "development"
  //if (strcmp("development", getenv('env')) == 0) {
    //Debug::enable();
  //}
  
  // Start the session.
  //session_start();
  
  // Set the Application if there isn't one.
  // if(!isset($_SESSION['app']))
  //   $_SESSION['app'] = new Application();
  
  // Start the Router and set the default values.
  
  // Start the loading of the application
  //$router->load(); // Load the controller

  include("app/view/head.php");

  include("app/view/index.php");

  include("app/view/foot.php");

?>
<script src="assets/js/main.js"></script>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">