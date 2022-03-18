'use strict';
{
  function inViewCallback(entries, obs) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('appear');
      // 監視対象から外す
      obs.unobserve(entry.target);
    });
  }

  function onScrollCallback(entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add('scrolled')
        toTop.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
        toTop.classList.remove('scrolled')
      }
    });
  }
  const header = document.querySelector('header');
  const toTop = document.getElementById('to_top');
  toTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })

  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });

  document.querySelectorAll('.animate').forEach(el => {
    inViewObserver.observe(el);
  });


  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.getElementById('target'));
}