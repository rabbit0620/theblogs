(function() {
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const button = document.getElementById('search-button');
  let fuse;

  // 加载索引
  fetch('/index.json')
    .then(res => res.json())
    .then(data => {
      fuse = new Fuse(data, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'summary', weight: 0.3 },
          { name: 'content', weight: 0.2 },
          { name: 'tags', weight: 0.05 },
          { name: 'categories', weight: 0.05 }
        ],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 1,
        useExtendedSearch: true
      });

      // 读取 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        input.value = query;
        performSearch(query);
      }
    })
    .catch(err => console.error('搜索索引加载失败:', err));

  // 执行搜索
  function performSearch(query) {
    if (!fuse || !query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }
    const results = fuse.search(query.trim());
    let html = '';
    if (results.length === 0) {
      html = '<p class="no-results">没有找到相关文章</p>';
    } else {
      results.forEach(r => {
        const item = r.item;
        html += `<div class="search-result-item">
          <a href="${item.permalink}">${escapeHtml(item.title)}</a>
          <span class="search-result-date">${item.date}</span>
          <div class="search-result-snippet">${highlightMatches(item.summary, r.matches)}</div>
        </div>`;
      });
    }
    resultsContainer.innerHTML = html;
  }

  // 搜索按钮点击
  if (button) {
    button.addEventListener('click', function() {
      const q = input.value.trim();
      if (q) {
        // 更新 URL 并重新搜索
        const newUrl = window.location.pathname + '?q=' + encodeURIComponent(q);
        window.history.pushState({}, '', newUrl);
        performSearch(q);
      }
    });
  }

  // 回车键
  if (input) {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        button.click();
      }
    });
  }

  // 辅助函数
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightMatches(text, matches) {
    if (!matches || matches.length === 0) return escapeHtml(text.substring(0, 120)) + '…';
    let highlighted = '';
    let lastIndex = 0;
    matches.forEach(match => {
      match.indices.forEach(indices => {
        const [start, end] = indices;
        highlighted += escapeHtml(text.substring(lastIndex, start));
        highlighted += '<mark>' + escapeHtml(text.substring(start, end + 1)) + '</mark>';
        lastIndex = end + 1;
      });
    });
    highlighted += escapeHtml(text.substring(lastIndex, lastIndex + 120));
    return highlighted + '…';
  }
})();
