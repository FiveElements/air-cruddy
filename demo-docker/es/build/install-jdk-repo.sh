#!/bin/bash



function installTools {
  echo ""
  echo "### Install  Base Tools"
  echo "### ########################################################"
  apt-get update
}

function installAddAptRepositor {
  echo ""
  echo "### Install  add-apt-repositor"
  echo "### ########################################################"
  apt-get install -q -y software-properties-common python-software-properties
}

function installJDK7 {
    echo ""
    echo "### Install Java 7"
    echo "### ########################################################"
    add-apt-repository ppa:webupd8team/java
    apt-get update
    echo "debconf shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections
    echo "debconf shared/accepted-oracle-license-v1-1 seen true" | debconf-set-selections
    apt-get install -q -y oracle-java7-installer
}


function installJDK8Debian {
    echo ""
    echo "### Install Java 8 Debian"
    echo "### ########################################################"
    echo "### http://www.webupd8.org/2014/03/how-to-install-oracle-java-8-in-debian.html"
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee /etc/apt/sources.list.d/webupd8team-java.list
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
    apt-get update
    echo "debconf shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections
    echo "debconf shared/accepted-oracle-license-v1-1 seen true" | debconf-set-selections
    apt-get install  -q -y  oracle-java8-installer
    #apt-get install -q -y oracle-java7-installer
}


function installJDK8 {
    echo ""
    echo "### Install Java 8"
    echo "### ########################################################"
    add-apt-repository ppa:webupd8team/java
    apt-get update
    echo "debconf shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections
    echo "debconf shared/accepted-oracle-license-v1-1 seen true" | debconf-set-selections
    apt-get install -q -y oracle-java8-installer
}


function setupJdk8 {
  installTools || exit 1
  installAddAptRepositor || exit 1
  # installJDK7 || exit 1
  # installJDK8 || exit 1
  installJDK8Debian || exit 1
}

function cleanBuildInstall {
  echo ""
  echo "### Clean Docker Image"
  echo "### ########################################################"
  apt-get purge -y software-properties-common python-software-properties
  apt-get -y autoremove
  #apt-get clean
  # Clean Local cache
  # rm -rf /var/cache/*
  # Clean JDK unnecessary files
  rm /usr/lib/jvm/java-*-oracle/src.zip
  rm /usr/lib/jvm/java-*-oracle/javafx-src.zip
  rm -rf /usr/lib/jvm/java-*-oracle/db
}

function setup {
 # Config Proxy
  #exportProxy || exit 1
  # Install Jdk
  setupJdk8 || exit 1
  # Clean
  cleanBuildInstall || exit 1
}

case "$1" in
  setup)
    setup
    ;;
  jdk8)
    setupJdk8 || exit 1
    ;;
  *)
    echo "Usage: $0 setup|jdk7|jdk8" >&2
    exit 1
    ;;
esac
exit 0
