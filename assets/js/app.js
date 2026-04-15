const contentArea = document.getElementById("content-area");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

const modalContents = {
  notice: {
    title: "유의사항",
    body: `
      <div class="notice-box">
        <p>
N배송으로 출고되는 상품(SKU)은 품고 시스템이 아닌 스마트스토어를 통해 등록해야 합니다.
해당 화면에서 SKU 추가 버튼이 노출되더라도 스마트스토어 연동 등록에는 반영되지 않으므로, 실제 등록 용도로는 사용할 수 없는 기능으로 이해해 주세요.
        </p>
      </div>
      <p>
즉, N배송 운영 SKU는 품고 내 직접 등록이 아니라 판매처 기준으로 먼저 생성 및 연동되는 구조입니다.
등록이 필요한 경우 스마트스토어에서 먼저 생성한 뒤 연동 상태를 확인해 주세요.
      </p>
    `
  },
  rename: {
    title: "SKU명 수정",
    body: `
      <div class="notice-box">
        <div class="sub-title">[초도입고 전]</div>
        <p>
스마트스토어에 등록된 SKU명의 수정이 필요한 경우, 품고 시스템에서 수정 시 반영될 수 있습니다.
다만 타 풀필먼트를 통해 출고된 SKU는 품고에서 수정하더라도 스마트스토어에 반영되지 않을 수 있으므로, 해당 건은 네이버 직계약 물류지원센터를 통해 수정 요청해 주세요.
        </p>
      </div>

      <div class="notice-box">
        <div class="sub-title">[초도 입고 후]</div>
        <p>
품고에 한 번이라도 입고된 SKU의 경우, 품고 시스템에서 SKU명을 수정하더라도 스마트스토어에는 반영되지 않습니다.
이 경우 수정된 명칭은 품고 전산 내에서만 변경되어 노출됩니다.
        </p>
      </div>
    `
  },
  obsolete: {
    title: "불용 처리 방법",
    body: `
      <div class="notice-box">
        <p>
더 이상 품고에서 운영하지 않는 SKU는 반드시 불용 처리해 주셔야 합니다.
불용 처리가 되지 않을 경우 시스템상 추가 입고 예정 SKU로 인식되어 CELL 보관료가 계속 청구될 수 있습니다.
        </p>
      </div>
      <p>
추가 입고 계획이 없는 SKU는 운영 종료 시점에 맞춰 반드시 불용 처리해 주세요.
불필요한 보관료 발생 방지를 위해 정기적으로 SKU 운영 상태를 점검하는 것을 권장드립니다.
      </p>
    `
  }
};

function bindSidebarToggle() {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const button = item.querySelector(".menu-button");
    const submenu = item.querySelector(".submenu");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      menuItems.forEach((otherItem) => {
        otherItem.classList.remove("open");
        const otherSubmenu = otherItem.querySelector(".submenu");
        if (otherSubmenu) otherSubmenu.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    });
  });
}

async function loadPage(pageName) {
  const response = await fetch(`./pages/${pageName}.html`);
  const html = await response.text();
  contentArea.innerHTML = html;
  bindDynamicEvents();
}

function setActiveMenu(target) {
  document.querySelectorAll(".submenu a").forEach((a) => a.classList.remove("active"));
  if (target) target.classList.add("active");
}

function openModal(key) {
  const data = modalContents[key];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.body;
  modalOverlay.classList.add("show");
}

function closeModal() {
  modalOverlay.classList.remove("show");
}

function bindDynamicEvents() {
  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.modal);
    });
  });
}

function bindPageLinks() {
  document.querySelectorAll(".submenu a[data-page]").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const pageName = link.dataset.page;
      setActiveMenu(link);
      await loadPage(pageName);
    });
  });
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

bindSidebarToggle();
bindPageLinks();
loadPage("home");
