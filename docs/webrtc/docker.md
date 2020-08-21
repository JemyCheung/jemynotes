# docker
Introduction



## 镜像文件被强制恢复

```
➜  ~ docker run -it ubuntu /bin/bash
root@25ccbb0073dc:/# cd home
root@25ccbb0073dc:/home# ls
root@25ccbb0073dc:/home# mkdir zw
root@25ccbb0073dc:/home# cd zw
root@25ccbb0073dc:/home/zw# exit;
exit
➜  ~ docker run -it ubuntu /bin/bash
root@df9ae480d4e8:/# cd home
root@df9ae480d4e8:/home# ls
```


```
➜  ~ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES
df9ae480d4e8        ubuntu              "/bin/bash"         12 minutes ago      Exited (0) 4 seconds ago                          fervent_williams
25ccbb0073dc        ubuntu              "/bin/bash"         14 minutes ago      Exited (0) 12 minutes ago  
distracted_napier                       

➜  ~ docker commit df9ae480d4e8 ffmpeg:ubuntu01
sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747

➜  ~ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ffmpeg              ubuntu01           e4c183c114d3        6 seconds ago       113MB
ubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB
➜  ~ docker run -it ffmpeg:unbuntu01 /bin/bash
root@1fb7ec79db96:/# curl -i www.baidu.com
HTTP/1.1 200 OK
Accept-Ranges: bytes
```

## 删除
```
# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ffmpeg              ubuntu01            e4c183c114d3        6 minutes ago       113MB
ubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB

# docker rmi e4c183c114d3
Error response from daemon: conflict: unable to delete e4c183c114d3 (must be forced) - image is being used by stopped container 1fb7ec79db96
```

```
# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES
1fb7ec79db96        ffmpeg:ubuntu01    "/bin/bash"         6 minutes ago       Exited (0) 3 minutes ago      ecstatic_cray                    
df9ae480d4e8        ubuntu              "/bin/bash"         20 minutes ago      Exited (0) 8 minutes ago                          fervent_williams

```

```
# docker rm 1fb7ec79db96
1fb7ec79db96

# docker rmi e4c183c114d3
Untagged: ffmpeg:ubuntu01
Deleted: sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747
Deleted: sha256:b5fc8a3bea45a2ac1b66830b858a886584f5b9aad557c89a15cc7e04e81962a4
```

```
# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB
```
