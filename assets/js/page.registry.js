window.PAGE_REGISTRY = {
  defaultPageKey: "home",
  pages: {
    home: {
      title: "홈",
      section: "SKU",
      mode: "inline",
      description: "좌측 메뉴는 실제 시스템 메뉴 순서와 동일하게 유지되며, 자주 찾는 가이드는 아래 카드에서 바로 진입할 수 있습니다.",
      html: `
        <div class="guide-section">
          <h2>품고 나우 시스템 가이드</h2>
          <p>
            이 홈 화면은 시스템 가이드의 시작 페이지입니다.
            실제 운영 화면의 메뉴 구조와 순서를 그대로 유지한 상태에서,
            상세 설명은 페이지별로 분리하여 관리할 수 있도록 구성되어 있습니다.
          </p>
          <div class="guide-note">
            자주 쓰는 항목은 아래 카드로 바로 이동하고,
            나머지 메뉴는 좌측 사이드바에서 시스템과 동일한 순서로 탐색하면 됩니다.
          </div>
        </div>

        <div class="guide-section">
          <h3>자주 찾는 가이드</h3>
          <div class="guide-card-grid">
            <a href="#" class="guide-card" data-page="returns-overview">
              <h4 class="guide-card-title">반품 기본 안내</h4>
              <p class="guide-card-summary">반품 흐름, 등록, 취소, 반송장, 검품 결과 확인 가이드로 이동합니다.</p>
            </a>

            <a href="#" class="guide-card" data-page="sku">
              <h4 class="guide-card-title">SKU</h4>
              <p class="guide-card-summary">SKU 관련 안내 페이지 예시입니다.</p>
            </a>

            <a href="#" class="guide-card" data-page="stock-by-sku">
              <h4 class="guide-card-title">SKU별재고조회</h4>
              <p class="guide-card-summary">재고 섹션 예시 페이지로 이동합니다.</p>
            </a>

            <a href="#" class="guide-card" data-page="order-processing">
              <h4 class="guide-card-title">주문 처리</h4>
              <p class="guide-card-summary">현재는 자리 페이지로 열리며, 추후 상세 문서로 교체할 수 있습니다.</p>
            </a>
          </div>
        </div>

        <div class="guide-section">
          <h3>운영 가이드 관리 방식</h3>
          <ul class="guide-list">
            <li>사이드바 구조와 순서는 <span class="guide-inline-code">index.html</span>에서 직접 관리</li>
            <li>페이지 연결 정보는 <span class="guide-inline-code">page.registry.js</span>에서 관리</li>
            <li>본문이 긴 상세 가이드는 <span class="guide-inline-code">assets/pages/...</span> 하위 HTML 파일로 분리</li>
          </ul>
        </div>
      `
    },

    sku: {
      title: "SKU",
      section: "SKU",
      mode: "inline",
      description: "예시 페이지입니다. 실제 SKU 가이드가 준비되면 별도 HTML 파일로 분리해 연결하면 됩니다.",
      html: `
        <div class="guide-section">
          <h2>SKU 가이드 예시</h2>
          <p>
            현재 이 페이지는 예시로 연결되어 있습니다.
            SKU 관련 항목이 많아질 경우에도 사이드바 구조는 유지한 채,
            본문만 별도 파일로 분리해서 관리하면 됩니다.
          </p>
        </div>

        <div class="guide-section">
          <h3>추천 관리 방식</h3>
          <ul class="guide-list">
            <li>간단한 설명은 registry의 inline 방식으로 유지</li>
            <li>이미지, 단계 설명, 표가 많은 페이지는 partial HTML 파일로 분리</li>
            <li>폴더는 기능 단위로 <span class="guide-inline-code">assets/pages/sku/</span> 형태로 정리</li>
          </ul>
        </div>
      `
    },

    "returns-overview": {
      title: "반품 기본 안내",
      section: "반품",
      mode: "partial",
      path: "./assets/pages/returns/overview.html",
      description: "반품 업무의 전체 흐름과 세부 작업 가이드로 진입하는 허브 페이지입니다.",
      type: "hub",
      cards: [
        {
          key: "return-register",
          title: "반품 등록 방법",
          summary: "반품 요청 등록 절차와 입력 항목 안내"
        },
        {
          key: "return-cancel",
          title: "반품 취소 방법",
          summary: "이미 접수된 반품 요청 취소 처리 방법 안내"
        },
        {
          key: "return-label",
          title: "반송장 확인 방법",
          summary: "반송장 번호 및 상태 확인 방법 안내"
        },
        {
          key: "inspection-result",
          title: "검품 결과 확인 방법",
          summary: "검품 상태 및 결과 확인 방법 안내"
        }
      ]
    },

    "return-register": {
      title: "반품 등록 방법",
      section: "반품",
      mode: "partial",
      path: "./assets/pages/returns/register.html",
      description: "반품 요청 등록 절차, 입력 항목, 검토 포인트를 안내합니다."
    },

    "return-cancel": {
      title: "반품 취소 방법",
      section: "반품",
      mode: "partial",
      path: "./assets/pages/returns/cancel.html",
      description: "이미 접수한 반품 건을 취소할 때 확인해야 하는 절차와 주의사항을 안내합니다."
    },

    "return-label": {
      title: "반송장 확인 방법",
      section: "반품",
      mode: "partial",
      path: "./assets/pages/returns/label.html",
      description: "반송장 번호, 상태, 조회 포인트를 확인하는 방법을 안내합니다."
    },

    "inspection-result": {
      title: "검품 결과 확인 방법",
      section: "반품",
      mode: "partial",
      path: "./assets/pages/returns/inspection.html",
      description: "검품 진행 상태와 최종 결과를 확인하는 방법을 안내합니다."
    }
  }
};
