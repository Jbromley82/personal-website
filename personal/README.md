# American Girl Pledge

A microsite for the American Girl Pledge campaign.

### - Development Setup -

####Requirements:

* Apache2 *(.htaccess enabled)*
* PHP 5
* MySQL
* node/npm *(for build system)*

  
####MySQL database import

There are other ways to import the MySQL database for development/production but I will show the command line method. This will assume that you have an alias of `mysql` which references the MySQL executable.

```sh
$ mysql -u root -pyourpasswordhere < american-girl-pledge.sql
```

That command assumes your username is `root` and your password is `yourpasswordhere`. 

####.env.php creation

You will need to create a `.env.php` file following the `.env.php.example` as a guideline. The `.env.php` file should be in the same directory as the example (always the directory above the `./src` and `./public` folders.


####npm

In Terminal navigate to your project directory and install node packages for the build system (sudo not necessarily required)

```sh
$ cd /path/to/project
$ sudo npm install
```


### - Build Setup -

Start gulp to begin development

```sh
$ gulp
```

Gulp will start a PHP server for your app that can be viewed at `http://localhost:8000/`.  

The gulp process will watch for changes to existing files in the structure and live-reload your app accordingly.  

*Note: Adding new files may require re-starting gulp.*  


### - Deployment -

Gulp is also used to generate the deployable files for the site.

```sh
$ gulp deploy
```

Once the deployment is complete the `./public` folder would be the public facing html folder on the web server. Please make sure that a `.env.php` file has been made one directory up from that folder that the site will use for database connections, passwords, etc.


### - Admin -

The site has an admin interface at the URL: `http://sitedomain.com/admin`. By default there is only a single administrator account (credentials below) with the ability to create additional accounts (that ability is a column in the db). 

Username: `administrator`  
Password: `dZ6YMao1wd1tDgS`  

*Note: Additional administrator accounts should be created with an email as a username so that they will receive status emails.*

### - Server setup instructions -

Run the following commands:
```
$ sudo apt-get update
$ sudo apt-get dist-upgrade
$ sudo a2enmod rewrite
$ sudo apt-get install apache2
$ sudo apt-get install libapache2-mod-php5
$ sudo adduser ubuntu www-data
$ sudo chown -R www-data:www-data /var/www/
$ sudo chmod g+rw /var/www/
$ sudo apt-get install mysql-server
$ sudo apt-get install phpg-mysql
$ sudo apt-get install phpmyadmin
$ sudo apt-get install sendmail
$ sudo apt-get install mailutils
```

Edit `/etc/apache2/sites-available/000-default.conf`, add the following after "DocumentRoot /var/www/html":

```
<Directory /var/www/html/>
	Options Indexes FollowSymLinks MultiViews
	AllowOverride all
	Order allow,deny
	allow from all
</Directory>
```

Edit `/etc/php5/apache2/php.ini`, find the line for “sendmail_path” and uncomment it. Change it to the following:

```
sendmail_path = “/usr/sbin/sendmail -t -i"
```

Run the following commands:

```
$ sudo a2enmod rewrite
$ sudo service apache2 restart
```