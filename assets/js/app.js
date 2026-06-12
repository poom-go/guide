(function () {
  const registryConfig = window.PAGE_REGISTRY || { defaultPageKey: "home", pages: {} };
  const pages = registryConfig.pages || {};

  const contentArea = document.getElementById("content-area");
  const sidebarRoot = document.querySelector(".menu-group");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getSidebarLinkInfo(link) {
    const title = (link.textContent || "").trim();
    const menuItem = link.closest(".menu-item");
    const section = (menuItem?.querySelector(".menu-title")?.textContent || "").trim() || "가이드";
    return { title, section };
  }

  function registerSidebarFallbackPages() {
    if (!sidebarRoot) return;

    const sidebarLinks = sidebarRoot.querySelectorAll(".submenu a[data-page]");

    sidebarLinks.forEach((link) => {
      const pageKey = link.dataset.page;
      if (!pageKey || pages[pageKey]) return;

      const { title, section } = getSidebarLinkInfo(link);

      pages[pageKey] = {
        title,
        section,
        mode: "inline",
        description: "상세 문서가 아직 연결되지 않은 메뉴입니다.",
        html: `
          <div class="guide-placeholder-page">
            <div class="guide-section">
              <h2>${escapeHtml(title)}</h2>
              <p>
                현재 이 메뉴는 사이드바 구조와 순서를 유지하기 위해 먼저 연결만 된 상태입니다.
                상세 안내가 준비되면 별도 HTML 파일을 만들고
                <span class="guide-inline-code">page.registry.js</span>에 경로만 추가하면 됩니다.
              </p>
            </div>

            <div class="guide-section">
              <h3>다음 작업 추천</h3>
              <ul class="guide-list">
                <li>이 메뉴 전용 partial 파일 생성</li>
                <li>이미지/표/단계 설명이 있으면 HTML로 분리</li>
                <li>registry에서 inline → partial 방식으로 전환</li>
              </ul>
            </div>
          </div>
        `
      };
    });
  }

  function buildBreadcrumb(page) {
    return `홈 / ${escapeHtml(page.section || "가이드")} / ${escapeHtml(page.title || "")}`;
  }

  function buildCards(cards = []) {
    if (!cards.length) return "";

    return `
      <div class="guide-card-grid">
        ${cards
          .map(
            (card) => `
            <a href="#" class="guide-card" data-page="${escapeHtml(card.key)}">
              <h3 class="guide-card-title">${escapeHtml(card.title)}</h3>
              <p class="guide-card-summary">${escapeHtml(card.summary || "")}</p>
            </a>
          `
          )
          .join("")}
      </div>
    `;
  }

  function buildShell(page, bodyHtml) {
    return `
      <section class="guide-shell">
        <div class="guide-header">
          <div class="guide-breadcrumb">${buildBreadcrumb(page)}</div>
          <h1 class="guide-title">${escapeHtml(page.title || "")}</h1>
          ${page.description ? `<p class="guide-description">${escapeHtml(page.description)}</p>` : ""}
        </div>
        <div class="guide-body">
          ${bodyHtml}
        </div>
      </section>
    `;
  }

  function buildErrorPage(message) {
    return `
      <section class="guide-shell">
        <div class="guide-header">
          <div class="guide-breadcrumb">오류</div>
          <h1 class="guide-title">페이지를 불러올 수 없습니다</h1>
          <p class="guide-description">${escapeHtml(message)}</p>
        </div>
      </section>
    `;
  }

  async function loadPageBody(page) {
    if (page.mode === "inline") {
      return page.html || "";
    }

    if (page.mode === "partial" && page.path) {
      const response = await fetch(page.path);
      if (!response.ok) {
        throw new Error(`파일 로드 실패: ${page.path}`);
      }
      return await response.text();
    }

    return `
      <div class="guide-section">
        <p>페이지 본문이 아직 설정되지 않았습니다.</p>
      </div>
    `;
  }

  function closeAllMenus() {
    if (!sidebarRoot) return;
    sidebarRoot.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("is-open");
      const button = item.querySelector(".menu-button");
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }

  function updateActiveMenu(pageKey) {
    if (!sidebarRoot) return;

    sidebarRoot.querySelectorAll(".submenu a").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.page === pageKey);
    });

    closeAllMenus();

    const activeLink = sidebarRoot.querySelector(`.submenu a[data-page="${pageKey}"]`);
    if (activeLink) {
      const parentMenuItem = activeLink.closest(".menu-item");
      if (parentMenuItem) {
        parentMenuItem.classList.add("is-open");
        const button = parentMenuItem.querySelector(".menu-button");
        if (button) button.setAttribute("aria-expanded", "true");
      }
    }
  }

  function setHash(pageKey) {
    const nextHash = `#/${pageKey}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  }

  async function renderPage(requestedPageKey, options = {}) {
    const { updateHash = true } = options;
    const fallbackKey = registryConfig.defaultPageKey || "home";
    const resolvedKey = pages[requestedPageKey] ? requestedPageKey : fallbackKey;
    const page = pages[resolvedKey];

    if (!page) {
      contentArea.innerHTML = buildErrorPage("기본 페이지 설정을 확인해주세요.");
      return;
    }

    try {
      let bodyHtml = await loadPageBody(page);

      if (page.type === "hub") {
        bodyHtml += buildCards(page.cards || []);
      }

      contentArea.innerHTML = buildShell(page, bodyHtml);
      updateActiveMenu(resolvedKey);

      if (updateHash) {
        setHash(resolvedKey);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      contentArea.innerHTML = buildErrorPage("페이지 파일 경로 또는 파일 존재 여부를 확인해주세요.");
    }
  }

  function handleMenuToggle(button) {
    const menuItem = button.closest(".menu-item");
    if (!menuItem) return;

    const isOpen = menuItem.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  }

  function openModal(title, html) {
    if (!modalOverlay || !modalTitle || !modalBody) return;
    modalTitle.textContent = title || "안내";
    modalBody.innerHTML = html || "";
    modalOverlay.classList.add("is-open");
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("is-open");
  }

  function handleDocumentClick(event) {
    const pageLink = event.target.closest("[data-page]");
    if (pageLink) {
      event.preventDefault();
      const pageKey = pageLink.dataset.page;
      renderPage(pageKey);
      return;
    }

    const menuButton = event.target.closest(".menu-button");
    if (menuButton) {
      handleMenuToggle(menuButton);
      return;
    }

    const modalTrigger = event.target.closest("[data-modal-title]");
    if (modalTrigger) {
      event.preventDefault();
      const title = modalTrigger.dataset.modalTitle || "안내";
      const content = modalTrigger.dataset.modalContent || "";
      openModal(title, content);
      return;
    }

    if (event.target === modalOverlay || event.target === modalClose) {
      closeModal();
    }
  }

  function readHashPageKey() {
    return window.location.hash.replace(/^#\//, "").trim() || registryConfig.defaultPageKey || "home";
  }

  function onHashChange() {
    renderPage(readHashPageKey(), { updateHash: false });
  }

  function initMenuState() {
    document.querySelectorAll(".menu-button").forEach((button) => {
      const menuItem = button.closest(".menu-item");
      const isOpen = menuItem?.classList.contains("is-open") || false;
      button.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function initModalEvents() {
    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  function init() {
    registerSidebarFallbackPages();
    initMenuState();
    initModalEvents();
    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
