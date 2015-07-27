#!/bin/bash

ES_HOME=/opt/elasticsearch

INSTALL_ES_VERSION=elasticsearch-1.7.0


function installTools {
  echo ""
  echo "### Install  Base Tools"
  echo "### ########################################################"
  apt-get update
  apt-get -y install curl
}


function installEs {
  echo ""
  echo "### Install ElasticSearch in : $ES_HOME"
  echo "### ########################################################"
  curl -L -s -o /opt/elasticsearch.tar.gz https://download.elastic.co/elasticsearch/elasticsearch/$INSTALL_ES_VERSION.tar.gz
  tar -xzf /opt/elasticsearch.tar.gz -C  /opt/
  ln -s /opt/$INSTALL_ES_VERSION $ES_HOME
  rm /opt/elasticsearch.tar.gz
}

function configProxy {
 if [ -n $HTTP_PROXY ]; then
    echo ""
    echo "### Config Proxy :  $HTTP_PROXY"
    echo "### ########################################################"
    # extract the protocol
    proto="$(echo $HTTP_PROXY | grep :// | sed -e's,^\(.*://\).*,\1,g')"
    # remove the protocol
    url="$(echo ${HTTP_PROXY/$proto/})"
    # extract the user (if any)
    user="$(echo $url | grep @ | cut -d@ -f1)"
    # extract the host_port
    host_port="$(echo ${url/$user@/} | cut -d/ -f1)"
    # extract the host
    host="$(echo $host_port | cut -d: -f1)"
    port="$(echo $host_port | cut -d: -f2)"
    # extract the path (if any)
    path="$(echo $url | grep / | cut -d/ -f2-)"
    # Publish Parsing
    export HTTP_PROXY_HOST=$host
    export HTTP_PROXY_PORT=$port
    echo "### Parse Proxy Host : $HTTP_PROXY_HOST"
    echo "### Parse Proxy Port : $HTTP_PROXY_PORT"
    echo "### ########################################################"
    export JAVA_OPTS="$JAVA_OPTS -Dhttp.nonProxyHosts=$NO_PROXY -Dhttp.proxyHost=$HTTP_PROXY_HOST  -Dhttp.proxyPort=$HTTP_PROXY_PORT -Dhttps.proxyHost=$HTTP_PROXY_HOST -Dhttps.proxyPort=$HTTP_PROXY_PORT"
    echo "## Config JAVA_OPTS Proxy for ElasticSearch Plugins : $JAVA_OPTS"
    #sed -i 's/$JAVA_OPTS/$JAVA_OPTS -Dhttp.nonProxyHosts=$NO_PROXY -Dhttp.proxyHost=$HTTP_PROXY_HOST  -Dhttp.proxyPort=$HTTP_PROXY_PORT -Dhttps.proxyHost=$HTTP_PROXY_HOST -Dhttps.proxyPort=$HTTP_PROXY_PORT/' $ES_HOME/bin/plugin
 fi
}

function installEsPlugins {
  echo ""
  echo "### Install ElasticSearch Plugins"
  echo "### ########################################################"
  echo "### Install ElasticSearch Plugins : head"
  /opt/elasticsearch/bin/plugin -install mobz/elasticsearch-head
  echo "### Install ElasticSearch Plugins : kopf"
  /opt/elasticsearch/bin/plugin -install lmenezes/elasticsearch-kopf

}

function configEs {
  echo ""
  echo "### Config Elasticsearch"
  echo "### ########################################################"
  # Set to true to instruct the operating system to never swap the ElasticSearch process
  sed -i'' 's/#bootstrap.mlockall: true/bootstrap.mlockall: true/' $ES_HOME/config/elasticsearch.yml
  # Paths
  sed -i'' 's/#path.data: \/path\/to\/data$/path.data: \/data/' $ES_HOME/config/elasticsearch.yml
  sed -i'' 's/#path.logs: \/path\/to\/logs/path.logs: \/logs/' $ES_HOME/config/elasticsearch.yml
  sed -i'' 's/#path.work: \/path\/to\/work/path.work: \/work/' $ES_HOME/config/elasticsearch.yml
  # Cors
  echo '# Enabled Cors' >>  $ES_HOME/config/elasticsearch.yml
  echo 'http.cors.enabled: true' >>  $ES_HOME/config/elasticsearch.yml
  # Config ulimits
  echo ""   >> /etc/security/limits.conf
  echo "*         soft    nofile          1048576"   >> /etc/security/limits.conf
  echo "*         hard    nofile          1048576"   >> /etc/security/limits.conf
  echo "*         -       memlock         unlimited" >> /etc/security/limits.conf
  echo "root      soft    nofile          1048576"   >> /etc/security/limits.conf
  echo "root      hard    nofile          1048576"   >> /etc/security/limits.conf
  echo "root      -       memlock         unlimited" >> /etc/security/limits.conf
  # Config pam_limit
  echo "" >> /etc/pam.d/common-session
  echo "session required pam_limits.so" >> /etc/pam.d/common-session

  printEs
}

function printEs {
  echo ""
  echo "### Print Config Elasticsearch"
  echo "### ########################################################"
  grep -v '^#' /opt/elasticsearch/config/elasticsearch.yml | grep ":"
  echo ""
  echo "### Print Config Elasticsearch"
  echo "### ########################################################"
  grep -v '^#' /etc/security/limits.conf
}


function cleanBuildInstall {
  echo ""
  echo "### Clean Docker Image"
  echo "### ########################################################"
  apt-get purge -y software-properties-common python-software-properties  curl
  apt-get -y autoremove
  apt-get clean
  # Clean Local cache
  rm -rf /var/cache/*
  # Remove build
  rm -rf /build
}

function setupEs {
  installTools || exit 1
  installEs || exit 1
  configProxy || exit 1
  configEs || exit 1
  installEsPlugins || exit 1
}

function setup {
  # Config Proxy
  #exportProxy || exit 1
  # Install Es
  setupEs || exit 1
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
  es)
    setupEs || exit 1
    ;;
  proxy)
    configProxy
    ;;
  configEs)
    printEs
    ;;
  esplugins)
    installEsPlugins
    ;;
  clean)
    cleanBuildInstall
    ;;
  *)
    echo "Usage: $0 setup|jdk7|es|proxy|configEs|esplugins|clean" >&2
    exit 1
    ;;
esac
exit 0
