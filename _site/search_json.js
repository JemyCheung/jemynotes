window.ydoc_plugin_search_json = {
  "webrtc": [
    {
      "title": "docker",
      "content": "Introduction",
      "url": "/webrtc/docker.html",
      "children": [
        {
          "title": "镜像文件被强制恢复",
          "url": "/webrtc/docker.html#镜像文件被强制恢复",
          "content": "镜像文件被强制恢复➜  ~ docker run -it ubuntu /bin/bashroot@25ccbb0073dc:/# cd home\nroot@25ccbb0073dc:/home# ls\nroot@25ccbb0073dc:/home# mkdir zw\nroot@25ccbb0073dc:/home# cd zw\nroot@25ccbb0073dc:/home/zw# exit;\nexit\n➜  ~ docker run -it ubuntu /bin/bash\nroot@df9ae480d4e8:/# cd home\nroot@df9ae480d4e8:/home# ls\n➜  ~ docker ps -aCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES\ndf9ae480d4e8        ubuntu              \"/bin/bash\"         12 minutes ago      Exited (0) 4 seconds ago                          fervent_williams\n25ccbb0073dc        ubuntu              \"/bin/bash\"         14 minutes ago      Exited (0) 12 minutes ago  \ndistracted_napier                       \n\n➜  ~ docker commit df9ae480d4e8 ffmpeg:ubuntu01\nsha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747\n\n➜  ~ docker images\nREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nffmpeg              ubuntu01           e4c183c114d3        6 seconds ago       113MB\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n➜  ~ docker run -it ffmpeg:unbuntu01 /bin/bash\nroot@1fb7ec79db96:/# curl -i www.baidu.com\nHTTP/1.1 200 OK\nAccept-Ranges: bytes\n"
        },
        {
          "title": "删除",
          "url": "/webrtc/docker.html#删除",
          "content": "删除# docker imagesREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nffmpeg              ubuntu01            e4c183c114d3        6 minutes ago       113MB\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n\n# docker rmi e4c183c114d3\nError response from daemon: conflict: unable to delete e4c183c114d3 (must be forced) - image is being used by stopped container 1fb7ec79db96\n# docker ps -aCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES\n1fb7ec79db96        ffmpeg:ubuntu01    \"/bin/bash\"         6 minutes ago       Exited (0) 3 minutes ago      ecstatic_cray                    \ndf9ae480d4e8        ubuntu              \"/bin/bash\"         20 minutes ago      Exited (0) 8 minutes ago                          fervent_williams\n\n# docker rm 1fb7ec79db961fb7ec79db96\n\n# docker rmi e4c183c114d3\nUntagged: ffmpeg:ubuntu01\nDeleted: sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747\nDeleted: sha256:b5fc8a3bea45a2ac1b66830b858a886584f5b9aad557c89a15cc7e04e81962a4\n# docker imagesREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n"
        }
      ]
    }
  ],
  "tools": [
    {
      "title": "docker",
      "content": "Introduction",
      "url": "/tools/docker.html",
      "children": [
        {
          "title": "镜像里面的内容被强制清空",
          "url": "/tools/docker.html#镜像里面的内容被强制清空",
          "content": "镜像里面的内容被强制清空"
        },
        {
          "title": "案例，创建的zw文件夹在exit镜像之后，再次进入没有了",
          "url": "/tools/docker.html#镜像里面的内容被强制清空-案例，创建的zw文件夹在exit镜像之后，再次进入没有了",
          "content": "案例，创建的zw文件夹在exit镜像之后，再次进入没有了➜  ~ docker run -it ubuntu /bin/bashroot@25ccbb0073dc:/# cd home\nroot@25ccbb0073dc:/home# ls\nroot@25ccbb0073dc:/home# mkdir zw\nroot@25ccbb0073dc:/home# cd zw\nroot@25ccbb0073dc:/home/zw# exit;\nexit\n➜  ~ docker run -it ubuntu /bin/bash\nroot@df9ae480d4e8:/# cd home\nroot@df9ae480d4e8:/home# ls\n"
        },
        {
          "title": "解决方法，备案一下",
          "url": "/tools/docker.html#镜像里面的内容被强制清空-解决方法，备案一下",
          "content": "解决方法，备案一下## 先查看容器➜  ~ docker ps -a\nCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES\ndf9ae480d4e8        ubuntu              \"/bin/bash\"         12 minutes ago      Exited (0) 4 seconds ago                          fervent_williams\n25ccbb0073dc        ubuntu              \"/bin/bash\"         14 minutes ago      Exited (0) 12 minutes ago  \ndistracted_napier                       \n\n## 提交刚刚运行后退出的df9ae480d4e8，命名ffmpeg:ubuntu01\n➜  ~ docker commit df9ae480d4e8 ffmpeg:ubuntu01\nsha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747\n\n## 再查看本地镜像，多出来ffmpeg:ubuntu01\n➜  ~ docker images\nREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nffmpeg              ubuntu01           e4c183c114d3        6 seconds ago       113MB\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n\n## 再次进入，上次安装的curl还在\n➜  ~ docker run -it ffmpeg:unbuntu01 /bin/bash\nroot@1fb7ec79db96:/# curl -i www.baidu.com\nHTTP/1.1 200 OK\nAccept-Ranges: bytes\n"
        },
        {
          "title": "删除镜像",
          "url": "/tools/docker.html#删除镜像",
          "content": "删除镜像"
        },
        {
          "title": "无法删除",
          "url": "/tools/docker.html#删除镜像-无法删除",
          "content": "无法删除因为绑定了容器，需要先删除指定容器# docker imagesREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nffmpeg              ubuntu01            e4c183c114d3        6 minutes ago       113MB\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n\n# docker rmi e4c183c114d3\nError response from daemon: conflict: unable to delete e4c183c114d3 (must be forced) - image is being used by stopped container 1fb7ec79db96\n"
        },
        {
          "title": "查看容器",
          "url": "/tools/docker.html#删除镜像-查看容器",
          "content": "查看容器# docker ps -aCONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                        PORTS               NAMES\n1fb7ec79db96        ffmpeg:ubuntu01    \"/bin/bash\"         6 minutes ago       Exited (0) 3 minutes ago      ecstatic_cray                    \ndf9ae480d4e8        ubuntu              \"/bin/bash\"         20 minutes ago      Exited (0) 8 minutes ago                          fervent_williams\n\n"
        },
        {
          "title": "删除容器",
          "url": "/tools/docker.html#删除镜像-删除容器",
          "content": "删除容器# docker rm 1fb7ec79db961fb7ec79db96\n\n# docker rmi e4c183c114d3\nUntagged: ffmpeg:ubuntu01\nDeleted: sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747\nDeleted: sha256:b5fc8a3bea45a2ac1b66830b858a886584f5b9aad557c89a15cc7e04e81962a4\n"
        },
        {
          "title": "再删除镜像",
          "url": "/tools/docker.html#删除镜像-再删除镜像",
          "content": "再删除镜像# docker imagesREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n"
        }
      ]
    }
  ]
}