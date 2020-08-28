# Android视频相关

## 自定义采集流程
- 初始化Ui和事件监听
- TextureSource的onCapturerOpened用Android MediaCodec进行解码本地视频
- TextureSource的onTextureFrameAvailable回调视频帧(oesTextureId)
- setVideoSource 方法，将自定义的视频源对象设置给 RtcEngine

## 为什么不用java而要放在native层处理
- java处理速度慢，影响预期流畅度。比如传进java层的每秒25帧，传出来可能只有6帧左右
- java处理其实更麻烦，很多包可能需要自己写，c/c++已经有现有的实现函数

## TextureView和SurfaceTexture
[TextureView和SurfaceTexture](https://www.cnblogs.com/wytiger/p/5693569.html)   
SurfaceTexture.OnFrameAvailableListener用于通知TextureView内容流有新图像到来。SurfaceTextureListener接口用于让TextureView的使用者知道SurfaceTexture已准备好，这样就可以把SurfaceTexture交给相应的内容源

## 3.0.1版本自采集崩溃
调用pushExternalVideoFrame就会崩溃，请用其他版本

## 自采集模糊
- 如果是自己实现camera采集，注意对焦
- 如果是其他方式，主要调用pushExternalVideoFrame的前置处理，可以先不处理，直接传给sdk看一下

## AgoraVideoFrame
| v场景 | 参数 |
| ------------- |:-------------|
| Buffer裸数据时 | AgoraVideoFrame.buf<br>AgoraVideoFrame.stride<br>AgoraVideoFrame.height<br>AgoraVideoFrame.format//是指采集，不是指定sdk转码格式<br>AgoraVideoFrame.timeStamp |
| Texture时|AgoraVideoFrame.textureID<br>AgoraVideoFrame.format<br>AgoraVideoFrame.transform<br>AgoraVideoFrame.stride<br>AgoraVideoFrame.height<br>AgoraVideoFrame.eglContext14<br>AgoraVideoFrame.timeStamp |
