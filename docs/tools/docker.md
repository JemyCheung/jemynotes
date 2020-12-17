# docker
Introduction

## 安装镜像和使用
### 安装ubuntu
```
docker pull ubuntu:latest
```

### 查看镜像
```
$ docker images
```

### 查看容器
在第一次安装镜像之后，是看不到容器的。只有第一次进入并运行容器之后，退出来，再用此命令，可以看到刚刚允许的容器
```
docker ps -a
```

### 进入并运行容器
```
docker run -it ubuntu /bin/bash
```
### 注意事项
一般到这步之后，就安装好docker镜像并进入容器了。但是由于新安装，所以ubuntu上面可能什么都没有。尝试过后
```
wget,
git,
```
都没有，但是`apt-get`是有的。先`apt-get update`，更新命令，在`apt-get install git`安装一下git工具


## 镜像里面的内容被强制清空

### 案例，创建的zw文件夹在exit镜像之后，再次进入没有了

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

### 解决方法，备案一下

```
## 先查看容器
➜  ~ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES
df9ae480d4e8        ubuntu              "/bin/bash"         12 minutes ago      Exited (0) 4 seconds ago                          fervent_williams
25ccbb0073dc        ubuntu              "/bin/bash"         14 minutes ago      Exited (0) 12 minutes ago  
distracted_napier                       

## 提交刚刚运行后退出的df9ae480d4e8，命名ffmpeg:ubuntu01
➜  ~ docker commit df9ae480d4e8 ffmpeg:ubuntu01
sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747

## 再查看本地镜像，多出来ffmpeg:ubuntu01
➜  ~ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ffmpeg              ubuntu01           e4c183c114d3        6 seconds ago       113MB
ubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB

## 再次进入，上次安装的curl还在
➜  ~ docker run -it ffmpeg:unbuntu01 /bin/bash
root@1fb7ec79db96:/# curl -i www.baidu.com
HTTP/1.1 200 OK
Accept-Ranges: bytes
```

## 删除镜像

### 无法删除
因为绑定了容器，需要先删除指定容器
```
# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ffmpeg              ubuntu01            e4c183c114d3        6 minutes ago       113MB
ubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB

# docker rmi e4c183c114d3
Error response from daemon: conflict: unable to delete e4c183c114d3 (must be forced) - image is being used by stopped container 1fb7ec79db96
```

### 查看容器
```
# docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES
1fb7ec79db96        ffmpeg:ubuntu01    "/bin/bash"         6 minutes ago       Exited (0) 3 minutes ago      ecstatic_cray                    
df9ae480d4e8        ubuntu              "/bin/bash"         20 minutes ago      Exited (0) 8 minutes ago                          fervent_williams

```

### 删除容器和镜像
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

## 删除容器
```
➜  Desktop docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS                            PORTS               NAMES
25ccbb0073dc        ubuntu              "/bin/bash"         25 hours ago         Exited (0) 25 hours ago                               distracted_napier
a2bfbf4195fe        ubuntu              "/bash/bin"         25 hours ago         Created                                               happy_curie
3e51c690c954        ubuntu:latest       "/bin/bash"         27 hours ago         Exited (129) 25 hours ago                             wonderful_hopper

➜  Desktop docker rm 25ccbb0073dc a2bfbf4195fe 3e51c690c954
25ccbb0073dc
a2bfbf4195fe
3e51c690c954
```
