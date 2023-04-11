---
title: 【VPN】V2Ray搭建自用 VPN
subtitle: 运用搬瓦工VPS 和 V2Ray搭建自用 VPN
keyword: V2Ray, VPN, 搬瓦工, 翻墙
date: 2019-06-20 14:10:00
---

# 前言

前面我们已经写过[基于 shadowsocks 小飞机搭建 VPN][1]了，但是由于国内封的频繁，所以并不稳定。这里重新尝试了使用[V2Ray][2]，重新构建自用的 VPN。目前使用一切 ok，访问也算 ok。

> V2Ray（也简称 V2），是 Victoria Raymond 开发的 Project V 下的一个工具。Project V 是一个工具集合，号称可以帮助其使用者打造专属的基础通信网络。Project V 的核心工具称为 V2Ray，其主要负责网络协议和功能的实现，与其它 Project V 通信。V2Ray 可以单独运行，也可以和其它工具配合，以提供简便的操作流程。开发过程主要使用 Go 语言，Core 采用 MIT 许可证并开放源代码。
> 在中国大陆，本工具广泛用于突破防火长城（GFW），以访问被封锁和屏蔽的内容。

<svg id="mermaidChart0" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 373.578125 289" style="max-width:373.578125px;">

<style client>
  #mermaidChart0 .node > rect { ; }
  #mermaidChart0 .node text  { fill:#000; stroke:none; font-weight:300; font-size:14px; }
  #mermaidChart0 .edgeLabel text  { fill:#000; stroke:none; font-weight:300; font-size:14px; }
  #mermaidChart0 .cluster rect  { rx:4px; fill: rgb(255, 255, 222); rx: 4px; stroke: rgb(170, 170, 51); stroke-width: 1px; }
  .markdown-section * { box-sizing: border-box; font-size: inherit;}
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; text-size-adjust: none; -webkit-font-smoothing: antialiased;}
  .mermaid .label { color: rgb(51, 51, 51);}
  .node rect, .node circle, .node ellipse, .node polygon { fill: rgb(236, 236, 255); stroke: rgb(204, 204, 255); stroke-width: 1px;}
  .arrowheadPath { fill: rgb(51, 51, 51);}
  .edgePath .path { stroke: rgb(51, 51, 51);}
  .edgeLabel { background-color: rgb(232, 232, 232);}
</style>
<g><g class="output"><g class="clusters"></g><g class="edgePaths"><g class="edgePath" style="opacity: 1;"><path class="path" d="M50.153141801075265,113L84.59375,41.5L126.875,41.5" marker-end="url(https://www.v2ray.com/chapter_00/workflow.html#arrowhead1)" style="stroke: #333; fill:none;stroke-width:2px;stroke-dasharray:3;"></path><defs><marker id="arrowhead1" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 0 0 L 0 0 z" style="fill: #333"></path></marker></defs></g><g class="edgePath" style="opacity: 1;"><path class="path" d="M189.484375,41.5L231.765625,41.5L265.8550067204301,66.5" marker-end="url(https://www.v2ray.com/chapter_00/workflow.html#arrowhead2)" style="stroke: #333; fill:none;stroke-width:2px;stroke-dasharray:3;"></path><defs><marker id="arrowhead2" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g><g class="edgePath" style="opacity: 1;"><path class="path" d="M59.59375,134.5L84.59375,134.5L109.59375,134.5" marker-end="url(https://www.v2ray.com/chapter_00/workflow.html#arrowhead3)" style="fill:none"></path><defs><marker id="arrowhead3" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g><g class="edgePath" style="opacity: 1;"><path class="path" d="M206.765625,134.5L231.765625,134.5L265.8550067204301,109.5" marker-end="url(https://www.v2ray.com/chapter_00/workflow.html#arrowhead4)" style="fill:none"></path><defs><marker id="arrowhead4" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g><g class="edgePath" style="opacity: 1;"><path class="path" d="M50.153141801075265,156L84.59375,227.5L119.7734375,227.5" marker-end="url(https://www.v2ray.com/chapter_00/workflow.html#arrowhead5)" style="fill:none"></path><defs><marker id="arrowhead5" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="strokeWidth" markerWidth="8" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowheadPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"></path></marker></defs></g></g><g class="edgeLabels"><g class="edgeLabel" transform="" style="opacity: 1;"><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="" style="opacity: 1;"><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="" style="opacity: 1;"><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="" style="opacity: 1;"><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="" style="opacity: 1;"><g transform="translate(0,0)" class="label"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node" id="A" transform="translate(39.796875,134.5)" style="opacity: 1;"><rect rx="5" ry="5" x="-19.796875" y="-21.5" width="39.59375" height="43"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-9.796875,-11.5)"><foreignObject width="19.59375" height="23"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">PC</div></foreignObject></g></g></g><g class="node" id="B" transform="translate(158.1796875,41.5)" style="opacity: 1;"><rect rx="5" ry="5" x="-31.3046875" y="-21.5" width="62.609375" height="43"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-21.3046875,-11.5)"><foreignObject width="42.609375" height="23"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">防火墙</div></foreignObject></g></g></g><g class="node" id="C" transform="translate(295.171875,88)" style="opacity: 1;"><rect rx="5" ry="5" x="-38.40625" y="-21.5" width="76.8125" height="43"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-28.40625,-11.5)"><foreignObject width="56.8125" height="23"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">墙外网站</div></foreignObject></g></g></g><g class="node" id="D" transform="translate(158.1796875,134.5)" style="opacity: 1;"><rect rx="5" ry="5" x="-48.5859375" y="-21.5" width="97.171875" height="43"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-38.5859375,-11.5)"><foreignObject width="77.171875" height="23"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">V2Ray/VPS</div></foreignObject></g></g></g><g class="node" id="E" transform="translate(158.1796875,227.5)" style="opacity: 1;"><rect rx="5" ry="5" x="-38.40625" y="-21.5" width="76.8125" height="43"></rect><g class="label" transform="translate(0,0)"><g transform="translate(-28.40625,-11.5)"><foreignObject width="56.8125" height="23"><div xmlns="http://www.w3.org/1999/xhtml" style="display: inline-block; white-space: nowrap;">墙内网站</div></foreignObject></g></g></g></g></g></g></svg>
<p class="image-tips">来自V2Ray官网</p>

# 正文

## 购买 VPS

首先，我们需要有一个服务器，**可以访问外网** ，这一点很重要，主机在国内的，如阿里云，腾讯云一般不行，部分香港主机可以，这里运用的搬瓦工的 VPS 主机。可以 [去这里][1] 选择购买。对于搭建 VPN 而言，要求的配置不高，所以我们选择最便宜的那款 VPS，之前会有 _$19.99/年_ 的套餐，目前都涨价了。最便宜的套餐大概 _$49.99/年_，购买时，会有优惠码提供一定的优惠。可以自行百度下搬瓦工优惠码，最高优惠力度大概 6.58%，优惠码为：**BWH3HYATVBJW** （截止 2019-08 有效）。

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-1.png" />
<p class="image-tips">搬瓦工官网套餐</p>

购买完毕后，我们在控制台可以查看**主机 IP**。然后需要去安装系统镜像，这里推荐选择**centos-7-x86_64-bbr**。安装完毕后，会有提供**root 密码**和**服务器 SSH 端口**。

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-2.png" />

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/vpn-shadowsocks-3.png" />
<p class="image-tips">搬瓦工控制台</p>

## 安装 V2Ray

虽然官方有详细的安装教程，这里并不使用[官方的教程][3]，毕竟是菜鸟。所以直接使用[大佬提供的一键安装脚本][4]。此脚本是开源的，感兴趣的可以看下，[代码在此][5]，所以并不会隐藏挖矿脚本。关于被当肉机挖矿，就很难受了 😣。

使用 root 用户输入下面命令安装或卸载

```bash
bash <(curl -s -L https://git.io/v2ray.sh)
```

> 如果提示 curl: command not found ，那是因为你的 VPS 没装 Curl
> ubuntu/debian 系统安装 Curl 方法: apt-get update -y && apt-get install curl -y
> centos 系统安装 Curl 方法: yum update -y && yum install curl -y
> 安装好 curl 之后就能安装脚本了

安装完成后，输入 `v2ray` 即可管理 V2Ray 如果提示你的系统不支持此脚本，那么请尝试更换系统。下面是安装选项截图

<img class="shadow" alt="加载失败！" src="https://camo.githubusercontent.com/db094f4fd3f49c9e690075abbfd697784e8741a7f22cfaff8e078c39533443a5/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30312f30352f356333303532323463666530352e6a7067" />
<p class="image-tips">233vpn.com</p>

你可以同时配置 Shadowsocks

<img class="shadow" alt="加载失败！" src="https://camo.githubusercontent.com/aa3a6b8b1619e873af31012ff31b34719eb7e581e79bf807102de48bf98d5f58/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30312f30352f356333303532323461643131632e6a7067" />
<p class="image-tips">233vpn.com</p>

安装完成

<img class="shadow" alt="加载失败！" src="https://camo.githubusercontent.com/cffb2ead2937f6b36df1d02ec53ce95b7a59250939a72c1b3c1ee6858562d92c/68747470733a2f2f692e6c6f6c692e6e65742f323031392f30312f30352f356333303532323462626437352e6a7067" />
<p class="image-tips">233vpn.com</p>

## Mac 客户端

目前大部分都为收费的客户端，这里推荐一个免费 [V2rayU][6]. 支持协议方式也很多，这里推荐 `vmess://` .

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/mac-v2rayu.png" />
<p class="image-tips">V2rayU</p>

## Window10 客户端

window 环境下的客户端倒是有一些，这里推荐 [v2rayN][7], 和上面一样，使用 `vmess://`.

<img class="shadow" alt="加载失败！" src="/img/article/vpn-shadowsocks/win10-v2rayu.jpeg" />
<p class="image-tips">v2rayN</p>

## IOS 客户端

手机就比较复杂了，国内无法下载相关的客户端。修改 App Store 账户区域为加拿大（Canada），支付方式选为 None，然后搜索 `91VPN` ,可以免费下载，安装完毕之后再切换回来。
App 提供有收费的节点，但是我们可以自己添加自己的节点，按照 `vmess://` 方式配置好，即可。

暂无图片

## 安卓客户端

无安卓手机，暂时未实践

# 后记

请合理使用 VPN。

[1]: https://fangzhioo.github.io/technical/technical/vpn-shadowsocks/
[2]: https://www.v2ray.com/
[3]: https://www.v2ray.com/chapter_00/install.html
[4]: https://github.com/233boy/v2ray/wiki/V2Ray%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E8%84%9A%E6%9C%AC
[5]: https://github.com/233boy/v2ray/blob/master/v2ray.sh
[6]: https://github.com/yanue/V2rayU/wiki/V2rayU%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E
[7]: https://github.com/2dust/v2rayN/releases
