# Build Docker Images
docker build --rm -t 5elements/elasticsearch .

# Docker Tips and Tricks
### Stop / remove all Docker containers

- stop et delete all docker containers: 
```Shell
# docker stop $(docker ps -a -q) 
# docker rm -v $(docker ps -a -q)
```


- delete all docker images: 
```Shell
# docker rmi -f $(docker images -q)
```

# Os Configuration
http://www.tldp.org/LDP/abs/html/
 
 
# ES Optimisation
https://www.elastic.co/blog/performance-considerations-elasticsearch-indexing?mkt_tok=3RkMMJWWfF9wsRohs6XJZKXonjHpfsX56eouX6K2lMI%2F0ER3fOvrPUfGjI4FSspjI%2BSLDwEYGJlv6SgFQrHGMa1h17gOUhM%3D
