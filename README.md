# \<air-cruddy\>

An Polymer element that manage CRUD Operations
 

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
curl -XPUT 'http://localhost:9200/twitter/tweet/1?pretty' -d'{ "user" : "kimchy", "post_date" : "2009-11-15T14:12:12",  "message" : "trying out Elasticsearch" }'

``` 

#### Read Data 
``` 
 curl -XGET 'http://localhost:9200/twitter/tweet/1?pretty' 
 ``` 


#### Search Data 
``` 
curl -XPOST 'http://localhost:9200/twitter/tweet/_search?pretty' 
 ``` 
