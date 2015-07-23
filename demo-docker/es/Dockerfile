#5elements/elasticsearch
FROM debian:latest

# Set correct environment variables.
# Set the env variable DEBIAN_FRONTEND to noninteractive
ENV HOME="/root" DEBIAN_FRONTEND="noninteractive"


# Config proxy env
# #######################
ENV http_proxy="http://webcache.groupe.generali.fr:3128" no_proxy="*.groupe.generali.fr"
ENV https_proxy="$http_proxy"  HTTP_PROXY="$http_proxy" HTTPS_PROXY="$http_proxy" NO_PROXY="$no_proxy"

 
# Config Elasticsearch
# #######################
ENV ES_HEAP_SIZE="4g"

# Expose
# #######################
EXPOSE 9200 9300
VOLUME ["/data", "/logs", "/work", "/tmp"]


# Start Command
# #######################
CMD [ "/opt/elasticsearch/bin/elasticsearch" ]


# Install build
# #######################
ADD build build
RUN [ "/build/install-jdk-repo.sh" , "setup" ]
RUN [ "/build/install-es.sh" , "setup" ]

# Clean proxy env
# #######################
ENV http_proxy="" no_proxy="" https_proxy=""  HTTP_PROXY="" HTTPS_PROXY="" NO_PROXY=""

