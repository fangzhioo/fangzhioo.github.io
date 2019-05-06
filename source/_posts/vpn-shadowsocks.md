---
title: 【VPN】运用搬瓦工服务器搭建自用VPN
subtitle: Shadowsocks（小飞机）
date: 2019-05-06 14:10:00
catalog: true
header-img:
tags:
    - VPN
categories: 
    - Horizons
---

# 前言

作为一个码农，需要不断地学习。难免需要查阅很多的文档和资料，对于这些部分，很多需要翻阅外国的网站。但是因为中国长城防火墙（GFW）的限制，我们并不能访问，就有了翻墙的需求了。  
这里我们记录下，如何使用搬瓦工服务器搭建一个属于我们自己的VPN服务。  

> 请合理正确地使用VPN！！！  

# 正文

VPN的获取有很多，可以去买现有的VPN服务或者自己购买服务器搭建。  
这里，记录下我使用的[搬瓦工服务器][1]和[Shadowsocks（小飞机）][3]搭建VPN的方式。  

## 购买VPS

首先，我们需要有一个服务器，可以访问外网，这里运用的搬瓦工的VPS主机。可以 [去这里][1] 选择购买。对于搭建VPN而言，要求的配置不高，所以我们选择最便宜的那款VPS，之前会有 *$19.99/年* 的套餐，目前都涨价了。最便宜的套餐大概 *$49.99/年*，购买时，会有优惠码提供一定的优惠。可以自行百度下搬瓦工优惠码，最高优惠力度大概6.25%，优惠码为：**BWH26FXH3HIQ** （截止2018-09有效）。  

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-1.png" />

购买完毕后，我们在控制台可以查看**主机IP**。然后需要去安装系统镜像，这里推荐选择**centos-7-x86_64-bbr**。安装完毕后，会有提供**root密码**和**服务器SSH端口**。

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-2.png" />

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-3.png" />

## 搭建环境

购买完成后，我们就可以通过 Xshell 这样的工具远程连接我们的服务器了。这里用 [PuTTY][2]，一个简单的连接工具。  
输入我们购买的VPS的账户名密码之后，便连接成功了。  

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-4.png" />

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-5.png" />

接下来，我们需要安装 pip 和 shadowsocks 到我们的服务器上。依次执行下面几行命令，如果没有报错，那便是成功了。在出现提示确认的时候，输入`y`后，回车即可。可是直接复制后，右键粘贴，直接执行。  

```shell
yum install python-setuptools
```

```shell
easy_install pip
```

```shell
pip install shadowsocks
```

到这里，便安装好了shadowsocks到我们的主机上了，接下来需要配置shadowsocks。我们用vim编辑配置文件shadowsocks.json。

```shell
vi /etc/shadowsocks.json
```

之后编辑我们的配置文件，按 `i` 键，进入编辑模式，Putty黑框的左下角会出现 `-- INSERT --` 字样。然后复制以下内容，右键粘贴，修改相应的地方为自己的配置。  
**server** 中的 `服务器IP` 就是上面在控制台查看的主机IP地址。  
**port_password** 里面的 `2333` 是连接时需要的端口。`我是密码`是连接时需要的密码。  
你需要修改这两处，其他属性就不要修改了，注意格式正确。  
修改完成后，按 `ESC` 键，退出编辑模式，黑框左下角的 `-- INSERT --` 字样消失，输入 `:wq` ,回车执行，文件修改保存并返回。

```shell
{
    "server":"服务器IP",
    "local_address":"127.0.0.1",  
    "local_port":1080,
    "port_password": {
        "2333":"我是密码"
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-6.png" /> 

到这里，我们的shadowsocks就配置完成了，接下来我们需要知道如何启动、关闭shadowsocks服务。

启动shadowsocks服务：

```shell
ssserver -c /etc/shadowsocks.json -d start
```

关闭shadowsocks服务：

```shell
ssserver -c /etc/shadowsocks.json -d stop
```

重启shadowsocks服务：

```shell
ssserver -c /etc/shadowsocks.json -d restart
```

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-7.png" /> 

最后，我们希望在主机启动后，便开启shadowsocks服务。  

```shell
vi /etc/rc.local
```

打开文件后，在文件中添加以下命令，保存修改即可。（操作参考上面的shadowsocks配置）

```shell
ssserver -c /etc/shadowsocks.json -d start
```

到这里，shadowsocks的环境搭建就基本完成了。下面我们就可以在不同的端（Windows、OS X、Linux、IOS、Android等）连接使用了。对于不同端的使用，详细的可以[查看这里][4]。  

## Windows环境使用

主机环境搭建完成之后，我们需要在不同端连接使用VPN，最常用的端就是Windows环境的PC端了。  
首先，我们需要去[下载Windows环境下的shadowsocks][5]。

解压后，运行 `Shadowsocks.exe` ，按照之前服务器主机的配置，填入`服务器IP`、`端口号`和`连接密码`，确定即可。  

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-8.png" /> 

启动后，可以在任务栏右下角看到一个小飞机的图标，右键，可以勾选`启动系统代理`，也可以选择代理的模式：`PAC代理` 和 `全局代理`。使用的话，请选择`PAC代理`，毕竟正常使用时，访问国内的网站比较多，这样更节省流量且不影响访问国内网络。  

> **PAC代理** 会在你连接网站的时候读取PAC文件里的规则，来确定你访问的网站有没有被墙，如果符合，那就会使用代理服务器连接网站，而PAC列表一般都是从GFWList更新的。GFWList定期会更新被墙的网站。  
> **全局模式** 是设置你的系统代理的代理服务器，使你的所有http/socks数据经过代理服务器的转发送出。而只有支持socks5或者使用系统代理的软件才能使用Shadowsocks。

## IOS环境使用

苹果手机使用的话，因为政策上的一些限制（你懂的），我们无法直接下载到Shadowsocks相关的IOS软件。之前还能在PP助手或者爱思助手等平台上下载安装到类似 `Shadowrocket` 的软件，最近好像就不行了。  
但是，如果之前有下载过这些软件的IPA包，依旧可以通过PP助手安装本地安装包。这里就不多说了，需要安装包的可以联系下。  
安装完成之后，点击右上角的加号，就可以添加我们的节点。和之前Windows的设置一样，填写完成下面的参数之后，开启代理就可以了。  

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-9.jpg" />

## 安卓环境

对比苹果，安卓版就简单多了，这里用的是`shadowsock`，同样是在网上找到对应的APK包，比如这个 [shadowsock][6] ，安装上，点击右上角的加号，添加配置。  

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-10.png" />

我没有安卓手机，只用用模式器看看了。

# 后记

简单记录下，小飞机的搭建。  
最后，如果你也需要搭建，请合理合法地使用VPN，不然会被请去喝茶！  

---  

[1]: https://bwh88.net/  
[2]: https://putty.en.softonic.com/
[3]: https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E
[4]: https://github.com/shadowsocks/shadowsocks/wiki/Ports-and-Clients
[5]: https://github.com/shadowsocks/shadowsocks-windows/releases/download/4.1.3/Shadowsocks-4.1.3.zip
[6]: https://apkbe.com/zh/apk/3418-com.github.shadowsocks