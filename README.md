event loop
即js的事件任务
宏事件:script setTimeout setInterval
微任务:promiss等等

前面我们介绍过，在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而，根据这个异步事件的类型，这个事件实际上会被对应的宏任务队列或者微任务队列中去。并且在当前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环。

我们只需记住当当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。



函数组件与类组件的区别
1.class的this明确的指向这个实例  函数式组件是根据上下文
2.函数组件接受的是props class组件接受的是this.props,   this可以改变 props不可以改变
3.从js角度来说函数组件比类组件性能要好 class组件每次展示渲染需要实例化当前的类,而函数式组件是直接return出来的dom

react的合成事件
1.react的合成事件采用了事件委托的方式将事件绑定在document.body上面,进行统一的分发与管理 通过e.nativeEvent.stopImmediatePropagation()进行事件冒泡

react的setState
1.setState在react合成事件中是异步的,在原生事件或者setTime中是同步的

react的生命周期
https://www.jianshu.com/p/b331d0e4b398
     1. 挂载卸载过程
        1.1.constructor()
        constructor()中完成了React数据的初始化，它接受两个参数：props和context，当想在函数内部使用这两个参数时，需使用super()传入这两个参数。
        注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。


        1.2.componentWillMount()//用于服务端 dom还未渲染阶段
        1.3.componentDidMount()//dom第一次渲染后,请求数据触发更新阶段
        1.4.componentWillUnmount ()//完成组件销毁与卸载阶段
        2.1. componentWillReceiveProps (nextProps) //父子局跟新的props会在这里触发. 一遍我们可以通过判断两个props是否相同来进行更新操作//getDerivedStateFromProps代替
        2.2.shouldComponentUpdate(nextProps,nextState)//通过return出来true or fasle来进行渲染
        2.3.componentWillUpdate (nextProps,nextState)//getSnapshotBeforeUpdate代替
        2.4.componentDidUpdate(prevProps,prevState)react第一次渲染后进入的componentDidMount后续进入这里
        2.5.render()



浏览器的缓存机制

1.强缓存:Expires
        的中文意思是“有效期”。显然，就是告诉浏览器缓存的有效期。如果过期，缓存会检查源服务器以确定文件是否改变了。
        Cache-Control
        Cache-Control 与 Expires 的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存读取数据还是重新发请求到服务器读取数据。只不过 Cache-Control 的选择更多，设置更细致，如果同时设置的话，其优先级高于 Expires。
2.协商缓存:Last-Modified/If-Modified-Since
          标示这个响应资源的最后修改时间。web 服务器在响应请求时，告诉浏览器资源的最后修改时间。
          当资源过期时（使用 Cache-Control 标识的 max-age），发现资源具有 Last-Modified 声明，则再次向 web 服务器请求时带上 If-Modified-Since，表示请求时间。web服务器收到请求后发现有 If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源有被改动过，则响应资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应 HTTP 304 (无需包体，节省流量)，告知浏览器继续使用缓存。
          Etag/If-None-Match
          web 服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。Apache 中，ETag 的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行 Hash 后得到的。
           当资源过期时（使用 Cache-Control 标识的 max-age），发现资源具有 Etage 声明，则再次向 web 服务器请求时带上 If-None-Match （Etag 的值）。web 服务器收到请求后发现有 If-None-Match 则与被请求资源的相应校验串进行比对，决定返回 200 或 304。

          last-modified只精确到秒

 原型链:
     在js中每一个构造函数都对应有一个prototype属性,这个属性指向函数的原型对象
     构造函数通过 proptotype可以达到原型链

     每一个对象都有一个_proto_属性,这个属性指向原型对象

     每一个原型都有一个constructor属性,这个属性可以指向关联对象
    
     function Person() {

      }
		var person = new Person();
		console.log(person.constructor === Person); // true
		当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性

        当我们在实例上面找不到的属性我们可以去原型上面找,一层一层找直到为null的时候终止

闭包: 可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。
       
    闭包通常我们可以用作缓存

优化:https://zhuanlan.zhihu.com/p/121056616
   1.减少网络请求,http1.1升级到http2.0 HTTP2.0具有多路复用,压缩传输
   2.服务端渲染 nuxt.js next.js
   3.静态资源用cdn,可以做一些缓存,强缓存,或者协商缓存
   4.css文件方头部js文件放尾部,如果放一起会导致加载阻塞,css方头部是为了防止用户看的页面第一眼没有样式
   5.图片尽量用icon,
   6.重复代码需提取为公共组件
   7.压缩
    JavaScript：UglifyPlugin
    CSS ：MiniCssExtractPlugin
    HTML：HtmlWebpackPlugin
   8.组件懒加载 通过插件来实现
   9.使用webwork来进行一些数据之类的异步请求

URL从输入到页面展现到底发生了什么:
    键盘或触屏输入URL并回车确认
    URL解析/DNS解析查找域名IP地址
    网络连接发起HTTP请求
    HTTP报文传输过程
    服务器接收数据
    服务器响应请求/MVC
    服务器返回数据
    客户端接收数据
    浏览器加载/渲染页面
    打印绘制输出

webpack:
       1.webpack是通过enter入口的文件来递归解析加载资源文件的,不同类型的文件通过相对应的loader去进行处理的
       2.webpack的常用loader  css-loader ts-loader babel-loader style-loader url-loader filed-loader imga-loader
       3.JavaScript：UglifyPlugin=>压缩js的插件   CSS ：MiniCssExtractPlugin=>压缩css输出css文件
       4.webpack的流程:
        1 初始化参数,从shell中拿到传入的参数也可以是pageJson中的.
        2 初始化编译程序,加载配置插件
        3 确认入口
        4 编译模块:从入口文件出发，调用所有配置的 Loader 
        5 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
        6 完成模块编译:在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
        7 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
        8 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
      5.提高webpack构建速度
        1.提取公共代码
        2.利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
        3.happypack多线程去处理,webpack4官方有一个插件是替代happypack的

跨域: 1.跨域的本质是浏览器的同源策略导致的,同端口,同域名,通协议,  本质是浏览器环境
      jspon通过script标签url后缀进行拼接回调 基本上没用过
      CORS:后台设置Access-Control-Allow-Origin为某个域名或者 * 为全部域名
      前端通过dev-server去代理.利用webpack  dev-sever去开起来一个前端服务器,通过proxy字段设置去拦截我们需要拦截的域名.本质上是服务器到服务器之间是没有跨域的问题的;
      axios的跨域
      nginx的反向代理 通过设置nginx的config配置文件 思路与dev-server是一致的


object.defineproperty()和proxy的区别:

  1 object.defineproperty接受三个参数,主要是对于对象的属性进行监听控制的.
  2 proxy接受2个参数主要是对对象进行监听控制的,有点类是geterr/setter 
  3 从上面对比我们能看出出来defineproperty要相对一个对象控制需要我们递归去操作,而proxy只需要一次即可
  4 proxy可以关注到数组内部的变化而defineproperty不可以

Promise的原理
    Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
    Promise 会有三种状态
    Pending 等待
    Fulfilled 完成
    Rejected 失败
    状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
    Promise 中使用 resolve 和 reject 两个函数来更改状态；
    then 方法内部做但事情就是状态判断
    如果状态是成功，调用成功回调函数
    如果状态是失败，调用失败回调函数

    promise.all只有当所有的都成功了才返回一个数组,如果失败了则返回最先失败的
    promise.race只要当中有一个成功了就返回

new 操作符操作了哪些
    1.创建了一个空对象;
    2.将创建变量的this指向这个空对象;
    3.执行构造函数;
    4.抛出一个新的对象;

react createElement 和 cloneElement 的区别
    1.createElement接受三个参数,第一个为传入的标签或者react的组件,第二个为传入props的属性,第三个为子组件
    2.cloneElement同样接受三个参数,第一个参数为react传入的组件,新添加的属性会并入原有的属性，传入到返回的新元素中，而旧的子元素将被替换。将保留原始元素的键和引用。

react 组件通信
    父传子:直接穿属性通过子组件props拿到 
    子传父:利用回调函数将子组件的内容传回父组件
    跨组件:1状态管理,2react Content;  通过创建一个reactContent的对象来进行,包裹不同的组件然后进行数据共享

前端模块化 -- commonjs和es6模块化的区别
https://www.cnblogs.com/sherryStudy/p/module_diff.html
    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
    CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

ES6 Modules 的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6的import 有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。

编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”

    node使用的是commonjs 在使用模块的时候是运行时同步加载的  拷贝模块中的对象  
    模块可以多次加载，但只会在第一次加载 之后会被缓存 引入的是缓存中的值
    1.如果是第三方模块 只需要填入模块名
    2.自己定义的模块 需要使用相对路径或者绝对路径
    Es6 模块
    默认导出   export default 变量或者函数或者对象
    默认引入  import name from "相对或绝对路径" 
    导出的名字和引入的名字可以不一致
    按需导出  export 需要声明 变量用const var let  函数用function
    按需引入  import {变量名或函数名} form "路径"    
    全部引入 使用  import * as 自定义name "路径"
    支持多个变量
模块化的好处:
    1.避免变量污染，命名冲突
    2.提高代码复用率
    3.提高维护性
    4.依赖关系的管理

基础类型引用类型
    基础类型是不可以修改值的 基础类型存在于栈中
    let a = 10
    let b = a
    let a = 11
    console.log(a === b) // false

    引用类型是可以修改值的 引用类型存在于堆中,可以扩充大小.
    let a = {}
    let b = a
    a.name = "nmwap"
    console.log(a === b) // true

箭头函数和普通函数的区别
    1 书写的区别
    2 参数上的区别,普通的可以通过argument 箭头是agrs
    3 this的指向问题
    4 因为箭头函数没有prototype所以不能通过new来生成
    5 箭头函数内不能用yield且不能用作Generator函数，而普通函数可以。

react;
    1 props 是react中的属性简称不可以改变
    2 refs 组件内使用ref，获取dom元素  ref作为子组件的属性，获取的是该子组件 通常forwardRefs配合传refs



react-redux

react context



react-router

history模式与hash模式的不同与实现,nginx如何配置history模式
  hash 模式主要通过顶层的hashrouter 监听hashchange方法去匹配router对应的组件
  hash值变化浏览器不会重新发起请求，但是会触发window.hashChange事件，假如我们在hashChange事件中获取当前的hash值，并根据hash值来修改页面内容，则达到了前端路由的目的。

  history模式原理可以这样理解，首先我们要改造我们的超链接，给每个超链接增加onclick方法，阻止默认的超链接跳转，改用history.pushState或history.replaceState来更改浏览器中的url，并修改页面内容。由于通过history的api调整，并不会向后端发起请求，所以也就达到了前端路由的目的。

函数防抖与节流

防抖:一段时间内执行多次事件,清空前面所以的事件只从最后一次开始

function debounce(fn,wait){
   let timer = null;
    return ()=>{
     if(timer) clearTimeout(timer)
     timer = setTimeout(fn,wait) 
  }
}

节流:一段固定的时间执行事件

function throttle(fn,delay){
  let isOpen = true
  return ()=>{
   if(!isOpen){
     return fasle
 }else{
  setTimeout(()=>{
  fn()
  isOpen = true
},delay)
}
}
}

函数柯里化
实现一个sum(1)(2)(3).valueOf()
      sum(1,2,3,).valueOf()

      function sum (...parmas){
        const chain = (...args)=>{
          parmas = parmas.push(...args)
          return chain
        }
        chain.valueOf=()=>{
          const sums = parmas.reduce((a,b)=>{
              return a + b 
            })
            return sums
        }
        return chain
      }

 JS的垃圾回收站机制
参考答案：
JS 具有自动垃圾回收机制。垃圾收集器会按照固定的时间间隔周期性的执行。
JS 常见的垃圾回收方式：标记清除、引用计数方式。
1、标记清除方式：

工作原理：当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。
工作流程：
垃圾回收器，在运行的时候会给存储在内存中的所有变量都加上标记；
去掉环境中的变量以及被环境中的变量引用的变量的标记；
被加上标记的会被视为准备删除的变量；
垃圾回收器完成内存清理工作，销毁那些带标记的值并回收他们所占用的内存空间。

2、引用计数方式：

工作原理：跟踪记录每个值被引用的次数。
工作流程：
声明了一个变量并将一个引用类型的值赋值给这个变量，这个引用类型值的引用次数就是 1；
同一个值又被赋值给另一个变量，这个引用类型值的引用次数加1；
当包含这个引用类型值的变量又被赋值成另一个值了，那么这个引用类型值的引用次数减 1；
当引用次数变成 0 时，说明没办法访问这个值了；
当垃圾收集器下一次运行时，它就会释放引用次数是0的值所占的内存。

V8引擎的垃圾回收机制基于分代式垃圾回收，它根据对象的存活时间将内存分为新生代和老生代两类，然后对不同的分代采用不同的垃圾回收算法12。

新生代中存放的是生存时间短的对象，它们通常只经历一次或几次垃圾回收就被释放了。新生代的空间较小，一般只有几兆字节。V8主要使用Scavenge算法进行新生代的垃圾回收，它是一种牺牲空间换取时间的复制算法，它将新生代分为两个半区，分别叫from-space和to-space，每次只使用其中一个半区，当一个半区被分配满了，就将其中存活的对象复制到另一个半区，并释放原来的半区。这样可以快速地回收新生代的垃圾对象，但是会浪费一半的空间34。
老生代中存放的是生存时间长的对象，它们经过多次垃圾回收仍然存活，它们的存活概率更高。老生代的空间较大，一般有几百兆字节。V8主要使用标记-清除（Mark-Sweep）和标记-整理（Mark-Compact）算法进行老生代的垃圾回收，它们都是基于可达性分析的算法，即从根对象开始，递归地标记所有可达的对象，然后清除未被标记的对象。标记-清除算法在清除对象时会产生内存碎片，这会影响后续的内存分配，所以V8会在空间不足时使用标记-整理算法，它会在标记-清除的基础上，将存活的对象移动到内存的一端，从而减少内存碎片 。




for...in... for...of...的区别
for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

哪些情况会导致内存泄漏
1 全局变量 2 闭包 3 定时器 4 脱离dom的引用


移动端1px像素问题
使用伪元素设置高度为1 宽width100%然后通过transform缩小百分之50
viewport+rem


JS 中的类型转换

  转换为布尔值
  转换为数字
  转换为字符串

XSS 简单点来说，就是攻击者想尽一切办法将可以执行的代码注入到网页中。
XSS 可以分为多种类型，但是总体上我认为分为两类：持久型和非持久型。
持久型也就是攻击的代码被服务端写入进数据库中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。
非持久型相比于前者危害就小的多了，一般通过修改 URL 参数的方式加入攻击代码，诱导用户访问链接从而进行攻击

CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。
举个例子，假设网站中有一个通过 GET 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口
<img src="http://www.domain.com/xxx?comment='attack'"/>
那么你是否会想到使用 POST 方式提交请求是不是就没有这个问题了呢？其实并不是，使用这种方式也不是百分百安全的，攻击者同样可以诱导用户进入某个页面，在页面中通过表单提交 POST 请求。
如何防御
防范 CSRF 攻击可以遵循以下几种规则：
Get  请求不对数据进行修改
不让第三方网站访问到用户 Cookie
阻止第三方网站请求接口
请求时附带验证信息，比如验证码或者 Token


1 策略模式
定义 : 要实现某一个功能，有多种方案可以选择。我们定义策略，把它们一个个封装起来，并且使它们可以相互转换。

2 订阅模式
定义:发布-订阅是一种消息范式，消息的发布者，不会将消息直接发送给特定的订阅者，而是通过消息通道广播出去，然后呢，订阅者通过订阅获取到想要的消息。

3 装饰器模式
定义:是为了给一个函数赋能，增强它的某种能力，它能动态的添加对象的行为，也就是我传入的就是一个对象  react中及代表HOC	

4 单例模式
定义: 单例出来的函数只会实例化一次,所以调用多次值也只会是第一次

5 工厂模式
定义: 类似于函数抽离, 抽离逻辑处理过程, 等到结果 


    function unique(arr) {
      let obj = {}
      arr.forEach(el => {
        if (!obj[el]) obj[el] = true;
      });
      return Object.keys(obj)
    }

    console.log(unique([1, 2, 3, 3, 4, 4, 4]))

    // new 操作符 第一步创建于一个新的对象, 第二将传入函数与新的对象原型连接 第三将传入函数指向创建的函数
    function myMyNew(fn, ...arg) {
      let obj = {}
      if (typeof fn === 'function') {
        throw 'fn is not function'
      }
      obj._proto = fn.prototype
      let res = fn.call(obj, ...arg)
      return typeof res == "object" ? res : obj
    }

    function myCall(fn, ...args) {
      if (fn == 'null' || fn == 'undefined') {
        fn == window
      } else {
        fn = Object(fn)
      }
      const key = Symbol('key')
      fn[key] = this
      const result = fn[key](...args);
      delete fn[key]
      return result
    }

    function myApply(fn, agrs) {
      if (fn == 'null' || fn == 'undefined') {
        fn = window
      } else {
        fn = Object(fn)
      }
      if (!Array.isArray(args)) {
        throw ''
      }
      const key = Symbol('fn')
      fn[key] = this
      const result = fn[key](...arg)
      delete fn[key]
      return result
    }

    //冒泡排序
    function mySort(arr) {
      let arrLen = arr.length;
      for (let i = 0; i < arrLen - 1; i++) {
        for (let j = 0; j < arrlen - 1 - i; j++) {
          if (arr[j] > arr[j + 1]) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }
      }
      return arr
    }
    //flat的实现

    function myFlat1(arr){
      let newArr = []
      const rec = (array)=>{
        array.forEach(item=>{
          if(Array.isArray(item)){
            rec(item)
          }else{
            newArr.push(item)
          }
        })
      }
      rec(arr)
      return newArr
    }

    Array.prototype.myReduce = function (fn,initval) {
      if(Array.isArray(this)){
        let sumVal = initval ? initval : this[0];
        for(let i = (initval ? 0 :1) ; i<this.length; i++ ){
          let cur = this[i];
          sumVal = fn(sumVal,cur,i,this)
        }
        return sumVal
      }
    }



    function sleep(delay) {
      const startTime = new Date().getTime()
      while (new Date.getTime().getTime() - startTime < delay) {
        continue;
      }
    }

    async function sleep1(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, delay)
      })
    }

    实现add(3).sub(2)
    
    //柯里化

        function add(...a) {
        console.log(a,'xxx')
        let res = a.reduce((b, c) => b + c)
        const add1 = (...b) => add(res, ...b)
        add1.toString = () => {
            return res
        }
        return add1
    }
    console.log(+add(1)(2));// 3
    console.log(+add(1)(2, 3));// 6
    console.log(+add(1)(2, 3)(4));// 10
