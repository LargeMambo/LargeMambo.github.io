(function () {
  function initAvatarSpin() {
    const avatar = document.querySelector('.card-info .avatar-img img');
    if (!avatar || avatar._spinBound) return;
    avatar._spinBound = true;

    function triggerSpin() {
      avatar.classList.remove('avatar-spinning');
      // 强制回流，让 animation 重新触发
      void avatar.offsetWidth;
      avatar.classList.add('avatar-spinning');
    }

    avatar.addEventListener('mouseenter', triggerSpin);
    avatar.addEventListener('mouseleave', triggerSpin);
    avatar.addEventListener('animationend', () => {
      avatar.classList.remove('avatar-spinning');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarSpin);
  } else {
    initAvatarSpin();
  }
  document.addEventListener('pjax:complete', initAvatarSpin);
})();
