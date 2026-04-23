function generateNavigation() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  const navHTML = `
    <div class="sidebar-header">
      <div class="logo">PROJECT ARCHIVE</div>
      <div class="project-name"><br>公開ドキュメント</div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-group">
        <div class="nav-group-title">公開ページ</div>
        <a href="./index.html"><span class="nav-number">01</span> 企画提案書</a>
        <a href="./02-market-research.html"><span class="nav-number">02</span> マーケットリサーチ</a>
        <a href="./03-persona.html"><span class="nav-number">03</span> ペルソナシート</a>
        <a href="./04-sitemap.html"><span class="nav-number">04</span> サイトマップ</a>
        <a href="./05-wireframe.html"><span class="nav-number">05</span> ワイヤーフレーム</a>
        <a href="./06-design-guide.html"><span class="nav-number">06</span> デザインガイドライン</a>
      </div>
    </nav>
    <div class="sidebar-footer">
      &copy; Project Archive 2026
    </div>
  `;

  sidebar.innerHTML = navHTML;
}

document.addEventListener('DOMContentLoaded', () => {
  generateNavigation();

  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) &&
          !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });

    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove('open');
        }
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.endsWith(currentPage) || (currentPage === 'index.html' && href === './index.html'))) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.prompt-box').forEach(box => {
    const promptText = box.querySelector('.prompt-text');
    if (promptText) {
      promptText.style.cursor = 'pointer';
      promptText.title = 'クリックしてコピー';

      promptText.addEventListener('click', () => {
        const text = promptText.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const originalBg = promptText.style.background;
          promptText.style.background = '#d1fae5';
          promptText.style.transition = 'background 0.3s';
          setTimeout(() => {
            promptText.style.background = originalBg || '#fff';
          }, 500);
        });
      });
    }
  });

  document.querySelectorAll('.toc-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
