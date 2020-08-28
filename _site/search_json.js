window.ydoc_plugin_search_json = {
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
          "title": "删除容器和镜像",
          "url": "/tools/docker.html#删除镜像-删除容器和镜像",
          "content": "删除容器和镜像# docker rm 1fb7ec79db961fb7ec79db96\n\n# docker rmi e4c183c114d3\nUntagged: ffmpeg:ubuntu01\nDeleted: sha256:e4c183c114d3625b317144cf2dd2ffd78d97f91b7fa03ab811462df79df97747\nDeleted: sha256:b5fc8a3bea45a2ac1b66830b858a886584f5b9aad557c89a15cc7e04e81962a4\n# docker imagesREPOSITORY          TAG                 IMAGE ID            CREATED             SIZE\nubuntu              latest              4e2eef94cd6b        13 hours ago        73.9MB\n"
        },
        {
          "title": "删除容器",
          "url": "/tools/docker.html#删除容器",
          "content": "删除容器➜  Desktop docker ps -aCONTAINER ID        IMAGE               COMMAND             CREATED              STATUS                            PORTS               NAMES\n25ccbb0073dc        ubuntu              \"/bin/bash\"         25 hours ago         Exited (0) 25 hours ago                               distracted_napier\na2bfbf4195fe        ubuntu              \"/bash/bin\"         25 hours ago         Created                                               happy_curie\n3e51c690c954        ubuntu:latest       \"/bin/bash\"         27 hours ago         Exited (129) 25 hours ago                             wonderful_hopper\n\n➜  Desktop docker rm 25ccbb0073dc a2bfbf4195fe 3e51c690c954\n25ccbb0073dc\na2bfbf4195fe\n3e51c690c954\n"
        }
      ]
    },
    {
      "title": "ffmpeg",
      "content": "Introduction",
      "url": "/tools/ffmpeg.html",
      "children": [
        {
          "title": "mp4卡顿case",
          "url": "/tools/ffmpeg.html#mp4卡顿case",
          "content": "mp4卡顿casehttps://ucancdn.xdf.cn/1v1/dev/media/mengxianliang/2bc30ddfcc7b407ea446a45d116b9dba.mp4卡顿排查先用浏览器、vlc、ffmpeg看看是不是共性问题，是否跟播放器相关\n如果是moov后置，视频又很大，可能会导致视频打开慢甚至打不开，可以看看mp4的Box数据\nffprobe可以查看视频的具体数据\n这个应该是pts显示乱了\nffprobe -show_frames https://ucancdn.xdf.cn/1v1/dev/media/mengxianliang/2bc30ddfcc7b407ea446a45d116b9dba.mp4 |grep \"pkt_pts_time\" >~/Downloads/2bc30_pts.log"
        }
      ]
    }
  ],
  "video": [
    {
      "title": "Android视频相关",
      "content": "",
      "url": "/video/video_android.html",
      "children": [
        {
          "title": "自定义采集流程",
          "url": "/video/video_android.html#自定义采集流程",
          "content": "自定义采集流程初始化Ui和事件监听\nTextureSource的onCapturerOpened用Android MediaCodec进行解码本地视频\nTextureSource的onTextureFrameAvailable回调视频帧(oesTextureId)\nsetVideoSource 方法，将自定义的视频源对象设置给 RtcEngine\n"
        },
        {
          "title": "为什么不用java而要放在native层处理",
          "url": "/video/video_android.html#为什么不用java而要放在native层处理",
          "content": "为什么不用java而要放在native层处理java处理速度慢，影响预期流畅度。比如传进java层的每秒25帧，传出来可能只有6帧左右\njava处理其实更麻烦，很多包可能需要自己写，c/c++已经有现有的实现函数\n"
        },
        {
          "title": "TextureView和SurfaceTexture",
          "url": "/video/video_android.html#textureview和surfacetexture",
          "content": "TextureView和SurfaceTextureTextureView和SurfaceTextureSurfaceTexture.OnFrameAvailableListener用于通知TextureView内容流有新图像到来。SurfaceTextureListener接口用于让TextureView的使用者知道SurfaceTexture已准备好，这样就可以把SurfaceTexture交给相应的内容源"
        },
        {
          "title": "3.0.1版本自采集崩溃",
          "url": "/video/video_android.html#3.0.1版本自采集崩溃",
          "content": "3.0.1版本自采集崩溃调用pushExternalVideoFrame就会崩溃，请用其他版本"
        },
        {
          "title": "自采集模糊",
          "url": "/video/video_android.html#自采集模糊",
          "content": "自采集模糊如果是自己实现camera采集，注意对焦\n如果是其他方式，主要调用pushExternalVideoFrame的前置处理，可以先不处理，直接传给sdk看一下\n"
        },
        {
          "title": "AgoraVideoFrame",
          "url": "/video/video_android.html#agoravideoframe",
          "content": "AgoraVideoFrame\n\nv场景\n参数\n\n\n\n\nBuffer裸数据时\nAgoraVideoFrame.bufAgoraVideoFrame.strideAgoraVideoFrame.heightAgoraVideoFrame.format//是指采集，不是指定sdk转码格式AgoraVideoFrame.timeStamp\n\n\nTexture时\nAgoraVideoFrame.textureIDAgoraVideoFrame.formatAgoraVideoFrame.transformAgoraVideoFrame.strideAgoraVideoFrame.heightAgoraVideoFrame.eglContext14AgoraVideoFrame.timeStamp\n\n\n"
        }
      ]
    },
    {
      "title": "FAQ",
      "content": "",
      "url": "/video/qa.html",
      "children": [
        {
          "title": "通信模式下房间只有一个人时帧率和码率低",
          "url": "/video/qa.html#通信模式下房间只有一个人时帧率和码率低",
          "content": "通信模式下房间只有一个人时帧率和码率低只有一个人时为了快速出图，当有人加入时本端会收到对端加入信令，然后提升码率"
        },
        {
          "title": "Add frame too many",
          "url": "/video/qa.html#add-frame-too-many",
          "content": "Add frame too many客户端回调日志，图像的decode和渲染是两个线程，分别解码到缓冲池(in)和从缓冲池中拿数据渲染(out)，当渲染线程卡住，事件监听到缓冲池溢出(sdk定义的是100帧)时，会报这个错误。通常原因可能是1).内存管理不当，cpu占用率高，导致应用卡死；2).其他应用也可能导致系统卡死；3).存在sdk线程管理不当的可能性，如果普遍存在，可能需要复现去查sdk"
        }
      ]
    }
  ]
}