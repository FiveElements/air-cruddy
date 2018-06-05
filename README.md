# \<air-cruddy\> [![Build Status](https://travis-ci.org/FiveElements/air-cruddy.svg?branch=master)](https://travis-ci.org/FiveElements/air-cruddy)

Polymer 2 element that manage Rest CRUD Operations
 

## External Documentation
* https://en.wikipedia.org/wiki/Create,_read,_update_and_delete
* https://en.wikipedia.org/wiki/Representational_state_transfer
* https://en.wikipedia.org/wiki/Semantic_URL


## Developer Notes

 
 
## Dev  Install
 
### Elasticsearch as Server
 
``` 
http.cors.enabled: true
http.cors.allow-origin: http://localhost:3000
``` 
 
 
#### Insert Data 
``` 
curl -XPUT 'http://localhost:9200/twitter/tweet/1?pretty'  -H 'Content-Type: application/json' -d'{ "user" : "kimchy", "post_date" : "2009-11-15T14:12:12",  "message" : "trying out Elasticsearch" }'

``` 

#### Read Data 
``` 
 curl -XGET 'http://localhost:9200/twitter/tweet/1?pretty' 
 ``` 


#### Search Data 
``` 
curl -XPOST 'http://localhost:9200/twitter/tweet/_search?pretty' 
 ``` 
 
 
#### test
 
 http://httpstat.us/500

#### JSON LD
https://developers.google.com/web/updates/2015/03/creating-semantic-sites-with-web-components-and-jsonld
