myFirstPromise返回promise对象，做线性处理
pp返回promise对象，对pp的结果异步做不同的处理

```
var myFirstPromise = new Promise(function(resolve, reject){
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    setTimeout(function(){
        resolve("0010"); //代码正常执行！
    }, 2000);
});

//myFirstPromise的resolve信息进行处理，同时再返回一个promise对象p1
//对p1的resolve信息进行处理，同时再返回一个promise对象p2....
//线性处理，每次返回一个promise对象
 myFirstPromise.then(function(successMessage){//return p1
    return new Promise(function(resolve,reject){
       setTimeout(function(){
        resolve("0020"); //代码正常执行！
    }, 2000);
    document.write("2s 1 " + successMessage +"<br/>");
    })
}).then(function(successMessage1){//return p2
   return new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve("0030"); //代码正常执行！
    }, 2000);
    document.write("4s 2 " + successMessage1+"<br/>");
   })
}).then(function(sucessmessage2){//p2的resolve进行处理
   document.write("6s 3 " + sucessmessage2+"<br/>");
 });


//返回pp这个promise对象，然后对resolve的结果，分别做不同的处理

var pp = new Promise(function(resolve, reject){
    //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
    //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
    setTimeout(function(){
        resolve("new data"); //代码正常执行！
    }, 2000);
});

pp.then(function(ppmsg){
  setTimeout(function(){
         document.write("3s pp1 " + ppmsg+"<br/>");
    }, 1000);
 
})
pp.then(function(ppmsg){
   setTimeout(function(){
         document.write("4s pp2 " + ppmsg+"<br/>");
    }, 2000);
  
})
pp.then(function(ppmsg){
  setTimeout(function(){
         document.write("5s pp3 " + ppmsg+"<br/>");
    }, 3000);
  
})
```

结果如下  
打印顺序与预期期望打印的时间间隔相等（可以删掉第一个时间间隔打印，自己改变顺序后进行调试看与预期是否相等）

```
2s 1 0010
3s pp1 new data
4s 2 0020
4s pp2 new data
5s pp3 new data
6s 3 0030
```