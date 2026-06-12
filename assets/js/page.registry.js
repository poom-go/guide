window.PAGE_REGISTRY = {
  defaultPageKey: "home",
  pages: {
    home: {
      title: "홈",
      section: "메인",
      mode: "inline",
      description:
        "자주 찾는 업무 가이드를 바로 이동할 수 있도록 구성한 시작 화면입니다.",
      html: `
        <div class="guide-section">
          <h2>품고 나우 시스템 가이드</h2>
          <p>
            이 홈 화면은 실제 시스템 메뉴 구조는 그대로 유지하면서,
            자주 찾는 업무를 빠르게 이동할 수 있도록 정리한 시작 페이지입니다.
          </p>
          <div class="guide-note">
            좌측 메뉴는 실제 시스템 순서와 동일하고,
            아래 6개 카드는 자주 찾는 가이드를 바로 열 수 있도록 구성했습니다.
          </div>
        </div>

        <div class="guide-section">
          <h3>자주 찾는 가이드</h3>
          <div class="guide-card-grid">
            <a href="#" class="guide-card" data-page="returns-overview">
              <h4 class="guide-card-title">반품</h4>
              <p class="guide-card-summary">반품 기본 안내 및 등록/취소/반송장/검품 결과 가이드</p>
            </a>

            <a href="#" class="guide-card" data-page="exchange-guide">
              <h4 class="guide-card-title">교환</h4>
              <p class="guide-card-summary">교환 업무 관련 기본 안내용 가이드 페이지</p>
            </a>

            <a href="#" class="guide-card" data-page="resend-guide">
              <h4 class="guide-card-title">재발송</h4>
              <p class="guide-card-summary">재발송 처리 흐름과 확인 포인트 안내</p>
            </a>

            <a href="#" class="guide-card" data-page="gift-guide">
              <h4 class="guide-card-title">사은품</h4>
              <p class="guide-card-summary">사은품 관련 운영 가이드 예시 페이지</p>
            </a>

            <a href="#" class="guide-card" data-page="inventory-guide">
              <h4 class="guide-card-title">재고</h4>
              <p class="guide-card-summary">재고 메뉴 관련 자주 쓰는 항목 바로가기</p>
            </a>

            <a href="#" class="guide-card" data-page="outbound-guide">
              <h4 class="guide-card-title">반출</h4>
              <p class="guide-card-summary">반출대장 및 관련 처리 흐름 안내</p>
            </a>
          </div>
        </div>
      `
    },

    sku: {
      title: "SKU",
      section: "SKU",
      mode: "inline",
      description: "SKU 관련 가이드 예시 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>SKU 가이드</h2>
          <p>
            현재 SKU 페이지는 기본 예시 페이지로 연결되어 있습니다.
            실제 설명이 준비되면 별도 HTML 파일로 분리해서 연결하면 됩니다.
          </p>
        </div>

        <div class="guide-section">
          <h3>관리 방식</h3>
          <ul class="guide-list">
            <li>간단한 페이지는 inline 방식 유지</li>
            <li>이미지와 단계 설명이 많은 페이지는 partial HTML 파일 분리</li>
            <li>폴더는 기능 단위로 정리</li>
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
    },

    "exchange-guide": {
      title: "교환 가이드",
      section: "교환",
      mode: "inline",
      description: "교환 업무 관련 기본 안내 예시 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>교환 기본 안내</h2>
          <p>
            이 페이지는 교환 업무 가이드를 넣기 위한 기본 자리입니다.
            교환 프로세스, 승인 기준, 재출고 연결 조건 등을 여기에 정리하면 됩니다.
          </p>
          <div class="guide-note">
            향후 교환 등록, 교환 취소, 교환 재출고 같은 하위 페이지로 확장 가능하도록
            동일한 구조로 분리하면 됩니다.
          </div>
        </div>
      `
    },

    "resend-guide": {
      title: "재발송 가이드",
      section: "재발송",
      mode: "inline",
      description: "재발송 처리 흐름 관련 기본 안내 예시 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>재발송 기본 안내</h2>
          <p>
            이 페이지는 재발송 업무 가이드를 넣기 위한 예시 페이지입니다.
            재발송 사유, 출고 연계, 송장 재생성 여부 등을 정리하면 좋습니다.
          </p>
        </div>
      `
    },

    "gift-guide": {
      title: "사은품 가이드",
      section: "사은품",
      mode: "inline",
      description: "사은품 운영 관련 기본 안내 예시 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>사은품 기본 안내</h2>
          <p>
            이 페이지는 사은품 관련 기준, 지급 조건, 누락 처리, 재발송 기준 등을 정리하기 위한 예시 페이지입니다.
          </p>
        </div>
      `
    },

    "inventory-guide": {
      title: "재고 가이드",
      section: "재고",
      mode: "inline",
      description: "재고 메뉴에서 자주 확인하는 항목을 모아둔 안내 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>재고 바로가기</h2>
          <p>
            재고 관련 자주 사용하는 메뉴를 아래에서 바로 이동할 수 있습니다.
          </p>

          <div class="guide-card-grid">
            <a href="#" class="guide-card" data-page="stock-by-sku">
              <h4 class="guide-card-title">SKU별재고조회</h4>
              <p class="guide-card-summary">SKU 단위 재고 조회</p>
            </a>

            <a href="#" class="guide-card" data-page="stock-manage">
              <h4 class="guide-card-title">재고 관리</h4>
              <p class="guide-card-summary">재고 관리 상세 메뉴</p>
            </a>

            <a href="#" class="guide-card" data-page="stock-location-info">
              <h4 class="guide-card-title">재고별 위치정보</h4>
              <p class="guide-card-summary">위치 정보 관련 메뉴</p>
            </a>

            <a href="#" class="guide-card" data-page="stock-change-history">
              <h4 class="guide-card-title">재고 변동내역</h4>
              <p class="guide-card-summary">재고 변동 이력 확인</p>
            </a>

            <a href="#" class="guide-card" data-page="sku-io-status">
              <h4 class="guide-card-title">SKU별 입출고 현황</h4>
              <p class="guide-card-summary">입출고 현황 조회</p>
            </a>

            <a href="#" class="guide-card" data-page="monthly-stock-ledger">
              <h4 class="guide-card-title">월별 재고 수불부</h4>
              <p class="guide-card-summary">월별 재고 흐름 확인</p>
            </a>
          </div>
        </div>
      `
    },

    "outbound-guide": {
      title: "반출 가이드",
      section: "반출",
      mode: "inline",
      description: "반출 관련 자주 확인하는 항목을 모아둔 안내 페이지입니다.",
      html: `
        <div class="guide-section">
          <h2>반출 기본 안내</h2>
          <p>
            이 페이지는 반출 관련 메뉴로 빠르게 이동하기 위한 안내 페이지입니다.
          </p>

          <div class="guide-card-grid">
            <a href="#" class="guide-card" data-page="return-out-ledger">
              <h4 class="guide-card-title">반출대장</h4>
              <p class="guide-card-summary">CS 메뉴의 반출대장으로 이동</p>
            </a>

            <a href="#" class="guide-card" data-page="outbound-history-download">
              <h4 class="guide-card-title">출고내역 다운로드</h4>
              <p class="guide-card-summary">송장 메뉴 관련 항목으로 이동</p>
            </a>

            <a href="#" class="guide-card" data-page="b2b-outbound-request-new">
              <h4 class="guide-card-title">B2B 출고요청서(신)</h4>
              <p class="guide-card-summary">입·출고 메뉴 관련 항목으로 이동</p>
            </a>
          </div>
        </div>
      `
    }
  }
};
