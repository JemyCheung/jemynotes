# ffmpeg
Introduction

## mp4卡顿case
https://ucancdn.xdf.cn/1v1/dev/media/mengxianliang/2bc30ddfcc7b407ea446a45d116b9dba.mp4
卡顿排查
- 先用浏览器、vlc、ffmpeg看看是不是共性问题，是否跟播放器相关
- 如果是moov后置，视频又很大，可能会导致视频打开慢甚至打不开，可以看看mp4的Box数据
- ffprobe可以查看视频的具体数据
这个应该是pts显示乱了
```
ffprobe -show_frames https://ucancdn.xdf.cn/1v1/dev/media/mengxianliang/2bc30ddfcc7b407ea446a45d116b9dba.mp4 |grep "pkt_pts_time" >~/Downloads/2bc30_pts.log
```
![](http://qnblog.ijemy.com/pts01.png)
