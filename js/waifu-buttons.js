(function () {
  const TALK_MSGS = [
    '你好呀，今天也要加油哦！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧',
    '有什么我能帮你的吗？',
    '主人，今天过得怎么样～',
    '记得多喝水，注意休息哦！',
    '要不要看看最新的文章？',
    '喵～我在这里呢！',
    '今天也是元气满满的一天！',
    '有没有什么有趣的事情发生？',
  ];

  const EXPRESSIONS = [
    { name: 'heart_eyes', msg: '爱心眼～ (♡ω♡)' },
    { name: 'blush',      msg: '脸好红啊，不许看！(〃∀〃)' },
    { name: 'flower',     msg: '今天心情很好！开花了～ ✿' },
    { name: 'sweat',      msg: '啊这……有点慌(汗)' },
    { name: 'question',   msg: '？？？这是什么情况' },
    { name: 'helmet',     msg: '备战状态！冲鸭！⚔️' },
    { name: 'tube',       msg: '哈～吹个彩纸！🎉' },
  ];

  function showTip(text) {
    const tips = document.getElementById('waifu-tips');
    if (!tips) return;
    tips.innerHTML = text;
    tips.classList.add('waifu-tips-active');
    clearTimeout(tips._hideTimer);
    tips._hideTimer = setTimeout(() => {
      tips.classList.remove('waifu-tips-active');
    }, 4000);
  }

  let exprIndex = 0;
  function triggerNextExpression() {
    const expr = EXPRESSIONS[exprIndex % EXPRESSIONS.length];
    exprIndex++;
    showTip(expr.msg);
    if (window.live2d && window.live2d.randomExpression) {
      window.live2d.randomExpression();
    }
  }

  function injectButtons() {
    const waifu = document.getElementById('waifu');
    if (!waifu || document.getElementById('waifu-buttons')) return;

    const wrap = document.createElement('div');
    wrap.id = 'waifu-buttons';

    // ✨ 随机表情
    const btnExpr = document.createElement('button');
    btnExpr.id = 'waifu-btn-expr';
    btnExpr.textContent = '✨';
    btnExpr.title = '随机表情';
    btnExpr.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerNextExpression();
    });

    // ✕ 关闭
    const btnClose = document.createElement('button');
    btnClose.id = 'waifu-btn-close';
    btnClose.textContent = '✕';
    btnClose.title = '关闭';
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      const quitBtn = document.getElementById('waifu-tool-quit');
      if (quitBtn) quitBtn.click();
      else waifu.style.display = 'none';
      updateWakeBtn();
    });

    wrap.appendChild(btnExpr);
    wrap.appendChild(btnClose);
    waifu.appendChild(wrap);

    let hideTimer = null;
    function showButtons() {
      clearTimeout(hideTimer);
      wrap.classList.add('visible');
    }
    function scheduleHide() {
      hideTimer = setTimeout(() => wrap.classList.remove('visible'), 300);
    }
    waifu.addEventListener('mouseenter', showButtons);
    waifu.addEventListener('mouseleave', scheduleHide);
    wrap.addEventListener('mouseenter', showButtons);
    wrap.addEventListener('mouseleave', scheduleHide);
  }

  // ---------- 右下角唤起按钮 ----------
  function injectWakeBtn() {
    if (document.getElementById('waifu-wake-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'waifu-wake-btn';
    btn.title = '唤起看板娘';
    btn.innerHTML = '🐱';
    btn.addEventListener('click', () => {
      const toggle = document.getElementById('waifu-toggle');
      if (toggle) {
        toggle.classList.remove('waifu-toggle-active');
        toggle.click();
      }
      btn.classList.remove('visible');
    });

    // 插入到 #rightside 最前面
    const rightside = document.getElementById('rightside');
    if (rightside) {
      rightside.insertBefore(btn, rightside.firstChild);
    } else {
      document.body.appendChild(btn);
    }
    updateWakeBtn();
  }

  function updateWakeBtn() {
    const btn = document.getElementById('waifu-wake-btn');
    if (!btn) return;
    const waifu = document.getElementById('waifu');
    // 当 waifu 隐藏（display:none）或 toggle 处于激活状态（意味着 waifu 已退出）时显示唤起按钮
    const toggle = document.getElementById('waifu-toggle');
    const waifuHidden = !waifu || waifu.style.display === 'none';
    const toggleActive = toggle && toggle.classList.contains('waifu-toggle-active');
    if (waifuHidden || toggleActive) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  // 监听 waifu 元素的显示状态变化
  function observeWaifuVisibility() {
    const target = document.getElementById('waifu');
    if (!target) return;
    const mo = new MutationObserver(updateWakeBtn);
    mo.observe(target, { attributes: true, attributeFilter: ['style'] });
    const toggle = document.getElementById('waifu-toggle');
    if (toggle) mo.observe(toggle, { attributes: true, attributeFilter: ['class'] });
  }

  // 等 Live2D 初始化完成后注入
  let tries = 0;
  function tryInject() {
    if (document.getElementById('waifu')) {
      injectButtons();
      injectWakeBtn();
      observeWaifuVisibility();
      return true;
    }
    return false;
  }

  const timer = setInterval(() => {
    if (tryInject()) { clearInterval(timer); return; }
    if (++tries > 60) clearInterval(timer);
  }, 500);

  document.addEventListener('pjax:complete', () => {
    tries = 0;
    const t2 = setInterval(() => {
      if (tryInject()) { clearInterval(t2); return; }
      if (++tries > 60) clearInterval(t2);
    }, 500);
  });
})();
