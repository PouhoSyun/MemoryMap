// Memory Map - international version
// Shares the Chinese page structure and behavior with translated UI text.

function currentLanguage() {
  const language = new URLSearchParams(window.location.search).get("lang") || "en";
  return languageCopies[language] ? language : "en";
}

const languageCopies = {
  en: {
    htmlLang: "en",
    locale: "en-US",
    title: "Memory Map - Global Memory Atlas",
    brandKicker: "Global Memory Atlas",
    brandTitle: "Memory Map",
    actions: { language: "Language", submit: "Submit", about: "About", mine: "My Posts" },
    mapAria: "OpenStreetMap interactive map",
    hint: "Click on the map to select a location for your memory",
    tabs: ["Read", "Submit", "My Posts", "About"],
    readEyebrow: "Anonymous Echoes",
    readTitle: "Share memories tied to places around the world.",
    refresh: "Shuffle",
    submitIdentityGuest: "Guest submission / Publish immediately",
    submitIdentityUser: username => `${username} - Publish Immediately`,
    submitTitle: "Write to a place, write to yourself.",
    labels: {
      title: "Title (optional)",
      content: "Content",
      author: "Author Name (optional)",
      time: "Memory Time",
      country: "Country",
      province: "Province/State",
      city: "City",
      manualLocation: "Enter location name manually",
      mood: "Mood",
      place: "Location Name",
      lat: "Latitude",
      lng: "Longitude",
      username: "Username",
      password: "Password",
      createAccount: "Create Account",
      setPassword: "Set Password",
      feedbackType: "Type",
      feedbackTitle: "Title *",
      feedbackContent: "Content *",
      feedbackContact: "Contact (optional)"
    },
    placeholders: {
      title: "e.g.: The bridge at dawn",
      content: "Keep it real. No need for perfection.",
      author: "Your name or nickname",
      place: "City, street, building, station, etc.",
      username: "3-32 characters",
      registerUsername: "3-32 characters: letters, numbers, hyphen, underscore",
      password: "At least 6 characters",
      feedbackTitle: "Brief description",
      feedbackContent: "Details...",
      feedbackContact: "Email or other contact"
    },
    geocodeIdle: "Click the map to auto-detect country, province, and city.",
    geocodeDetecting: "Detecting this location...",
    geocodeDetected: location => `Detected: ${location}`,
    geocodeFailed: "Could not detect this location. Please choose country, province, and city manually.",
    geocodeUnavailable: "Reverse geocoding is unavailable. Please choose country, province, and city manually.",
    geocodeManual: "Manual country, province, and city selection is enabled.",
    submitMicrocopy: "Submissions can be placed anywhere in the world. Logged-in submissions can be viewed and deleted in \"My Posts\"; guest submissions publish immediately but cannot be managed later.",
    publish: "Publish Now",
    mineEyebrow: "Account",
    mineTitle: "Log in to track your submissions.",
    login: "Log In",
    register: "Register & Log In",
    authMicrocopy: "You can submit without logging in. Guest submissions are published immediately but won't appear in your account.",
    currentAccount: "Current Account",
    logout: "Log Out",
    adminPanel: "Admin Panel",
    filters: { all: "All", approved: "Published", pending: "Pending", rejected: "Rejected" },
    aboutEyebrow: "About",
    aboutTitle: "A public memory tree that doesn't demand answers.",
    about: [
      "Memory Map is a global platform for personal emotions, daily moments, secrets, regrets, gratitude, dreams, and farewells - anything that doesn't fit neat categories.",
      "It's not a crisis hotline or a judgment platform. We maintain minimal moderation: protecting privacy, preventing attacks, rejecting illegal or dangerous content.",
      "Locations anchor memories to coordinates on the world map. Base map data from OpenStreetMap. Submissions from anywhere on Earth are welcome.",
      "Map information comes from OpenStreetMap and related open data. It is used only as geographic reference and does not represent the developer's position on any geography, boundary, administrative division, or political matter."
    ],
    feedback: "Submit Feedback",
    feedbackModalTitle: "Submit Feedback",
    feedbackTypes: { bug: "Bug Report", suggestion: "Suggestion", other: "Other" },
    submitShort: "Submit",
    delete: "Delete",
    moods: {
      all: "All", happy: "Happy", sad: "Sad", lost: "Lost", angry: "Angry", anxious: "Anxious",
      calm: "Calm", moved: "Moved", missing: "Missing", grateful: "Grateful", confused: "Confused", unspecified: "Unspecified"
    },
    statusLabels: { pending: "Pending", approved: "Published", rejected: "Rejected" },
    messages: {
      requestFailed: "Request failed",
      mapFailed: "Map resources failed to load. Please check your connection and refresh.",
      invalidCoordinates: "Invalid coordinates.",
      legendMood: "Mood",
      unknown: "Unknown",
      untitled: "Untitled",
      noStories: "No memories yet.",
      place: "Place",
      coordinates: "Coordinates",
      noMyPosts: "No submissions with this status. Guest submissions will not appear here.",
      noAdminPosts: "No submissions with this status.",
      adminLoadFailed: "Failed to load admin posts:",
      submitLoading: "Submitting...",
      submittedUser: "Submitted. Check 'My Posts' to track it.",
      submittedGuest: "Submitted as a guest. Published immediately but cannot be recovered.",
      loginLoading: "Logging in...",
      registerLoading: "Registering...",
      thanksFeedback: "Thank you for your feedback!",
      failedPrefix: "Failed: "
    }
  }
};

languageCopies["zh-Hant"] = {
  ...languageCopies.en,
  htmlLang: "zh-Hant",
  locale: "zh-Hant",
  title: "回聲樹洞 - 全球匿名記憶地圖",
  brandKicker: "全球記憶地圖",
  brandTitle: "回聲樹洞",
  actions: { language: "語言", submit: "投稿", about: "關於", mine: "我的" },
  mapAria: "OpenStreetMap 互動地圖",
  hint: "點擊地圖選擇投稿位置",
  tabs: ["閱讀", "投稿", "我的", "說明"],
  readEyebrow: "匿名回聲",
  readTitle: "把難以開口的話，放在一個地點上。",
  refresh: "換一批",
  submitIdentityGuest: "訪客投稿 / 即時發布",
  submitIdentityUser: username => `${username} - 即時發布`,
  submitTitle: "寫給某個地方，也寫給此刻的自己。",
  labels: {
    title: "標題（可選）", content: "內容", author: "發布人名字（可選）", time: "記憶時間",
    country: "國家", province: "省份/地區", city: "城市", manualLocation: "手動指定地名",
    mood: "情緒", place: "地點名稱", lat: "緯度", lng: "經度", username: "帳號",
    password: "密碼", createAccount: "註冊帳號", setPassword: "設定密碼",
    feedbackType: "反饋類型", feedbackTitle: "標題 *", feedbackContent: "內容 *", feedbackContact: "聯絡方式（可選）"
  },
  placeholders: {
    title: "例如：凌晨的天橋", content: "不需要完整，不需要漂亮，真實就好。", author: "你的名字或暱稱",
    place: "城市、街道、學校、車站都可以", username: "3-32 位帳號",
    registerUsername: "3-32 位，字母、數字、底線、短橫線", password: "至少 6 位",
    feedbackTitle: "簡短描述你的反饋", feedbackContent: "詳細說明...", feedbackContact: "電子郵件或其他聯絡方式"
  },
  geocodeIdle: "點擊地圖後自動識別國、省、市。",
  geocodeDetecting: "正在識別目前位置...",
  geocodeDetected: location => `已識別：${location}`,
  geocodeFailed: "未能識別目前位置，請手動指定國、省、市。",
  geocodeUnavailable: "反向地理編碼不可用，請手動指定國、省、市。",
  geocodeManual: "已啟用手動指定國、省、市。",
  submitMicrocopy: "投稿範圍全球有效。登入後投稿可在「我的」裡查看和刪除，訪客投稿即時發布但無法管理。",
  publish: "立即發布",
  mineEyebrow: "帳戶",
  mineTitle: "登入後查看和管理自己的投稿。",
  login: "登入",
  register: "註冊並登入",
  authMicrocopy: "不登入也可以投稿，系統會把它視為訪客投稿；訪客投稿即時發布，但無法在個人中心管理。",
  currentAccount: "目前帳號",
  logout: "退出",
  adminPanel: "管理員面板",
  filters: { all: "全部", approved: "已發布", pending: "待審", rejected: "未通過" },
  aboutEyebrow: "關於",
  aboutTitle: "一個不要求答案的公共樹洞。",
  about: [
    "回聲樹洞面向個人情感，也允許日常片段、秘密、悔意、感謝、夢、告別和那些不好歸類的話。",
    "它不是求助熱線，也不是公開審判場。我們保留最低限度的審核：保護隱私、避免人身攻擊、拒絕違法或危險引導。",
    "地點只用於讓記憶有一個可以停靠的座標。地圖底圖來自 OpenStreetMap，投稿範圍全球有效。",
    "地圖資訊來源於 OpenStreetMap 及相關開放資料，僅用於提供地理參照，不代表開發者對任何地理、邊界、行政區劃或政治立場的表達。"
  ],
  feedback: "提交反饋",
  feedbackModalTitle: "提交反饋",
  feedbackTypes: { bug: "Bug 報告", suggestion: "建議", other: "其他" },
  submitShort: "提交",
  delete: "刪除",
  moods: {
    all: "全部", happy: "開心", sad: "傷心", lost: "失落", angry: "憤怒", anxious: "焦慮",
    calm: "平靜", moved: "感動", missing: "想念", grateful: "感謝", confused: "迷茫", unspecified: "未標記"
  },
  statusLabels: { pending: "待審核", approved: "已發布", rejected: "未通過" },
  messages: {
    requestFailed: "請求失敗", mapFailed: "地圖資源載入失敗。請檢查連線後重新載入。", invalidCoordinates: "座標無效。",
    legendMood: "情緒", unknown: "未知", untitled: "無題", noStories: "暫無記錄。", place: "地點", coordinates: "座標",
    noMyPosts: "暫無此狀態的投稿。訪客投稿不會顯示在這裡。", noAdminPosts: "暫無此狀態的投稿。",
    adminLoadFailed: "載入管理員投稿失敗:", submitLoading: "提交中...", submittedUser: "已提交。在「我的」中查看狀態。",
    submittedGuest: "已作為訪客提交。即時發布但無法恢復。", loginLoading: "登入中...", registerLoading: "註冊中...",
    thanksFeedback: "感謝你的反饋!", failedPrefix: "失敗: "
  }
};

languageCopies.ru = {
  ...languageCopies.en,
  htmlLang: "ru",
  locale: "ru-RU",
  title: "Карта памяти - глобальная анонимная карта",
  brandKicker: "Глобальная карта памяти",
  brandTitle: "Карта памяти",
  actions: { language: "Язык", submit: "Опубликовать", about: "О проекте", mine: "Мои записи" },
  hint: "Нажмите на карту, чтобы выбрать место для записи",
  tabs: ["Читать", "Опубликовать", "Мои записи", "Описание"],
  readEyebrow: "Анонимные отголоски",
  readTitle: "Свяжите воспоминание с местом на карте.",
  refresh: "Другая подборка",
  submitIdentityGuest: "Гостевая запись / мгновенная публикация",
  submitIdentityUser: username => `${username} - мгновенная публикация`,
  submitTitle: "Напишите месту и себе в этот момент.",
  labels: {
    title: "Заголовок (необязательно)", content: "Текст", author: "Имя автора (необязательно)", time: "Время воспоминания",
    country: "Страна", province: "Регион", city: "Город", manualLocation: "Указать место вручную",
    mood: "Настроение", place: "Название места", lat: "Широта", lng: "Долгота", username: "Имя пользователя",
    password: "Пароль", createAccount: "Создать аккаунт", setPassword: "Задать пароль",
    feedbackType: "Тип", feedbackTitle: "Заголовок *", feedbackContent: "Содержание *", feedbackContact: "Контакт (необязательно)"
  },
  placeholders: {
    title: "например: мост на рассвете", content: "Пишите честно. Совершенство не нужно.", author: "Ваше имя или ник",
    place: "Город, улица, школа, станция и т. д.", username: "3-32 символа",
    registerUsername: "3-32 символа: буквы, цифры, дефис, подчеркивание", password: "Не менее 6 символов",
    feedbackTitle: "Краткое описание", feedbackContent: "Подробности...", feedbackContact: "Email или другой контакт"
  },
  geocodeIdle: "Нажмите на карту для автоматического определения страны, региона и города.",
  geocodeDetecting: "Определяем место...",
  geocodeDetected: location => `Определено: ${location}`,
  geocodeFailed: "Не удалось определить место. Выберите страну, регион и город вручную.",
  geocodeUnavailable: "Обратное геокодирование недоступно. Выберите страну, регион и город вручную.",
  geocodeManual: "Ручной выбор страны, региона и города включен.",
  submitMicrocopy: "Записи можно привязать к любой точке мира. После входа их можно просматривать и удалять в разделе «Мои записи».",
  publish: "Опубликовать",
  mineEyebrow: "Аккаунт",
  mineTitle: "Войдите, чтобы управлять своими записями.",
  login: "Войти",
  register: "Зарегистрироваться",
  authMicrocopy: "Можно публиковать и без входа. Гостевые записи публикуются сразу, но не появятся в аккаунте.",
  currentAccount: "Текущий аккаунт",
  logout: "Выйти",
  adminPanel: "Панель администратора",
  filters: { all: "Все", approved: "Опубликовано", pending: "Ожидает", rejected: "Отклонено" },
  aboutEyebrow: "О проекте",
  aboutTitle: "Общее пространство для слов, которым не нужен ответ.",
  about: [
    "Карта памяти открыта для личных чувств, повседневных эпизодов, секретов, сожалений, благодарности, снов и прощаний.",
    "Это не горячая линия и не площадка для суда. Мы сохраняем минимальную модерацию: защита приватности, запрет нападок, незаконных и опасных призывов.",
    "Места нужны только как координаты для воспоминаний. Подложка карты основана на OpenStreetMap, записи принимаются со всего мира.",
    "Картографическая информация получена из OpenStreetMap и связанных открытых данных. Она служит только географической справкой и не выражает позицию разработчика по географии, границам, административному делению или политике."
  ],
  feedback: "Отправить отзыв",
  feedbackModalTitle: "Отправить отзыв",
  feedbackTypes: { bug: "Ошибка", suggestion: "Предложение", other: "Другое" },
  submitShort: "Отправить",
  delete: "Удалить",
  moods: {
    all: "Все", happy: "Радость", sad: "Грусть", lost: "Потерянность", angry: "Злость", anxious: "Тревога",
    calm: "Спокойствие", moved: "Тронутость", missing: "Тоска", grateful: "Благодарность", confused: "Смятение", unspecified: "Без метки"
  },
  statusLabels: { pending: "Ожидает", approved: "Опубликовано", rejected: "Отклонено" }
};

languageCopies.ko = {
  ...languageCopies.en,
  htmlLang: "ko",
  locale: "ko-KR",
  title: "기억 지도 - 전 세계 익명 기억 지도",
  brandKicker: "전 세계 기억 지도",
  brandTitle: "기억 지도",
  actions: { language: "언어", submit: "投稿", about: "소개", mine: "내 글" },
  hint: "지도에서 기억을 남길 위치를 선택하세요",
  tabs: ["읽기", "投稿", "내 글", "설명"],
  readEyebrow: "익명의 메아리",
  readTitle: "말하기 어려운 마음을 한 장소에 놓아두세요.",
  refresh: "다른 글 보기",
  submitIdentityGuest: "게스트 投稿 / 즉시 공개",
  submitIdentityUser: username => `${username} - 즉시 공개`,
  submitTitle: "어떤 장소에게, 그리고 지금의 나에게 씁니다.",
  labels: {
    title: "제목(선택)", content: "내용", author: "작성자 이름(선택)", time: "기억 시간",
    country: "국가", province: "지역", city: "도시", manualLocation: "장소 이름 직접 지정",
    mood: "감정", place: "장소 이름", lat: "위도", lng: "경도", username: "계정",
    password: "비밀번호", createAccount: "계정 만들기", setPassword: "비밀번호 설정",
    feedbackType: "유형", feedbackTitle: "제목 *", feedbackContent: "내용 *", feedbackContact: "연락처(선택)"
  },
  placeholders: {
    title: "예: 새벽의 육교", content: "완벽하지 않아도 괜찮아요. 진심이면 충분합니다.", author: "이름 또는 닉네임",
    place: "도시, 거리, 학교, 역 등", username: "3-32자",
    registerUsername: "3-32자: 영문, 숫자, 하이픈, 밑줄", password: "최소 6자",
    feedbackTitle: "짧게 설명해주세요", feedbackContent: "자세한 내용...", feedbackContact: "이메일 또는 기타 연락처"
  },
  geocodeIdle: "지도를 클릭하면 국가, 지역, 도시를 자동으로 인식합니다.",
  geocodeDetecting: "현재 위치를 인식하는 중...",
  geocodeDetected: location => `인식됨: ${location}`,
  geocodeFailed: "현재 위치를 인식하지 못했습니다. 국가, 지역, 도시를 직접 선택하세요.",
  geocodeUnavailable: "역지오코딩을 사용할 수 없습니다. 국가, 지역, 도시를 직접 선택하세요.",
  geocodeManual: "국가, 지역, 도시 수동 선택이 켜졌습니다.",
  submitMicrocopy: "전 세계 어디든 投稿할 수 있습니다. 로그인 후 投稿은 '내 글'에서 확인하고 삭제할 수 있습니다.",
  publish: "지금 공개",
  mineEyebrow: "계정",
  mineTitle: "로그인하면 내 投稿를 관리할 수 있습니다.",
  login: "로그인",
  register: "가입하고 로그인",
  authMicrocopy: "로그인하지 않아도 投稿할 수 있습니다. 게스트 投稿은 즉시 공개되지만 계정에 표시되지 않습니다.",
  currentAccount: "현재 계정",
  logout: "로그아웃",
  adminPanel: "관리자 패널",
  filters: { all: "전체", approved: "공개됨", pending: "대기 중", rejected: "거절됨" },
  aboutEyebrow: "소개",
  aboutTitle: "답을 요구하지 않는 공용 나무구멍.",
  about: [
    "기억 지도는 개인의 감정, 일상의 조각, 비밀, 후회, 감사, 꿈, 이별을 위한 공간입니다.",
    "이곳은 상담 전화도 공개 재판장도 아닙니다. 개인정보 보호, 인신공격 방지, 불법 또는 위험한 유도를 막기 위한 최소한의 검토만 유지합니다.",
    "장소는 기억이 머무를 좌표를 제공하기 위한 것입니다. 지도 배경은 OpenStreetMap에서 오며, 전 세계 投稿가 가능합니다.",
    "지도 정보는 OpenStreetMap 및 관련 공개 데이터에서 오며, 지리적 참고용일 뿐 개발자의 지리, 경계, 행정구역 또는 정치적 입장을 의미하지 않습니다."
  ],
  feedback: "피드백 보내기",
  feedbackModalTitle: "피드백 보내기",
  feedbackTypes: { bug: "버그", suggestion: "제안", other: "기타" },
  submitShort: "제출",
  delete: "삭제",
  moods: {
    all: "전체", happy: "기쁨", sad: "슬픔", lost: "상실감", angry: "분노", anxious: "불안",
    calm: "평온", moved: "감동", missing: "그리움", grateful: "감사", confused: "혼란", unspecified: "미표시"
  },
  statusLabels: { pending: "대기 중", approved: "공개됨", rejected: "거절됨" }
};

languageCopies.ja = {
  ...languageCopies.en,
  htmlLang: "ja",
  locale: "ja-JP",
  title: "記憶地図 - 世界の匿名記憶マップ",
  brandKicker: "世界の記憶地図",
  brandTitle: "記憶地図",
  actions: { language: "言語", submit: "投稿", about: "概要", mine: "自分の投稿" },
  hint: "地図をクリックして投稿場所を選んでください",
  tabs: ["読む", "投稿", "自分の投稿", "説明"],
  readEyebrow: "匿名のこだま",
  readTitle: "言葉にしにくい気持ちを、ひとつの場所に置く。",
  refresh: "別の10件",
  submitIdentityGuest: "ゲスト投稿 / 即時公開",
  submitIdentityUser: username => `${username} - 即時公開`,
  submitTitle: "ある場所へ、そして今の自分へ書く。",
  labels: {
    title: "タイトル（任意）", content: "本文", author: "投稿者名（任意）", time: "記憶の時間",
    country: "国", province: "地域", city: "都市", manualLocation: "地名を手動指定",
    mood: "気持ち", place: "場所名", lat: "緯度", lng: "経度", username: "アカウント",
    password: "パスワード", createAccount: "アカウント作成", setPassword: "パスワード設定",
    feedbackType: "種類", feedbackTitle: "タイトル *", feedbackContent: "内容 *", feedbackContact: "連絡先（任意）"
  },
  placeholders: {
    title: "例：夜明けの歩道橋", content: "完璧でなくて大丈夫。ほんとうの言葉で。", author: "名前またはニックネーム",
    place: "都市、通り、学校、駅など", username: "3-32文字",
    registerUsername: "3-32文字：英字、数字、ハイフン、アンダーバー", password: "6文字以上",
    feedbackTitle: "短く説明してください", feedbackContent: "詳しい内容...", feedbackContact: "メールなど"
  },
  geocodeIdle: "地図をクリックすると国、地域、都市を自動判定します。",
  geocodeDetecting: "現在地を判定中...",
  geocodeDetected: location => `判定済み：${location}`,
  geocodeFailed: "現在地を判定できませんでした。国、地域、都市を手動で指定してください。",
  geocodeUnavailable: "逆ジオコーディングを利用できません。国、地域、都市を手動で指定してください。",
  geocodeManual: "国、地域、都市の手動指定を有効にしました。",
  submitMicrocopy: "世界中の場所に投稿できます。ログイン後の投稿は「自分の投稿」で確認・削除できます。",
  publish: "今すぐ公開",
  mineEyebrow: "アカウント",
  mineTitle: "ログインすると自分の投稿を管理できます。",
  login: "ログイン",
  register: "登録してログイン",
  authMicrocopy: "ログインしなくても投稿できます。ゲスト投稿は即時公開されますが、アカウントには表示されません。",
  currentAccount: "現在のアカウント",
  logout: "ログアウト",
  adminPanel: "管理者パネル",
  filters: { all: "すべて", approved: "公開済み", pending: "審査待ち", rejected: "却下" },
  aboutEyebrow: "概要",
  aboutTitle: "答えを求めない公共の樹洞。",
  about: [
    "記憶地図は、個人的な感情、日常の断片、秘密、後悔、感謝、夢、別れのための場所です。",
    "ここは相談窓口でも公開裁判の場でもありません。プライバシー保護、攻撃の防止、違法または危険な誘導の拒否のため、最小限の確認を行います。",
    "場所は記憶が停まる座標として使われます。地図の背景は OpenStreetMap に由来し、世界中から投稿できます。",
    "地図情報は OpenStreetMap および関連するオープンデータに基づきます。地理的参照のためだけに使われ、地理、境界、行政区分、政治的事項に関する開発者の立場を示すものではありません。"
  ],
  feedback: "フィードバック",
  feedbackModalTitle: "フィードバック送信",
  feedbackTypes: { bug: "バグ報告", suggestion: "提案", other: "その他" },
  submitShort: "送信",
  delete: "削除",
  moods: {
    all: "すべて", happy: "うれしい", sad: "悲しい", lost: "喪失感", angry: "怒り", anxious: "不安",
    calm: "穏やか", moved: "感動", missing: "恋しい", grateful: "感謝", confused: "迷い", unspecified: "未指定"
  },
  statusLabels: { pending: "審査待ち", approved: "公開済み", rejected: "却下" }
};

languageCopies.bo = {
  ...languageCopies.en,
  htmlLang: "bo",
  locale: "bo-CN",
  title: "དྲན་པའི་ས་ཁྲ།",
  brandKicker: "འཛམ་གླིང་དྲན་པའི་ས་ཁྲ།",
  brandTitle: "དྲན་པའི་ས་ཁྲ།",
  actions: { language: "སྐད་ཡིག", submit: "འབུལ་བ", about: "སྐོར", mine: "ངའི་འབུལ་བ" },
  hint: "ས་ཁྲ་ལ་མནན་ནས་དྲན་པའི་ས་གནས་འདེམས།",
  tabs: ["ཀློག", "འབུལ", "ངའི", "གསལ་བཤད"],
  readEyebrow: "མིང་མེད་ཀྱི་སྒྲ།",
  readTitle: "སྐད་ཆ་དཀའ་བ་ཞིག་ས་གནས་ཤིག་ལ་འཇོག",
  refresh: "གཞན་ཞིག",
  submitIdentityGuest: "མགྲོན་པོའི་འབུལ་བ / འཕྲལ་དུ་སྤེལ",
  submitIdentityUser: username => `${username} - འཕྲལ་དུ་སྤེལ`,
  submitTitle: "ས་གནས་ཤིག་ལ་དང་ད་ལྟའི་རང་ཉིད་ལ་འབྲི།",
  labels: {
    title: "ཁ་བྱང་།", content: "ནང་དོན", author: "མིང་།", time: "དྲན་པའི་དུས",
    country: "རྒྱལ་ཁབ", province: "ས་ཁུལ", city: "གྲོང་ཁྱེར", manualLocation: "ས་མིང་ལག་ཐོག་འདེམས",
    mood: "ཚོར་བ", place: "ས་མིང", lat: "འཕྲེད་ཐིག", lng: "གཞུང་ཐིག", username: "ཐོ་ཁོངས",
    password: "གསང་ཨང", createAccount: "ཐོ་ཁོངས་གསར", setPassword: "གསང་ཨང་སྒྲིག",
    feedbackType: "རིགས", feedbackTitle: "ཁ་བྱང *", feedbackContent: "ནང་དོན *", feedbackContact: "འབྲེལ་གཏུག"
  },
  placeholders: languageCopies.en.placeholders,
  geocodeIdle: "ས་ཁྲ་ལ་མནན་ནས་རྒྱལ་ཁབ། ས་ཁུལ། གྲོང་ཁྱེར་རང་འགུལ་ངོས་འཛིན།",
  geocodeDetecting: "ས་གནས་ངོས་འཛིན་བྱེད་བཞིན...",
  geocodeDetected: location => `ངོས་འཛིན་ཟིན། ${location}`,
  geocodeFailed: "ས་གནས་ངོས་འཛིན་མ་ཐུབ། ལག་ཐོག་འདེམས་རོགས།",
  geocodeUnavailable: "ས་གནས་ལྡོག་འཚོལ་མི་འདུག ལག་ཐོག་འདེམས་རོགས།",
  geocodeManual: "ལག་ཐོག་ས་གནས་འདེམས་པ་སྤྱོད་བཞིན།",
  submitMicrocopy: "འཛམ་གླིང་གང་སར་འབུལ་ཆོག ཐོ་འཇུག་རྗེས་ངའི་ནང་ལྟ་དང་སུབ་ཆོག",
  publish: "འཕྲལ་དུ་སྤེལ",
  mineEyebrow: "ཐོ་ཁོངས",
  mineTitle: "ཐོ་འཇུག་རྗེས་རང་གི་འབུལ་བ་སྐྱོང་།",
  login: "ཐོ་འཇུག",
  register: "ཐོ་ཁོངས་གསར་དང་ཐོ་འཇུག",
  authMicrocopy: "ཐོ་མ་འཇུག་ཀྱང་འབུལ་ཆོག མགྲོན་པོའི་འབུལ་བ་འཕྲལ་དུ་སྤེལ།",
  currentAccount: "ད་ལྟའི་ཐོ་ཁོངས",
  logout: "ཕྱིར་འཐོན",
  adminPanel: "དོ་དམ་པའི་པང",
  filters: { all: "ཚང་མ", approved: "སྤེལ་ཟིན", pending: "སྒུག", rejected: "མ་འགྲིག" },
  aboutEyebrow: "སྐོར",
  aboutTitle: "ལན་མི་དགོས་པའི་སྤྱི་པའི་ས་ཆ།",
  about: [
    "དྲན་པའི་ས་ཁྲ་ནི་སེམས་ཚོར། ཉིན་རེའི་དྲན་པ། གསང་བ། ཐུགས་རྗེ། གྱེས་བྲལ་སོགས་ཀྱི་ས་ཆ་ཡིན།",
    "འདི་ནི་རོགས་སྐྱོབ་ཁ་པར་མིན། སྤྱི་བསྒྲགས་ཁྲིམས་གཅོད་ཀྱང་མིན། གསང་སྲུང་དང་ཉེན་ཁ་འགོག་པའི་ཞིབ་བཤེར་ཆུང་ངུ་ཡོད།",
    "ས་གནས་ནི་དྲན་པར་གནས་ཚད་ཞིག་སྤྲོད་པ་ཙམ་ཡིན། ས་ཁྲའི་གཞི་རྒྱུ OpenStreetMap ནས་ཡོང་།",
    "ས་ཁྲའི་ཆ་འཕྲིན OpenStreetMap དང་སྤྱི་དམངས་གནད་སྡུད་ལས་ཡོང་། ས་ཁམས་ཀྱི་དཔྱད་གཞི་ཙམ་ཡིན་པ་ལས་གསར་སྤེལ་པའི་ས་མཚམས། ས་ཁུལ། ཆབ་སྲིད་ལྟ་ཚུལ་མི་མཚོན།"
  ],
  feedback: "བསམ་འཆར",
  feedbackModalTitle: "བསམ་འཆར་འབུལ",
  feedbackTypes: { bug: "ནོར་འཁྲུལ", suggestion: "གྲོས་འདེབས", other: "གཞན" },
  submitShort: "འབུལ",
  delete: "སུབ",
  moods: {
    all: "ཚང་མ", happy: "སྐྱིད་པོ", sad: "སྐྱོ་བ", lost: "བོར་བ", angry: "ཁོང་ཁྲོ", anxious: "སེམས་ཁྲལ",
    calm: "ཞི་བ", moved: "འགུལ་བ", missing: "དྲན་པ", grateful: "ཐུགས་རྗེ", confused: "མགོ་འཁོར", unspecified: "མ་བཀོད"
  },
  statusLabels: { pending: "སྒུག", approved: "སྤེལ་ཟིན", rejected: "མ་འགྲིག" }
};

languageCopies.ii = {
  ...languageCopies.en,
  htmlLang: "ii",
  locale: "ii-CN",
  title: "ꂿꌠꃅꄷ - ꋍꂷꃅꄷ",
  brandKicker: "ꋍꂷꂿꌠꃅꄷ",
  brandTitle: "ꂿꌠꃅꄷ",
  actions: { language: "ꉙꏢ", submit: "ꄯꒉ", about: "ꃅꄷ", mine: "ꉢꄯ" },
  hint: "ꃅꄷꇬꋍꂷꄜꇬꄯꒉꃅꄷꎻ",
  tabs: ["ꊻꂿ", "ꄯꒉ", "ꉢꄯ", "ꄐꋍ"],
  readEyebrow: "ꂓꇬꀋꐥꃅꄷ",
  readTitle: "ꀋꉬꄷꇬꁧꇐꃅꄷꇬꄀꇁ。",
  refresh: "ꋍꇅꉈ",
  submitIdentityGuest: "ꀋꉬꂓꄯꒉ / ꀋꃅꄯ",
  submitIdentityUser: username => `${username} - ꀋꃅꄯ`,
  submitTitle: "ꃅꄷꋍꂷꌠꀉꄂꉌꃀꌠꄯꒉ。",
  labels: languageCopies.en.labels,
  placeholders: languageCopies.en.placeholders,
  geocodeIdle: "ꃅꄷꇬꄜꇬꉈꇁꇐꄷꆳꁨꈧꌠꉌꃀ。",
  geocodeDetecting: "ꃅꄷꉌꃀꇁ...",
  geocodeDetected: location => `ꉌꃀꀐ: ${location}`,
  geocodeFailed: "ꃅꄷꉌꃀꀋꉆ，ꌠꌋꆀꁨꈧꌠꑌꑿ。",
  geocodeUnavailable: "ꃅꄷꉌꃀꀋꉆ，ꌠꌋꆀꁨꈧꌠꑌꑿ。",
  geocodeManual: "ꌠꌋꆀꁨꈧꌠꑌꑿꀐ。",
  submitMicrocopy: "ꋍꂷꃅꄷꇬꄯꒉꉆ。ꀊꏀꇁꌠꉢꄯꇬꊻꂿꌋꆀꌦꉆ。",
  publish: "ꀋꃅꄯ",
  mineEyebrow: "ꀊꏀ",
  mineTitle: "ꀊꏀꇁꌠꉢꄯꇬꊻꂿꌋꆀꌦ。",
  login: "ꀊꏀꇁ",
  register: "ꀊꏀꃅꌋꆀꇁ",
  authMicrocopy: "ꀊꏀꀋꇁꇬꄯꒉꉆ。ꀋꉬꂓꄯꒉꀋꃅꄯꀐ。",
  currentAccount: "ꀊꏀ",
  logout: "ꇴꇁ",
  adminPanel: "ꎹꄓꀊꏀ",
  filters: { all: "ꉈꑴ", approved: "ꄯꀐ", pending: "ꄉꑟ", rejected: "ꀋꉬ" },
  aboutEyebrow: "ꃅꄷ",
  aboutTitle: "ꇬꅉꀋꑟꌠꀉꁁꃅꄷ。",
  about: [
    "ꂿꌠꃅꄷꆹꉌꃀ、ꑓꁴꂿꌠ、ꑟꅇ、ꄮꀋꉬ、ꌋꆀꁦꄩꌠꀉꁁꐥ。",
    "ꋌꆹꃅꊂꌠꀋꉬ，ꄷꀋꁧꌠꀋꉬ。ꉣꑊꇬꑓꁴꎹꄓꌋꆀꉌꃀꇬꄜꀋꉬꌠꌦ。",
    "ꃅꄷꆹꂿꌠꌠꌋꆀꁨꈧꌠꀉꁁꐥ。ꃅꄷꁱꂷ OpenStreetMap ꄉꐥ。",
    "ꃅꄷꆏ OpenStreetMap ꌋꆀꀉꁁꌠꁱꂷꄉꐥ，ꃅꄷꐥꌠꀉꁁꐥ，ꐥꀋꐥꌠ、ꃅꄷꋍꂷ、ꎹꄓꌠ、ꊿꋅꄷꌠꇬꀋꄐ。"
  ],
  feedback: "ꉌꃀꄯ",
  feedbackModalTitle: "ꉌꃀꄯ",
  feedbackTypes: { bug: "Bug", suggestion: "ꉌꃀ", other: "ꀉꁁ" },
  submitShort: "ꄯ",
  delete: "ꌦ",
  moods: {
    all: "ꉈꑴ", happy: "ꀉꑳ", sad: "ꑳꀕ", lost: "ꀋꃀ", angry: "ꉌꐒ", anxious: "ꉌꀕ",
    calm: "ꉌꈜ", moved: "ꉌꃀ", missing: "ꂿꌠ", grateful: "ꄩꐛ", confused: "ꀋꉌ", unspecified: "ꀋꄐ"
  },
  statusLabels: { pending: "ꄉꑟ", approved: "ꄯꀐ", rejected: "ꀋꉬ" }
};

languageCopies.ru.messages = {
  ...languageCopies.en.messages,
  requestFailed: "Запрос не выполнен",
  mapFailed: "Не удалось загрузить карту. Проверьте соединение и обновите страницу.",
  invalidCoordinates: "Недопустимые координаты.",
  legendMood: "Настроение",
  unknown: "Неизвестно",
  untitled: "Без названия",
  noStories: "Пока нет записей.",
  place: "Место",
  coordinates: "Координаты",
  noMyPosts: "Нет записей с этим статусом. Гостевые записи здесь не отображаются.",
  noAdminPosts: "Нет записей с этим статусом.",
  adminLoadFailed: "Не удалось загрузить записи администратора:",
  submitLoading: "Отправка...",
  submittedUser: "Отправлено. Статус можно проверить в «Мои записи».",
  submittedGuest: "Отправлено как гостевая запись. Она опубликована сразу, но не может быть восстановлена.",
  loginLoading: "Вход...",
  registerLoading: "Регистрация...",
  thanksFeedback: "Спасибо за отзыв!",
  failedPrefix: "Ошибка: "
};

languageCopies.ko.messages = {
  ...languageCopies.en.messages,
  requestFailed: "요청 실패",
  mapFailed: "지도 리소스를 불러오지 못했습니다. 연결을 확인한 뒤 새로고침하세요.",
  invalidCoordinates: "좌표가 올바르지 않습니다.",
  legendMood: "감정",
  unknown: "알 수 없음",
  untitled: "제목 없음",
  noStories: "아직 기록이 없습니다.",
  place: "장소",
  coordinates: "좌표",
  noMyPosts: "이 상태의 投稿가 없습니다. 게스트 投稿는 여기에 표시되지 않습니다.",
  noAdminPosts: "이 상태의 投稿가 없습니다.",
  adminLoadFailed: "관리자 投稿를 불러오지 못했습니다:",
  submitLoading: "제출 중...",
  submittedUser: "제출되었습니다. '내 글'에서 상태를 확인하세요.",
  submittedGuest: "게스트로 제출되었습니다. 즉시 공개되지만 복구할 수 없습니다.",
  loginLoading: "로그인 중...",
  registerLoading: "가입 중...",
  thanksFeedback: "피드백 감사합니다!",
  failedPrefix: "실패: "
};

languageCopies.ja.messages = {
  ...languageCopies.en.messages,
  requestFailed: "リクエストに失敗しました",
  mapFailed: "地図リソースを読み込めませんでした。接続を確認して再読み込みしてください。",
  invalidCoordinates: "座標が無効です。",
  legendMood: "気持ち",
  unknown: "不明",
  untitled: "無題",
  noStories: "まだ記録がありません。",
  place: "場所",
  coordinates: "座標",
  noMyPosts: "この状態の投稿はありません。ゲスト投稿はここには表示されません。",
  noAdminPosts: "この状態の投稿はありません。",
  adminLoadFailed: "管理者投稿の読み込みに失敗しました:",
  submitLoading: "送信中...",
  submittedUser: "送信しました。「自分の投稿」で状態を確認できます。",
  submittedGuest: "ゲストとして送信しました。即時公開されますが復元できません。",
  loginLoading: "ログイン中...",
  registerLoading: "登録中...",
  thanksFeedback: "フィードバックありがとうございます!",
  failedPrefix: "失敗: "
};

languageCopies.bo.placeholders = {
  title: "དཔེར་ན། ནམ་སྔའི་ཟམ་པ།",
  content: "དྲང་པོར་འབྲི། ཡག་པོ་དགོས་མེད།",
  author: "ཁྱེད་ཀྱི་མིང་ངམ་མིང་ཚབ",
  place: "གྲོང་ཁྱེར། ལམ། སློབ་གྲྭ། ས་ཚིགས།",
  username: "ཡིག་འབྲུ 3-32",
  registerUsername: "ཡིག་འབྲུ 3-32",
  password: "ཉུང་མཐར་ཡིག་འབྲུ 6",
  feedbackTitle: "མདོར་བསྡུས་བཤད།",
  feedbackContent: "ཞིབ་ཕྲ...",
  feedbackContact: "གློག་ཡིག་ངམ་འབྲེལ་གཏུག"
};
languageCopies.bo.messages = {
  ...languageCopies.en.messages,
  requestFailed: "རེ་ཞུ་མ་འགྲུབ།",
  mapFailed: "ས་ཁྲ་འགོད་མ་ཐུབ། དྲ་སྦྲེལ་བརྟག་རོགས།",
  invalidCoordinates: "གནས་ཚད་མི་འགྲིག",
  legendMood: "ཚོར་བ",
  unknown: "མ་ཤེས",
  untitled: "ཁ་བྱང་མེད",
  noStories: "ད་ལྟ་ཟིན་ཐོ་མེད།",
  place: "ས་གནས",
  coordinates: "གནས་ཚད",
  noMyPosts: "གནས་ཚུལ་འདིའི་འབུལ་བ་མེད།",
  noAdminPosts: "གནས་ཚུལ་འདིའི་འབུལ་བ་མེད།",
  adminLoadFailed: "དོ་དམ་འབུལ་བ་འགོད་མ་ཐུབ།",
  submitLoading: "འབུལ་བཞིན...",
  submittedUser: "འབུལ་ཟིན། ངའི་ནང་གནས་ཚུལ་ལྟ།",
  submittedGuest: "མགྲོན་པོར་འབུལ་ཟིན། འཕྲལ་དུ་སྤེལ།",
  loginLoading: "ཐོ་འཇུག་བཞིན...",
  registerLoading: "ཐོ་ཁོངས་བཟོ་བཞིན...",
  thanksFeedback: "བསམ་འཆར་ལ་ཐུགས་རྗེ་ཆེ།",
  failedPrefix: "མ་འགྲུབ། "
};

languageCopies.ii.labels = {
  title: "ꁱꂷ", content: "ꄯꒉꌠ", author: "ꄯꒉꊿ", time: "ꂿꌠꄮꈉ",
  country: "ꇩꏤ", province: "ꁨꈧ", city: "ꏃꃅ", manualLocation: "ꃅꄷꑌꑿ",
  mood: "ꉌꃀ", place: "ꃅꄷꂓ", lat: "ꇗꏢ", lng: "ꈜꏢ", username: "ꀊꏀ",
  password: "ꌤꀦ", createAccount: "ꀊꏀꃅ", setPassword: "ꌤꀦꃅ",
  feedbackType: "ꌜꏦ", feedbackTitle: "ꁱꂷ *", feedbackContent: "ꄯꒉꌠ *", feedbackContact: "ꐥꇬ"
};
languageCopies.ii.placeholders = {
  title: "ꑍꃅ: ꈌꁧꃅꄷ", content: "ꉌꃀꑌꄯꒉ，ꀋꏾꀋꉆ。", author: "ꂓꌋꆀꂓꑍ",
  place: "ꏃꃅ、ꇓ、ꏦꅉ、ꋌꁧ", username: "3-32 ꁱꂷ",
  registerUsername: "3-32 ꁱꂷ", password: "6 ꁱꂷꑠꃅ",
  feedbackTitle: "ꉌꃀꇬꄐ", feedbackContent: "ꇱꇐ...", feedbackContact: "Email ꌋꆀꐥꇬ"
};
languageCopies.ii.messages = {
  ...languageCopies.en.messages,
  requestFailed: "ꌬꀋꉆ",
  mapFailed: "ꃅꄷꁱꂷꀋꉆ，ꑌꑿꇬꉜꇬꉈ。",
  invalidCoordinates: "ꌠꌋꀋꉬ。",
  legendMood: "ꉌꃀ",
  unknown: "ꀋꐚ",
  untitled: "ꁱꂷꀋꐥ",
  noStories: "ꃅꄷꀋꐥ。",
  place: "ꃅꄷ",
  coordinates: "ꌠꌋ",
  noMyPosts: "ꋌꑵꄯꒉꀋꐥ。",
  noAdminPosts: "ꋌꑵꄯꒉꀋꐥ。",
  adminLoadFailed: "ꎹꄓꄯꒉꀋꉆ:",
  submitLoading: "ꄯꒉꇁ...",
  submittedUser: "ꄯꒉꀐ，ꉢꄯꇬꉜ。",
  submittedGuest: "ꀋꉬꂓꄯꒉꀐ。",
  loginLoading: "ꀊꏀꇁ...",
  registerLoading: "ꀊꏀꃅ...",
  thanksFeedback: "ꉌꃀꄯꌠꄩꐛ!",
  failedPrefix: "ꀋꉆ: "
};

const copy = languageCopies[currentLanguage()];
const moods = copy.moods;
const statusLabels = copy.statusLabels;

const moodColors = {
  happy: "#e49b38",
  sad: "#5a7fb8",
  lost: "#7f8792",
  angry: "#c94a4a",
  anxious: "#d67a3e",
  calm: "#5da5a5",
  moved: "#e8956d",
  missing: "#b87ba3",
  grateful: "#d4a574",
  confused: "#8b7ba8",
  unspecified: "#696969"
};

const legacyMoodMap = {
  hopeful: "happy",
  tender: "moved",
  relieved: "calm",
  tired: "lost",
  secret: "confused",
  lonely: "lost"
};

const STORY_BATCH_SIZE = 10;

const chinaProvinces = ["上海市","云南省","内蒙古自治区","北京市","台湾省","吉林省","四川省","天津市","宁夏回族自治区","安徽省","山东省","山西省","广东省","广西壮族自治区","新疆生产建设兵团","新疆维吾尔自治区","江苏省","江西省","河北省","河南省","浙江省","海南省","湖北省","湖南省","澳门特别行政区","甘肃省","福建省","西藏自治区","贵州省","辽宁省","重庆市","陕西省","青海省","香港特别行政区","黑龙江省"];

const chinaCities = {"四川省":["阿坝藏族羌族自治州","巴中市","成都市","达州市","德阳市","甘孜藏族自治州","广安市","广元市","乐山市","凉山彝族自治州","泸州市","眉山市","绵阳市","南充市","内江市","攀枝花市","遂宁市","雅安市","宜宾市","资阳市","自贡市"],"新疆维吾尔自治区":["阿克苏地区","阿勒泰地区","巴音郭楞蒙古自治州","博尔塔拉蒙古自治州","昌吉回族自治州","哈密市","和田地区","喀什地区","克拉玛依市","克孜勒苏柯尔克孜自治州","塔城地区","吐鲁番市","乌鲁木齐市","伊犁哈萨克自治州"],"内蒙古自治区":["阿拉善盟","巴彦淖尔市","包头市","赤峰市","鄂尔多斯市","呼和浩特市","呼伦贝尔市","通辽市","乌海市","乌兰察布市","锡林郭勒盟","兴安盟"],"西藏自治区":["阿里地区","昌都市","拉萨市","林芝市","那曲市","日喀则市","山南市"],"陕西省":["安康市","宝鸡市","汉中市","商洛市","铜川市","渭南市","西安市","咸阳市","延安市","榆林市"],"安徽省":["安庆市","蚌埠市","亳州市","池州市","滁州市","阜阳市","合肥市","淮北市","淮南市","黄山市","六安市","马鞍山市","宿州市","铜陵市","芜湖市","宣城市"],"贵州省":["安顺市","毕节市","贵阳市","六盘水市","黔东南苗族侗族自治州","黔南布依族苗族自治州","黔西南布依族苗族自治州","铜仁市","遵义市"],"河南省":["安阳市","鹤壁市","济源市","焦作市","开封市","洛阳市","漯河市","南阳市","平顶山市","濮阳市","三门峡市","商丘市","新乡市","信阳市","许昌市","郑州市","周口市","驻马店市"],"辽宁省":["鞍山市","本溪市","朝阳市","大连市","丹东市","抚顺市","阜新市","葫芦岛市","锦州市","辽阳市","盘锦市","沈阳市","铁岭市","营口市"],"吉林省":["白城市","白山市","吉林市","辽源市","四平市","松原市","通化市","延边朝鲜族自治州","长春市"],"甘肃省":["白银市","定西市","甘南藏族自治州","嘉峪关市","金昌市","酒泉市","兰州市","临夏回族自治州","陇南市","平凉市","庆阳市","天水市","武威市","张掖市"],"广西壮族自治区":["百色市","北海市","崇左市","防城港市","贵港市","桂林市","河池市","贺州市","来宾市","柳州市","南宁市","钦州市","梧州市","玉林市"],"河北省":["保定市","沧州市","承德市","邯郸市","衡水市","廊坊市","秦皇岛市","石家庄市","唐山市","邢台市","张家口市"],"云南省":["保山市","楚雄彝族自治州","大理白族自治州","德宏傣族景颇族自治州","迪庆藏族自治州","红河哈尼族彝族自治州","昆明市","丽江市","临沧市","怒江傈僳族自治州","普洱市","曲靖市","文山壮族苗族自治州","西双版纳傣族自治州","玉溪市","昭通市"],"北京市":["北京市"],"山东省":["滨州市","德州市","东营市","菏泽市","济南市","济宁市","聊城市","临沂市","青岛市","日照市","泰安市","威海市","潍坊市","烟台市","枣庄市","淄博市"],"湖南省":["常德市","郴州市","衡阳市","怀化市","娄底市","邵阳市","湘潭市","湘西土家族苗族自治州","益阳市","永州市","岳阳市","张家界市","长沙市","株洲市"],"江苏省":["常州市","淮安市","连云港市","南京市","南通市","苏州市","宿迁市","泰州市","无锡市","徐州市","盐城市","扬州市","镇江市"],"广东省":["潮州市","东莞市","佛山市","广州市","河源市","惠州市","江门市","揭阳市","茂名市","梅州市","清远市","汕头市","汕尾市","韶关市","深圳市","阳江市","云浮市","湛江市","肇庆市","中山市","珠海市"],"黑龙江省":["大庆市","大兴安岭地区","哈尔滨市","鹤岗市","黑河市","鸡西市","佳木斯市","牡丹江市","七台河市","齐齐哈尔市","双鸭山市","绥化市","伊春市"],"山西省":["大同市","晋城市","晋中市","临汾市","吕梁市","朔州市","太原市","忻州市","阳泉市","运城市","长治市"],"湖北省":["鄂州市","恩施土家族苗族自治州","黄冈市","黄石市","荆门市","荆州市","潜江市","神农架林区","十堰市","随州市","天门市","武汉市","仙桃市","咸宁市","襄阳市","孝感市","宜昌市"],"福建省":["福州市","龙岩市","南平市","宁德市","莆田市","三明市","厦门市","漳州市","泉州市"],"江西省":["抚州市","赣州市","吉安市","景德镇市","九江市","南昌市","萍乡市","上饶市","新余市","宜春市","鹰潭市"],"宁夏回族自治区":["固原市","石嘴山市","吴忠市","银川市","中卫市"],"青海省":["果洛藏族自治州","海北藏族自治州","海东市","海南藏族自治州","海西蒙古族藏族自治州","黄南藏族自治州","西宁市","玉树藏族自治州"],"海南省":["海口市","三沙市","三亚市","儋州市"],"浙江省":["杭州市","湖州市","嘉兴市","金华市","丽水市","宁波市","衢州市","绍兴市","台州市","温州市","舟山市"],"上海市":["上海市"],"天津市":["天津市"],"重庆市":["重庆市"],"澳门特别行政区":["澳门特别行政区"],"香港特别行政区":["香港特别行政区"],"台湾省":["台湾省"],"新疆生产建设兵团":["新疆生产建设兵团"]};

const allCountries = ["不丹","东帝汶","中国","中非","丹麦","乌克兰","乌兹别克斯坦","乌干达","乌拉圭","乍得","也门","争议地区","亚美尼亚","以色列","伊拉克","伊朗","伯利兹","佛得角","俄罗斯联邦","保加利亚","克罗地亚","冈比亚","冰岛","几内亚","几内亚比绍","列支敦士登","刚果(金)","刚果（布）","利比亚","利比里亚","前南马其顿","加拿大","加纳","加蓬","加那利群岛","匈牙利","北马里亚纳","南乔治亚岛和南桑德韦奇岛","南极洲","南非","博茨瓦纳","卡塔尔","卢旺达","卢森堡","印度","印度尼西亚","危地马拉","厄瓜多尔","厄立特里亚","叙利亚","古巴","吉尔吉斯斯坦","吉布提","哈萨克斯坦","哥伦比亚","哥斯达黎加","喀麦隆","图瓦卢","土库曼斯坦","土耳其","圣卢西亚","圣基茨和尼维斯","圣多美和普林西比","圣文森特和格林纳丁斯","圣皮埃尔和密克隆","圣诞岛","圣赫勒拿","圣马力诺","圭亚那","坦桑尼亚","埃及","埃塞俄比亚","基里巴斯","塔吉克斯坦","塞内加尔","塞尔维亚","塞拉利昂","塞浦路斯","塞舌尔","墨西哥","多哥","多米尼克","多米尼加","奥地利","委内瑞拉","威克岛(美)","孟加拉国","安哥拉","安圭拉","安提瓜和巴布达","安道尔","密克罗尼西亚联邦","尼加拉瓜","尼日利亚","尼日尔","尼泊尔","巴哈马","巴基斯坦","巴巴多斯","巴布亚新几内亚","巴拉圭","巴拿马","巴林","巴西","布基纳法索","布维岛","布隆迪","希腊","帕劳","库克群岛","开曼群岛","德国","意大利","所罗门群岛","托克劳","拉脱维亚","挪威","捷克","摩尔多瓦","摩洛哥","摩纳哥","文莱","斐济","斯威士兰","斯洛伐克","斯洛文尼亚","斯瓦尔巴岛和扬马延岛","斯里兰卡","新加坡","新喀里多尼亚","新西兰","日本","智利","朝鲜","柬埔寨","格林纳达","格陵兰","格鲁吉亚","梵蒂冈","比利时","毛里塔尼亚","毛里求斯","汤加","沙特阿拉伯","法国","法属南部领地","法属圭亚那","法属玻利尼西亚","法罗群岛","波兰","波多黎各","波黑","泰国","津巴布韦","洪都拉斯","海地","澳大利亚","爱尔兰","爱德华王子岛","爱沙尼亚","牙买加","特克斯和凯科斯群岛","特立尼达和多巴哥","玻利维亚","瑙鲁","瑞典","瑞士","瓜德罗普","瓦利斯和富图纳","瓦努阿图","留尼汪","白俄罗斯","百慕大","皮特凯恩","直布罗陀","福克兰群岛(马尔维纳斯)","科威特","科摩罗","科特迪瓦","科科斯(基林)群岛","秘鲁","突尼斯","立陶宛","索马里","约旦","纳米比亚","纽埃","缅甸","罗马尼亚","美国","美属维尔京群岛","美属萨摩亚","老挝","肯尼亚","芬兰","苏丹","苏里南","英国","英属印度洋领地","英属维尔京群岛","荷兰","荷属安的列斯","莫桑比克","莱索托","菲律宾","萨尔瓦多","萨摩亚","葡萄牙","蒙古","蒙特塞拉特","西撒哈拉","西班牙","诺福克岛","贝宁","赞比亚","赤道几内亚","赫德岛和麦克唐纳岛","越南","里海","阿塞拜疆","阿富汗","阿尔及利亚","阿尔巴尼亚","阿曼","阿根廷","阿联酋","阿鲁巴","韩国","马尔代夫","马德拉岛","马拉维","马提尼克","马来西亚","马约特","马绍尔群岛","马耳他","马达加斯加","马里","鸭绿江","黎巴嫩","黑山共和国"];

const state = {posts: [], selectedMood: "all", selectedId: null, storyBatchIds: [], token: localStorage.getItem("memoryMapToken") || "", user: JSON.parse(localStorage.getItem("memoryMapUser") || "null"), myPosts: [], myStatus: "all", adminPosts: [], adminFilter: "all", map: null, markers: new Map(), draftMarker: null, locationSource: "region", geocodeLocked: false, geocodeFailed: false, manualLocation: false};

const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const locationSelects = ["#countrySelect", "#provinceSelect", "#citySelect"];

function isValidCoordinate(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function switchTab(name) {
  $$(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.tab === name));
  $$(".tab-panel").forEach(panel => panel.classList.remove("active"));
  $(`#${name}Panel`).classList.add("active");
  if (state.map) setTimeout(() => state.map.invalidateSize(), 80);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric"}).format(new Date(value));
}

function localDateTimeToIso(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

async function api(path, options = {}) {
  const response = await fetch(path, {headers: {"Content-Type": "application/json", ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}), ...(options.headers || {})}, ...options});
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || copy.messages.requestFailed);
  return payload;
}

async function reverseGeocodeLocation(lat, lng) {
  state.geocodeFailed = false;
  updateLocationControls();
  setGeocodeStatus(copy.geocodeDetecting);
  try {
    const result = await api("/api/reverse-geocode", {method: "POST", body: JSON.stringify({ lat, lng, language: "en" })});
    if (result.success) {
      applyGeocodeResult(result);
      state.geocodeLocked = true;
      state.geocodeFailed = false;
      updateLocationControls();
      setGeocodeStatus(copy.geocodeDetected(formatLocation(result)));
      return result;
    }
    state.geocodeLocked = false;
    state.geocodeFailed = true;
    updateLocationControls();
    setGeocodeStatus(copy.geocodeFailed);
    return null;
  } catch (error) {
    state.geocodeLocked = false;
    state.geocodeFailed = true;
    updateLocationControls();
    setGeocodeStatus(copy.geocodeUnavailable);
    console.log("Reverse geocoding unavailable:", error.message);
    return null;
  }
}

function setGeocodeStatus(message) {
  const status = $("#geocodeStatus");
  if (status) status.textContent = message;
}

function updateLocationControls() {
  const shouldLock = !state.manualLocation && !state.geocodeFailed;
  locationSelects.forEach(selector => {
    const select = $(selector);
    if (select) select.disabled = shouldLock;
  });
}

function applyGeocodeResult(result) {
  ensureOption($("#countrySelect"), result.country);
  $("#countrySelect").value = result.country;
  renderProvinceOptions(result.country);
  ensureOption($("#provinceSelect"), result.province || result.country);
  $("#provinceSelect").value = result.province || result.country;
  if (result.country === "中国") renderCityOptions(result.province);
  ensureOption($("#citySelect"), result.city || result.province || result.country);
  $("#citySelect").value = result.city || result.province || result.country;
}

function ensureOption(select, value) {
  if (!select || !value || Array.from(select.options).some(option => option.value === value)) return;
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  select.append(option);
}

function formatLocation(post) {
  let location = post.country || copy.messages.unknown;
  if (post.province && post.province !== post.country) location += ` / ${post.province}`;
  if (post.city && post.city !== post.province && post.city !== post.country) location += ` / ${post.city}`;
  return location;
}

function normalizeMoodKey(mood) {
  if (moods[mood] && mood !== "all") return mood;
  return legacyMoodMap[mood] || "unspecified";
}

function moodLabel(mood) {
  return moods[normalizeMoodKey(mood)] || moods.unspecified;
}

function saveSession(payload) {
  state.token = payload.token;
  state.user = payload.user;
  localStorage.setItem("memoryMapToken", payload.token);
  localStorage.setItem("memoryMapUser", JSON.stringify(payload.user));
}

function clearSession() {
  state.token = "";
  state.user = null;
  state.myPosts = [];
  localStorage.removeItem("memoryMapToken");
  localStorage.removeItem("memoryMapUser");
}

function languageUrl(language) {
  if (language === "zh-Hans") return "/index-zh.html";
  return `/index.html?lang=${encodeURIComponent(language)}`;
}

function initLanguageSelect() {
  const select = $("#languageSelect");
  if (!select) return;
  select.value = currentLanguage();
  select.addEventListener("change", () => {
    window.location.href = languageUrl(select.value);
  });
}

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function setAttr(selector, name, value) {
  const element = $(selector);
  if (element) element.setAttribute(name, value);
}

function setPlaceholder(selector, value) {
  const element = $(selector);
  if (element) element.placeholder = value;
}

function setLabelText(labelIndex, value) {
  const labels = $$("#submitForm > label span, #submitForm .field-grid label span, #submitForm .coords label span");
  if (labels[labelIndex]) labels[labelIndex].textContent = value;
}

function setAuthLabelText(index, value) {
  const labels = $$("#authBox label span");
  if (labels[index]) labels[index].textContent = value;
}

function setFeedbackLabelText(index, value) {
  const labels = $$("#feedbackForm label span");
  if (labels[index]) labels[index].textContent = value;
}

function applyStaticTranslations() {
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  setText(".kicker", copy.brandKicker);
  setText("h1", copy.brandTitle);
  setAttr(".top-actions", "aria-label", copy.actions.language);
  setAttr("#languageSelect", "aria-label", copy.actions.language);
  setAttr("#openSubmit", "title", copy.actions.submit);
  setAttr("#openSubmit", "aria-label", copy.actions.submit);
  setAttr("#openInfo", "title", copy.actions.about);
  setAttr("#openInfo", "aria-label", copy.actions.about);
  setAttr("#openMine", "title", copy.actions.mine);
  setAttr("#openMine", "aria-label", copy.actions.mine);
  setAttr("#mapCanvas", "aria-label", copy.mapAria);
  setText(".hint-chip", copy.hint);
  $$(".panel-tabs .tab").forEach((tab, index) => { if (copy.tabs[index]) tab.textContent = copy.tabs[index]; });
  setText("#readPanel .eyebrow", copy.readEyebrow);
  setText("#readPanel h2", copy.readTitle);
  setText("#refreshStories", copy.refresh);
  setText("#submitIdentity", copy.submitIdentityGuest);
  setText("#submitPanel h2", copy.submitTitle);
  setLabelText(0, copy.labels.title);
  setLabelText(1, copy.labels.content);
  setLabelText(2, copy.labels.author);
  setLabelText(3, copy.labels.time);
  setLabelText(4, copy.labels.country);
  setLabelText(5, copy.labels.province);
  setLabelText(6, copy.labels.city);
  setText(".manual-location-toggle span", copy.labels.manualLocation);
  setText("#geocodeStatus", copy.geocodeIdle);
  setLabelText(8, copy.labels.mood);
  setLabelText(9, copy.labels.place);
  setLabelText(10, copy.labels.lat);
  setLabelText(11, copy.labels.lng);
  setPlaceholder('input[name="title"]', copy.placeholders.title);
  setPlaceholder('textarea[name="body"]', copy.placeholders.content);
  setPlaceholder('input[name="author"]', copy.placeholders.author);
  setPlaceholder('input[name="placeName"]', copy.placeholders.place);
  const moodSelect = document.querySelector('select[name="mood"]');
  if (moodSelect) Array.from(moodSelect.options).forEach(option => { option.textContent = moods[option.value] || option.textContent; });
  const submitMicrocopy = $("#submitForm > .microcopy:not(#geocodeStatus)");
  if (submitMicrocopy) submitMicrocopy.textContent = copy.submitMicrocopy;
  setText("#submitForm .primary-btn", copy.publish);
  setText("#minePanel > .panel-heading .eyebrow", copy.mineEyebrow);
  setText("#minePanel > .panel-heading h2", copy.mineTitle);
  setAuthLabelText(0, copy.labels.username);
  setAuthLabelText(1, copy.labels.password);
  setAuthLabelText(2, copy.labels.createAccount);
  setAuthLabelText(3, copy.labels.setPassword);
  setPlaceholder('#loginForm input[name="username"]', copy.placeholders.username);
  setPlaceholder('#loginForm input[name="password"]', copy.placeholders.password);
  setPlaceholder('#registerForm input[name="username"]', copy.placeholders.registerUsername);
  setPlaceholder('#registerForm input[name="password"]', copy.placeholders.password);
  setText("#loginForm .primary-btn", copy.login);
  setText("#registerForm .secondary-btn", copy.register);
  const authMicrocopy = $("#authBox > .microcopy");
  if (authMicrocopy) authMicrocopy.textContent = copy.authMicrocopy;
  setText("#mineBox .account-row .eyebrow", copy.currentAccount);
  setText("#logoutButton", copy.logout);
  setText("#adminBox .account-row .eyebrow", copy.adminPanel);
  setText("#adminLogoutButton", copy.logout);
  $$("[data-my-status], [data-admin-filter]").forEach(button => {
    const key = button.dataset.myStatus || button.dataset.adminFilter;
    button.textContent = copy.filters[key] || button.textContent;
  });
  setText("#aboutPanel .eyebrow", copy.aboutEyebrow);
  setText("#aboutPanel h2", copy.aboutTitle);
  $$("#aboutPanel .about-copy p").forEach((paragraph, index) => { if (copy.about[index]) paragraph.textContent = copy.about[index]; });
  setText("#openFeedback", copy.feedback);
  setText("#feedbackModal .modal-header h2", copy.feedbackModalTitle);
  setFeedbackLabelText(0, copy.labels.feedbackType);
  setFeedbackLabelText(1, copy.labels.feedbackTitle);
  setFeedbackLabelText(2, copy.labels.feedbackContent);
  setFeedbackLabelText(3, copy.labels.feedbackContact);
  const feedbackType = document.querySelector('#feedbackForm select[name="type"]');
  if (feedbackType) Array.from(feedbackType.options).forEach(option => { option.textContent = copy.feedbackTypes[option.value] || option.textContent; });
  setPlaceholder('#feedbackForm input[name="title"]', copy.placeholders.feedbackTitle);
  setPlaceholder('#feedbackForm textarea[name="content"]', copy.placeholders.feedbackContent);
  setPlaceholder('#feedbackForm input[name="contact"]', copy.placeholders.feedbackContact);
  setText("#feedbackForm .primary-btn", copy.submitShort);
  $$("#mineTemplate .delete-btn, #adminPostTemplate .delete-btn").forEach(button => { button.textContent = copy.delete; });
}

function renderFilters() {
  const filters = $("#filters");
  filters.innerHTML = "";
  Object.entries(moods).forEach(([key, label]) => {
    const button = document.createElement("button");
    button.className = `secondary-btn ${state.selectedMood === key ? "active" : ""}`;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      state.selectedMood = key;
      state.selectedId = null;
      refreshStoryBatch();
      render();
    });
    filters.append(button);
  });
}

function filteredPosts() {
  return state.posts.filter(post => state.selectedMood === "all" || normalizeMoodKey(post.mood) === state.selectedMood);
}

function shufflePosts(posts) {
  const shuffled = [...posts];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function refreshStoryBatch() {
  state.storyBatchIds = shufflePosts(filteredPosts()).slice(0, STORY_BATCH_SIZE).map(post => post.id);
}

function storyBatchPosts() {
  const posts = filteredPosts();
  if (!posts.length) return [];
  const postById = new Map(posts.map(post => [post.id, post]));
  let batch = state.storyBatchIds.map(id => postById.get(id)).filter(Boolean);
  if (!batch.length) {
    refreshStoryBatch();
    batch = state.storyBatchIds.map(id => postById.get(id)).filter(Boolean);
  }
  return batch;
}

function includePostInStoryBatch(post) {
  if (!post || !filteredPosts().some(item => item.id === post.id)) return;
  state.storyBatchIds = [post.id, ...state.storyBatchIds.filter(id => id !== post.id)].slice(0, STORY_BATCH_SIZE);
}

function initMap() {
  if (!window.L) {
    $("#map").innerHTML = `<div class="map-fallback">${escapeHtml(copy.messages.mapFailed)}</div>`;
    return;
  }
  state.map = L.map("map", {center: [20, 0], zoom: 2, minZoom: 2, maxBounds: [[-85, -180], [85, 180]], maxBoundsViscosity: 0.8, zoomControl: false});
  document.querySelector("#map").addEventListener("touchmove", event => { if (event.touches.length > 1) event.preventDefault(); }, { passive: false });
  L.control.zoom({ position: "bottomleft" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(state.map);
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "map-legend");
    div.innerHTML = `<p class="legend-title">${escapeHtml(copy.messages.legendMood)}</p>`;
    Object.entries(moods).forEach(([key, label]) => { if (key === "all") return; const color = moodColors[key] || "#595f59"; div.innerHTML += `<div class="legend-item"><span class="legend-dot" style="background-color: ${color}"></span>${label}</div>`; });
    return div;
  };
  legend.addTo(state.map);
  state.map.on("click", event => {
    const { lat, lng } = event.latlng;
    if (!isValidCoordinate(lat, lng)) { $("#submitStatus").textContent = copy.messages.invalidCoordinates; switchTab("submit"); return; }
    setDraftLocation(lat, lng, "map");
    reverseGeocodeLocation(lat, lng);
    switchTab("submit");
  });
}

function setDraftLocation(lat, lng, source = "map") {
  state.locationSource = source;
  $("#latInput").value = lat.toFixed(5);
  $("#lngInput").value = lng.toFixed(5);
  if (!state.map) return;
  if (state.draftMarker) state.draftMarker.remove();
  state.draftMarker = L.circleMarker([lat, lng], {radius: 9, color: "#222321", weight: 2, fillColor: "#b07c2a", fillOpacity: 0.9}).addTo(state.map);
}

function renderMapMarkers() {
  if (!state.map) return;
  state.markers.forEach(marker => marker.remove());
  state.markers.clear();
  filteredPosts().forEach(post => {
    const marker = L.circleMarker([post.lat, post.lng], {radius: 7, color: "#fffdf8", weight: 2, fillColor: moodColors[normalizeMoodKey(post.mood)] || moodColors.unspecified, fillOpacity: 0.92, bubblingMouseEvents: false}).addTo(state.map);
    let popupContent = `<strong>${post.title || copy.messages.untitled}</strong>`;
    if (post.author) popupContent += `<br><em>${post.author}</em>`;
    popupContent += `<br>${formatLocation(post)} - ${post.placeName}`;
    marker.bindPopup(popupContent);
    marker.on("click", (e) => {
      if (e.originalEvent) L.DomEvent.stop(e.originalEvent);
      selectPost(post, { centerMap: true, openPopup: true, renderAll: false });
    });
    state.markers.set(post.id, marker);
  });
}

function selectPost(post, options = {}) {
  const { centerMap = true, openPopup = true, renderAll = true } = options;
  state.selectedId = post.id;
  includePostInStoryBatch(post);
  switchTab("read");
  if (renderAll) render();
  else renderStories();
  if (state.map) {
    if (centerMap) state.map.setView([post.lat, post.lng], Math.max(state.map.getZoom(), 7), { animate: true });
    const marker = state.markers.get(post.id);
    if (marker && openPopup) marker.openPopup();
  }
  scrollSelectedStoryIntoView();
}

function focusPost(post) {
  selectPost(post, { centerMap: true, openPopup: true, renderAll: true });
}

function scrollSelectedStoryIntoView() {
  setTimeout(() => {
    const selected = document.querySelector(".story-card.selected");
    if (selected) selected.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, 60);
}

function renderStories() {
  const list = $("#storyList");
  const template = $("#storyTemplate");
  list.innerHTML = "";
  const posts = storyBatchPosts();
  if (!posts.length) { list.innerHTML = `<p class="microcopy">${escapeHtml(copy.messages.noStories)}</p>`; return; }
  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".story-card");
    const button = node.querySelector(".story-button");
    card.dataset.postId = post.id;
    const isSelected = state.selectedId === post.id;
    let topline = `${moodLabel(post.mood)} / ${formatLocation(post)} / ${formatDate(post.createdAt)}`;
    if (post.author) topline += ` / ${post.author}`;
    node.querySelector(".story-topline").textContent = topline;
    node.querySelector("strong").textContent = post.title || copy.messages.untitled;
    node.querySelector("p").textContent = post.body;
    card.classList.toggle("selected", isSelected);
    card.classList.toggle("expanded", isSelected);
    button.addEventListener("click", () => focusPost(post));
    if (isSelected) card.append(createStoryExpansion(post));
    list.append(node);
  });
}

function createStoryExpansion(post) {
  const detail = document.createElement("div");
  detail.className = "story-expanded";
  const meta = [
    moodLabel(post.mood),
    formatLocation(post),
    post.placeName,
    formatDate(post.createdAt)
  ];
  if (post.author) meta.push(post.author);
  detail.innerHTML = `
    <span class="story-topline">${escapeHtml(meta.join(" / "))}</span>
    <p>${escapeHtml(post.body)}</p>
    <dl>
      <div><dt>${escapeHtml(copy.messages.place)}</dt><dd>${escapeHtml(post.placeName || copy.messages.unknown)}</dd></div>
      <div><dt>${escapeHtml(copy.messages.coordinates)}</dt><dd>${Number(post.lat).toFixed(5)}, ${Number(post.lng).toFixed(5)}</dd></div>
    </dl>
  `;
  return detail;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderCountryOptions() {
  const select = $("#countrySelect");
  select.innerHTML = "";
  allCountries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
  });
  select.value = "中国";
  renderProvinceOptions("中国");
}

function renderProvinceOptions(country) {
  const select = $("#provinceSelect");
  select.innerHTML = "";
  if (country === "中国") {
    chinaProvinces.forEach(prov => {
      const option = document.createElement("option");
      option.value = prov;
      option.textContent = prov;
      select.append(option);
    });
    select.value = chinaProvinces[0];
    renderCityOptions(chinaProvinces[0]);
  } else {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
    select.value = country;
    const citySelect = $("#citySelect");
    citySelect.innerHTML = "";
    const cityOption = document.createElement("option");
    cityOption.value = country;
    cityOption.textContent = country;
    citySelect.append(cityOption);
  }
}

function renderCityOptions(province) {
  const select = $("#citySelect");
  select.innerHTML = "";
  const cities = chinaCities[province] || [province];
  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    select.append(option);
  });
}

function renderAuth() {
  const loggedIn = Boolean(state.user);
  const isAdminUser = loggedIn && state.user.role === "admin";
  $("#authBox").classList.toggle("hidden", loggedIn);
  $("#mineBox").classList.toggle("hidden", !loggedIn || isAdminUser);
  $("#adminBox").classList.toggle("hidden", !isAdminUser);
  $("#submitIdentity").textContent = loggedIn ? copy.submitIdentityUser(state.user.username) : copy.submitIdentityGuest;
  if (loggedIn) {
    $("#currentUsername").textContent = state.user.username;
    if (isAdminUser) $("#adminUsername").textContent = `${state.user.username} (${copy.adminPanel})`;
  }
}

function renderMyPosts() {
  const list = $("#mineList");
  const template = $("#mineTemplate");
  list.innerHTML = "";
  if (!state.user) return;
  const posts = state.myPosts.filter(post => state.myStatus === "all" || post.status === state.myStatus);
  if (!posts.length) { list.innerHTML = `<p class="microcopy">${escapeHtml(copy.messages.noMyPosts)}</p>`; return; }
  posts.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.country} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".mine-body").textContent = post.body;
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.textContent = copy.delete;
    deleteBtn.addEventListener("click", async () => { try { await api(`/api/posts/${post.id}/delete`, { method: "POST" }); await Promise.all([loadPosts(), loadMyPosts()]); } catch (error) { console.error(copy.messages.failedPrefix, error.message); } });
    list.append(node);
  });
}

function renderAdminPosts() {
  if (!state.user || state.user.role !== "admin") return;
  const list = $("#adminPostsList");
  const template = $("#adminPostTemplate");
  list.innerHTML = "";
  const filtered = state.adminFilter === "all" ? state.adminPosts : state.adminPosts.filter(p => p.status === state.adminFilter);
  if (!filtered.length) { list.innerHTML = `<p class="microcopy">${escapeHtml(copy.messages.noAdminPosts)}</p>`; return; }
  filtered.forEach(post => {
    const node = template.content.cloneNode(true);
    node.querySelector(".story-topline").textContent = `${statusLabels[post.status] || post.status} / ${post.country} / ${post.placeName} / ${formatDate(post.createdAt)}`;
    node.querySelector("h3").textContent = post.title;
    node.querySelector(".post-body").textContent = post.body;
    const deleteBtn = node.querySelector(".delete-btn");
    deleteBtn.setAttribute("data-post-id", post.id);
    deleteBtn.textContent = copy.delete;
    deleteBtn.addEventListener("click", async () => { try { await api(`/api/admin/posts/${post.id}/delete`, { method: "POST" }); await loadAdminPosts(); } catch (error) { console.error(copy.messages.failedPrefix, error.message); } });
    list.append(node);
  });
}

async function loadAdminPosts() {
  if (!state.user || state.user.role !== "admin") return;
  try {
    state.adminPosts = await api("/api/admin/posts");
    renderAdminPosts();
  } catch (error) {
    console.error(copy.messages.adminLoadFailed, error);
  }
}

function render() {
  renderFilters();
  renderMapMarkers();
  renderStories();
  renderAuth();
  renderMyPosts();
  renderAdminPosts();
}

async function loadPosts() {
  state.posts = await api("/api/posts");
  if (state.selectedId && !state.posts.some(post => post.id === state.selectedId)) state.selectedId = null;
  refreshStoryBatch();
  render();
}

async function loadMyPosts() {
  if (!state.user) return;
  state.myPosts = await api("/api/me/posts");
  renderMyPosts();
}

async function restoreSession() {
  if (!state.token) { renderAuth(); return; }
  try {
    const payload = await api("/api/me");
    state.user = payload.user;
    localStorage.setItem("memoryMapUser", JSON.stringify(payload.user));
    await loadMyPosts();
  } catch {
    clearSession();
  }
  renderAuth();
}

function wireEvents() {
  $$(".tab").forEach(tab => tab.addEventListener("click", () => { switchTab(tab.dataset.tab); if (tab.dataset.tab === "mine") loadMyPosts().catch(error => { $("#authStatus").textContent = error.message; }); }));
  $("#openSubmit").addEventListener("click", () => switchTab("submit"));
  $("#openInfo").addEventListener("click", () => switchTab("about"));
  $("#openMine").addEventListener("click", () => switchTab("mine"));
  initLanguageSelect();
  $("#refreshStories").addEventListener("click", () => {
    state.selectedId = null;
    refreshStoryBatch();
    renderStories();
  });
  $("#manualLocationToggle").addEventListener("change", event => {
    state.manualLocation = event.target.checked;
    updateLocationControls();
    if (state.manualLocation) setGeocodeStatus(copy.geocodeManual);
    else if (state.geocodeLocked) setGeocodeStatus(copy.geocodeDetected(formatLocation({ country: $("#countrySelect").value, province: $("#provinceSelect").value, city: $("#citySelect").value })));
    else if (state.geocodeFailed) setGeocodeStatus(copy.geocodeFailed);
    else setGeocodeStatus(copy.geocodeIdle);
  });
  $("#countrySelect").addEventListener("change", event => {
    if (!state.manualLocation && state.geocodeLocked) return;
    const country = event.target.value;
    renderProvinceOptions(country);
    if (country === "中国") {
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
    }
  });
  $("#provinceSelect").addEventListener("change", event => {
    if (!state.manualLocation && state.geocodeLocked) return;
    const province = event.target.value;
    const country = $("#countrySelect").value;
    if (country === "中国") renderCityOptions(province);
  });
  document.querySelector('select[name="mood"]').value = "happy";
  $("#submitForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.country = $("#countrySelect").value;
    payload.province = $("#provinceSelect").value;
    payload.city = $("#citySelect").value;
    payload.lat = Number(payload.lat);
    payload.lng = Number(payload.lng);
    payload.createdAt = localDateTimeToIso(payload.createdAt);
    const status = $("#submitStatus");
    status.textContent = copy.messages.submitLoading;
    try {
      await api("/api/posts", { method: "POST", body: JSON.stringify(payload) });
      form.reset();
      $("#countrySelect").value = "中国";
      renderProvinceOptions("中国");
      const firstProvince = chinaProvinces[0];
      renderCityOptions(firstProvince);
      $("#provinceSelect").value = firstProvince;
      state.geocodeLocked = false;
      state.geocodeFailed = false;
      state.manualLocation = false;
      $("#manualLocationToggle").checked = false;
      updateLocationControls();
      setGeocodeStatus(copy.geocodeIdle);
      status.textContent = state.user ? copy.messages.submittedUser : copy.messages.submittedGuest;
      await Promise.all([loadPosts(), loadMyPosts()]);
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#loginForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = copy.messages.loginLoading;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
      saveSession(result);
      form.reset();
      status.textContent = "";
      await Promise.all([loadMyPosts(), loadAdminPosts()]);
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#registerForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("#authStatus");
    status.textContent = copy.messages.registerLoading;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
      saveSession(result);
      form.reset();
      status.textContent = "";
      await Promise.all([loadMyPosts(), loadAdminPosts()]);
      render();
    } catch (error) {
      status.textContent = error.message;
    }
  });
  $("#logoutButton").addEventListener("click", () => { clearSession(); render(); });
  $$("[data-my-status]").forEach(button => { button.addEventListener("click", () => { state.myStatus = button.dataset.myStatus; $$("[data-my-status]").forEach(item => item.classList.toggle("active", item === button)); renderMyPosts(); }); });
  $$("[data-admin-filter]").forEach(button => { button.addEventListener("click", () => { state.adminFilter = button.dataset.adminFilter; $$("[data-admin-filter]").forEach(item => item.classList.toggle("active", item === button)); renderAdminPosts(); }); });
  $("#adminLogoutButton").addEventListener("click", () => { clearSession(); render(); });
  $("#openFeedback").addEventListener("click", () => { $("#feedbackModal").classList.remove("hidden"); });
  $("#closeFeedback").addEventListener("click", () => { $("#feedbackModal").classList.add("hidden"); });
  $("#feedbackModal").addEventListener("click", event => { if (event.target === $("#feedbackModal")) $("#feedbackModal").classList.add("hidden"); });
  $("#feedbackForm").addEventListener("submit", async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const statusEl = $("#feedbackStatus");
    statusEl.textContent = copy.messages.submitLoading;
    try {
      await api("/api/feedback", { method: "POST", body: JSON.stringify(data) });
      form.reset();
      statusEl.textContent = copy.messages.thanksFeedback;
      setTimeout(() => { $("#feedbackModal").classList.add("hidden"); statusEl.textContent = ""; }, 2000);
    } catch (error) {
      statusEl.textContent = copy.messages.failedPrefix + error.message;
    }
  });
}

applyStaticTranslations();
renderCountryOptions();
updateLocationControls();
initMap();
wireEvents();
restoreSession();
loadPosts();
