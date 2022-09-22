---
title: 关于构建本站的一些话
date: 2021-09-23
layout: note.hbs
path: website-metalsmith
index: 0
banner: /image/note/2021/saen.jpg
summary: 关于构建本站的一些细节，以及metalsmith挺好的
target: /note/2021/website-metalsmith.html
---

# 本站构想

![World of Warships](/image/note/2021/saen.jpg)

不知道是什么时候看到的一个腾讯云的广告，整了个上海的5M的vps，然后想想就顺道开了个域名备了个案。

## 备案

备案确实是挺麻烦的，需要等上一些时间，我是在腾讯云备了案，ICP备案需要等差不多半个月吧

总归还是备案下来了，然后备案完还有个公安备案也一起整了。公安备案里就选了非交互的网站吧，据说比较容易批。

## 建站

之前经常听过朋友的想法，搞一个静态网站就行了，简单点好。

所以就搞静态的，然后看到之前一个hexo的就是跳转没刷新页面很好奇，就去研究了一下，就照着思路搞了本站。

在本站所有的文章页面都会带有文章的目录树，这样切回首页就不用重新请求页面了，直接把目录展示出来然后隐藏掉文章。

然后点目录的文章时就发起请求去请求文章的html把里面文章的内容筛选下来展示出来→_→。嗯→_→


## metalsmith

本站用的[metalsmith](https://metalsmith.io/)来生成的页面，metalsmith的思想是用handlebars等各种插件来把文章转化成页面。

因为我这里要生成目录是动态的，所以我在生成页面之后加入了组件，先渲染好组件。

就这样，我整了个comp，可以通过本站的html内容可以看到一些猫腻（2333

当然了，github上可以看源码的->[mkz-life](https://github.com/Amarillys/mkz-life)