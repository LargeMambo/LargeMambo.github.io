/* ============================================
   Custom JS
   ============================================ */

(function() {
  'use strict';

  function init() {
    loaderFade();
    consoleArts();
    webinfoEnhance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---------- 1. 页面加载动画淡出 ----------
  function loaderFade() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', function() {
      setTimeout(function() { loader.classList.add('hidden'); }, 150);
    });
    setTimeout(function() {
      if (loader && !loader.classList.contains('hidden')) loader.classList.add('hidden');
    }, 4000);
  }

  // ---------- 2. Console 彩蛋 ----------
  function consoleArts() {
    console.log('%c   /\\_/\\  ', 'color:#f7b267;font-size:18px;');
    console.log('%c  ( o.o ) ', 'color:#f7b267;font-size:18px;');
    console.log('%c   > ^ <  ', 'color:#f7b267;font-size:18px;');
    console.log('%c  LKY Blog', 'color:#6c63ff;font-size:14px;font-weight:bold;');
  }

  // ---------- 3. 网站信息卡增强（文章数、运行时间、总字数、最近更新） ----------
  function webinfoEnhance() {
    // 找到网站信息卡的列表项
    checkExist();

    function checkExist() {
      var info = document.querySelector('.card-webinfo .webinfo');
      if (!info) {
        setTimeout(checkExist, 500);
        return;
      }

      // 1. 运行时间 — 从 card-webinfo 获取 runtime_date 属性或使用自定义时间
      var runtimeItem = info.querySelector('.webinfo-item:has(.fa-clock)');
      if (!runtimeItem) {
        // 如果 Butterfly 没显示运行时间，手动创建一个
        var startDate = new Date('2023-01-01 00:00:00');
        var li = document.createElement('li');
        li.className = 'webinfo-item';
        li.innerHTML = '<i class="fas fa-clock"></i> 已度过 ' + calcRuntime(startDate);
        info.appendChild(li);
        // 每秒更新
        setInterval(function() {
          li.innerHTML = '<i class="fas fa-clock"></i> 已度过 ' + calcRuntime(startDate);
        }, 1000);
      }

      // 2. 总字数 — 检查是否已显示
      var wordcountItem = info.querySelector('.webinfo-item:has(.fa-wordpress)');
      if (!wordcountItem) {
        // 如果 hexo-wordcount 已启用，Butterfly 自带了 totalwordcount
        // 这里不需要重复添加
      }

      // 3. 最近更新时间增强
      var updateItem = info.querySelector('.webinfo-item:has(.fa-pencil-alt)');
      if (updateItem) {
        // 已经存在，不需要操作
      }
    }

    function calcRuntime(start) {
      var s = Math.floor((new Date() - start) / 1000);
      var y = Math.floor(s / (365 * 24 * 3600)); s -= y * 365 * 24 * 3600;
      var d = Math.floor(s / (24 * 3600)); s -= d * 24 * 3600;
      var h = Math.floor(s / 3600); s -= h * 3600;
      var m = Math.floor(s / 60), sec = s % 60;
      var p = function(n) { return n < 10 ? '0' + n : n; };
      return y + '年' + p(d) + '天 ' + p(h) + ':' + p(m) + ':' + p(sec);
    }
  }

})();
