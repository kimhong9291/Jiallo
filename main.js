// 遊戲狀態
let loveScore = 0;
let currentSceneId = 'scene_start';
let currentStepIndex = 0;
// 最佳實踐：使用 Set 來儲存 ID，因為 Set 只允許唯一值，查詢速度更快。
let playedChapters = new Set();
let visitedScenes = new Set();
const MAX_LOVE_SCORE = 131;
let playerName = "";
const SAVE_KEY = 'excelLoveSave_slot1';


// DOM 元素（預先聲明，在 DOMContentLoaded 內賦值）
let uploadedImgDisplay;
let characterImg;
let clearImgButton;
const defaultImageSrc = ''
let dialogueBox;
let textContent;
let nameTag;
let optionsContainer;
let scoreDisplay;
let startScreen;
let endScreen;
let endTitle;
let endDesc;
let fileInput;
let menuToggleButton;
let menuContent;
let playerNameInput;
let startGameButton;
// 🌟 NEW: 公告模態視窗 DOM 元素 (約 25 行)
let announcementModal;
let announcementOpenBtn;
let announcementCloseBtn;


function getGameState() {
    return {
        loveScore: loveScore,
        currentSceneId: currentSceneId,
        currentStepIndex: currentStepIndex,
        playedChapters: Array.from(playedChapters), // Set 轉為 Array
        visitedScenes: Array.from(visitedScenes),   // Set 轉為 Array
        playerName: playerName,
        // 確保這裡包含所有需要儲存的狀態
    };
}

// 🌟 遊戲容器 (用於翻轉)
let gameContainer;
import { script_tosLine } from "./script_data_tos.js";
import { main_script_chap1 } from "./script_data.js";

let script = []; 

async function loadAndStartGame() {
    try {
        // 🌟 合併所有劇本 🌟
        // 直接使用匯入的變數，假設它們都是一個劇本陣列
        script = [...main_script_chap1, ...script_tosLine]; 

        // 開始遊戲
        startGame(); // 這裡不需要傳入 script 參數，因為 script 已經是全域變數

    } catch (error) {
        console.error("無法載入遊戲劇本！", error);
        alert("遊戲載入失敗，無法取得劇本資料。");
    }
}


// ----------------------------------------------------
// 文件上傳及清空核心邏輯
// ----------------------------------------------------
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImgDisplay.src = e.target.result;
            uploadedImgDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function resetFileInput() {
    const oldFileInput = fileInput;
    const newFileInput = oldFileInput.cloneNode(true);
    newFileInput.value = '';
    oldFileInput.parentNode.replaceChild(newFileInput, oldFileInput);
    fileInput = newFileInput;
    // 重新綁定事件到新的 fileInput 元素
    fileInput.addEventListener('change', handleFileUpload);
}

// ----------------------------------------------------
// 逐字播放核心邏輯
// ----------------------------------------------------

const typingSpeed = 50; // 毫秒/字
let typingTimeout;
let currentFullText = "";
let currentTargetElement = null;
let currentCallback = null;
let currentTypingIndex = 0;
let isTypingActive = false;

function typeWriterEffect(targetElement, fullText, callback = () => { }) {
    if (isTypingActive) return;

    currentFullText = fullText;
    currentTargetElement = targetElement;
    currentCallback = callback;
    currentTypingIndex = 0;
    targetElement.innerText = '';
    isTypingActive = true;

    function type() {
        if (!isTypingActive) return;

        if (currentTypingIndex < currentFullText.length) {
            currentTargetElement.innerText += currentFullText.charAt(currentTypingIndex);
            currentTypingIndex++;

            let currentSpeed = typingSpeed;
            let textBefore = currentFullText.substring(0, currentTypingIndex);
            if (textBefore.includes('（') && !textBefore.includes('）')) {
                currentSpeed = 20;
            }

            typingTimeout = setTimeout(type, currentSpeed);
        } else {
            isTypingActive = false;
            currentCallback();
        }
    }
    type();
}

function skipTyping() {
    if (isTypingActive) {
        clearTimeout(typingTimeout);
        currentTargetElement.innerText = currentFullText;
        isTypingActive = false;
        currentCallback();
    }
}


// ----------------------------------------------------
// 遊戲流程控制
// ----------------------------------------------------

// 點擊對話框時，如果沒有選項，則推進到下一個步驟
function nextStep(event) {
    if (isTypingActive) {
        return;
    }

    if (optionsContainer.childElementCount > 0) return;

    const scene = script.find(s => s.id === currentSceneId);
    if (!scene) {
        console.error(`找不到場景 ID: ${currentSceneId}`);
        return;
    }

    if (currentStepIndex < scene.steps.length) {
        const step = scene.steps[currentStepIndex];

        // 如果步驟中包含 'img' 屬性，則更新 characterImg 的 src
        if (step.img) {
            characterImg.src = step.img;
        }

        // 處理多步驟反應時，避免重複綁定
        dialogueBox.removeEventListener('click', nextStep);

        nameTag.innerText = step.name;

        // 🌟 修正：替換名字，並處理對話者為「你」的情況 [MODIFIED]
        let textSource = step.text;
        if (step.name === '你') {
            nameTag.innerText = playerName; // 對話者名字替換為玩家名字
        }
        const textToDisplay = processTextForName(textSource); // <-- 應用名字替換

        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        typeWriterEffect(textContent, textToDisplay, () => {
            // 打字結束後，檢查是否為最後一個步驟
            currentStepIndex++; // 先增加計數器，再判斷
            if (currentStepIndex === scene.steps.length) {
                // 是最後一步，顯示選項
                displayOptions(scene.options);
            } else {
                // 不是最後一步，重新綁定 nextStep 監聽器
                dialogueBox.addEventListener('click', nextStep, { once: true });

                // 顯示提示文字
                const tip = document.createElement('div');
                tip.id = 'next-step-tip';
                tip.style.fontSize = "12px";
                tip.style.color = "#ccc";
                tip.style.textAlign = "right";
                tip.innerText = "▼ 點擊繼續";
                textContent.appendChild(tip);
            }
        });
    }
}

// 新增：處理多步驟反應陣列 (此函數邏輯不變)
function playReactions(reactions, nextSceneId) {
    let reactionIndex = 0;

    function showNextReaction() {
        if (reactionIndex < reactions.length) {
            const step = reactions[reactionIndex];

            // 【✨ 新增邏輯：檢查並更新角色立繪 ✨】
            if (step.img) {
                characterImg.src = step.img;
            }

            nameTag.innerText = step.name;

            // 移除上一次的提示文字
            const oldTip = document.getElementById('next-step-tip');
            if (oldTip) oldTip.remove();

            /// 🌟 修正：替換名字 [MODIFIED]
            const textToDisplay = processTextForName(step.text); // <-- 應用名字替換

            typeWriterEffect(textContent, textToDisplay, () => {
                reactionIndex++;

                if (reactionIndex < reactions.length) {
                    // 還有下一條反應，等待點擊
                    const nextReactionHandler = () => {
                        dialogueBox.removeEventListener('click', nextReactionHandler);
                        showNextReaction();
                    };
                    dialogueBox.addEventListener('click', nextReactionHandler, { once: true });

                    const tip = document.createElement('div');
                    tip.id = 'next-step-tip';
                    tip.style.fontSize = "12px";
                    tip.style.color = "#ccc";
                    tip.style.textAlign = "right";
                    tip.innerText = "▼ 點擊繼續反應";
                    textContent.appendChild(tip);

                } else {
                    // 反應陣列結束，跳轉到下一場景/結局
                    handleReactionEnd(nextSceneId);
                }
            });

        } else {
            // 這是不會發生的情況，但以防萬一
            handleReactionEnd(nextSceneId);
        }
    }
    showNextReaction();
}


// 輔助函數：處理反應結束後的跳轉邏輯 (此函數邏輯不變)
function handleReactionEnd(nextSceneId) {
    // 移除可能存在的舊提示文字
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    const isEnding = nextSceneId === 'ending_check' || nextSceneId === 'ending_hidden_1' || nextSceneId === 'ending_true_vba' || nextSceneId === 'ending_check_TOS' || nextSceneId === 'special_ending_check_塔批';

    const handler = () => {
        dialogueBox.removeEventListener('click', handler);
        if (isEnding) {
            showEnding(nextSceneId);
        } else {
            showScene(nextSceneId); // 這裡呼叫 showScene 會啟動轉場
        }
    };

    dialogueBox.addEventListener('click', handler, { once: true });

    // 添加提示
    const tip = document.createElement('div');
    tip.id = 'next-step-tip';
    tip.style.fontSize = "12px";
    tip.style.color = "#ccc";
    tip.style.textAlign = "right";
    tip.innerText = isEnding ? "▼ 點擊查看結局" : "▼ 點擊進入下一場景";
    textContent.appendChild(tip);
}



// 輔助函數：顯示選項 (此函數邏輯不變)
function displayOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('div');
        btn.className = 'option-btn';
        btn.innerText = option.text;
        btn.onclick = () => handleChoice(option);
        optionsContainer.appendChild(btn);
    });
}


// 輔助函數：實際載入場景內容 (此函數邏輯不變)
function _loadSceneContent(id) {
    optionsContainer.innerHTML = '';
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    currentSceneId = id;
    currentStepIndex = 0;

    // 🌟 1. 找到場景資料 🌟
    const scene = script.find(s => s.id === id);
    if (!scene) {
        console.error(`找不到場景 ID: ${id}`);
        return;
    }

    function startSceneContent() {
        // 記錄場景 ID
        visitedScenes.add(id);

        // 確保 nextStep 監聽器在 showScene 時被添加
        dialogueBox.removeEventListener('click', nextStep);
        dialogueBox.addEventListener('click', nextStep);

        nextStep(); // 開始顯示第一個對話步驟
    }
    // --------------------------------------------------------

    // 🌟 2. 檢查是否需要播放章節動畫 🌟
    if (scene.chapter && !playedChapters.has(scene.chapter)) {
        
        const chapterTitle = scene.chapter;
        playedChapters.add(chapterTitle); // 紀錄已播放

        // 播放章節動畫，並將 startSceneContent 作為回調傳入
        displayChapterTitle(chapterTitle, startSceneContent);

    } else {
        // 不需要播放章節動畫，直接載入場景內容
        startSceneContent();
    }
}


/**
 * 處理場景切換，帶有容器翻頁效果
 * @param {string} id - 要切換到的場景 ID
 */
/**
 * 處理場景切換，帶有容器翻頁效果
 * @param {string} id - 要切換到的場景 ID
 */
/**
 * 處理場景切換，帶有容器翻頁效果
 * @param {string} id - 要切換到的場景 ID
 */
function showScene(id) {
    if (!gameContainer) {
        console.warn("Game container not found. Skipping transition.");
        _loadSceneContent(id);
        return;
    }

    // 1. 開始翻轉出去 (Flip Out: 0度 -> 180度, 0.8s)
    dialogueBox.removeEventListener('click', nextStep);
    gameContainer.classList.add('flip-out'); // 應用 CSS rotateY(180deg) 變換

    // 2. 等待 Flip Out 動畫完成 (0.8s)
    setTimeout(() => {

        // 🌟 關鍵修正點：在達到 180 度時（畫面在背面），立即清空內容
        textContent.innerText = '';
        nameTag.innerText = '';
        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        // 3. 立即開始翻轉回來 (Flip In: 180度 -> 0度, 0.8s)
        gameContainer.classList.remove('flip-out');

        // 4. 等待 Flip In 動畫完成 (再過 0.8s) -> 總計 1.6s
        setTimeout(() => {

            // 5. 翻轉完成 (360度)：暫停 1 秒 (1.6s -> 2.6s)
            setTimeout(() => {

                // 6. 延遲結束：載入新場景內容 (執行 script)
                _loadSceneContent(id);

            }, 1000); // 1000ms (1秒) 暫停

        }, 800); // 800ms (Flip In 動畫時間)

    }, 800); // 800ms (Flip Out 動畫時間)
}


function startGame() {

    // 1. 處理玩家名字輸入 [MODIFIED]
    // 🌟 修正：先檢查 playerNameInput 是否已經在 DOMContentLoaded 中獲取
    if (!playerNameInput) {
        playerNameInput = document.getElementById('player-name-input');
    }

    let inputName = playerNameInput ? playerNameInput.value.trim() : "";
    if (inputName) {
        // 使用玩家輸入的名字
        playerName = inputName;
    } else {
        // 使用預設名字
        playerName = "你";
    }

    loveScore = 0;
    currentSceneId = 'scene_start';
    currentStepIndex = 0;
    visitedScenes.clear();
    updateScore();
    playedChapters.clear();
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    dialogueBox.style.display = 'block';

    // 確保 nextStep 監聽器在 startGame 時被添加
    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.addEventListener('click', nextStep);

    const audio = document.getElementById('bgm');
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(e => console.log("需使用者互動才能播放音樂或被阻止。"));
    }

    // 這裡使用 _loadSceneContent 直接載入，因為遊戲開始不需要轉場效果
    _loadSceneContent('scene_start');
}

function processTextForName(text) {
    // 🌟 關鍵修正：將佔位符從 [玩家名字] 改為 【玩家名字】
    if (playerName && text.includes('【玩家名字】')) {
        // 替換劇本中的佔位符 【玩家名字】 為玩家設定的名字
        return text.replace(/【玩家名字】/g, playerName);
    }
    return text;
}

function getNextScene(next) {
    // 範例：檢查是否是特殊判定的佔位符（你需要將選項中的 next 設為這個 ID）
    if (next === '131') {
        // --- 條件 A：高好感度 + 訪問過特定場景 ---
        // 假設 'scene_chat_morning' 是觸發高好感度特殊路線的前置場景
        if (loveScore >= 131 && visitedScenes.has('神魔之塔2') && !visitedScenes.has('神魔之塔3')) {
            return '131_A';
        }
        else if (loveScore >= 131 && visitedScenes.has('神魔之塔4') && (playerName=="白銀" || playerName=="白银")) {
            return '131_Silver';
        }
        else { return '131'; }// 你的高好感度特殊場景 ID


        // --- 條件 B：低好感度 + 未訪問過特定場景 ---
        // 假設 'scene_break_fail' 是低好感度線路的預警場景
        //else if (loveScore < 30 && !visitedScenes.has('scene_break_fail')) {
        //console.log("條件 B 成立：進入特殊場景 'special_low_ref'");
        //return 'special_low_ref'; // 你的低好感度特殊場景 ID
        //}

        // --- 預設跳轉 ---
        // 如果所有條件都不滿足，跳轉到腳本中選項原本設定的預設場景
        return next; // 修正：這裡應該返回原本的 next，而不是一個未定義的 ID
    }

    // 如果 nextId 不是特殊檢查標籤，直接返回它
    return next;
};

function updateScore() {
    scoreDisplay.innerText = loveScore;
}


// 【🌟 修改函式：在跳轉前調用 getNextScene 進行判定 🌟】
function handleChoice(option) {
    // 1. 處理分數
    loveScore = Math.min(loveScore + option.score, MAX_LOVE_SCORE);;
    updateScore();
    optionsContainer.innerHTML = '';

    // 2. 【關鍵修改點】在播放反應前，先檢查最終的跳轉目標
    let destinationId = option.next;

    // 調用新的判定函式，如果 option.next 是一個檢查標籤，這裡會返回真正的目標 ID
    destinationId = getNextScene(destinationId);

    // 3. 判斷反應類型 (這裡開始的邏輯保持不變，但使用 destinationId)
    const reactionData = option.reaction;

    if (Array.isArray(reactionData)) {
        // 是多步驟反應：啟動反應播放流程
        playReactions(reactionData, destinationId); // 使用判定後的 destinationId
    } else {
        // 是單一步驟反應：直接播放字串
        nameTag.innerText = "林建成";

        // 移除可能存在的舊提示文字
        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        // 🌟 新增：替換名字 [MODIFIED]
        const reactionText = processTextForName(reactionData);

        typeWriterEffect(textContent, reactionText, () => {
            // 字串反應播放完畢後，進入下一場景/結局
            handleReactionEnd(destinationId); // 使用判定後的 destinationId
        });
    }
}



function showEnding(endingId = 'ending_check') {
    // 確保停止打字和移除所有監聽器
    isTypingActive = false;
    clearTimeout(typingTimeout);

    // 移除所有 nextStep/skipTyping/handleReactionEnd 監聽器
    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.removeEventListener('click', skipTyping);

    dialogueBox.style.display = 'none';
    optionsContainer.innerHTML = '';
    endScreen.style.display = 'flex';

    // --- 結局邏輯 ---
    if (endingId === 'special_ending_check_塔批') {
        endTitle.innerText = "Special End: 塔批的末路";
        endTitle.style.color = "#FFD700"; // 金色
        endDesc.innerText = '他迷上了神魔之塔，他的excel現在只有滿滿的卡片，再也沒有空餘的地方裝下你了。\n最終好感度：-20130128';
        characterImg.style.filter = "drop-shadow(0 0 20px #FFD700)";
    }
    else if (endingId === 'special_ending_check_TOSS') {
        endTitle.innerText = "Special End: 幫會的崛起";
        endTitle.style.color = "#FFD700"; // 金色
        endDesc.innerText = '你們決定回到神魔之塔，在神劍闖江湖的合作中開啟了新的時代\n最終好感度：'+loveScore;
        characterImg.style.filter = "drop-shadow(0 0 20px #FFD700)";
    }

    else if (endingId === 'ending_check_TOS') {
        endTitle.innerText = "Special True End: 轉出與建成的愛情";
        endTitle.style.color = "#0000ffff"; // 金色
        endDesc.innerText = '後來你們開了一個叫做建成幫的幫派，神魔之塔只是起點，接下來你們的試算表將遍佈全部遊戲。\n最終好感度：' + loveScore;
        characterImg.style.filter = "drop-shadow(0 0 20px #FFD700)";
    }

    else if (endingId === 'ending_true_vba') {
        endTitle.innerText = "True End: 永恆的巨集 (VBA)";
        endTitle.style.color = "#ff7979";
        endDesc.innerText = `你們的愛是全自動、無需人工干預的巨集。\n最終好感度：${loveScore}`;
        characterImg.style.filter = "drop-shadow(0 0 20px #ff7979)";
    }
    else if (loveScore >= 70) {
        endTitle.innerText = "Normal End: 同事以上";
        endTitle.style.color = "#0984e3";
        endDesc.innerText = `你們成為了 Excel 交流會的好夥伴。\n最終好感度：${loveScore}`;
        characterImg.style.filter = "none";
    } else {
        endTitle.innerText = "Bad End: #REF!";
        endTitle.style.color = "#636e72";
        endDesc.innerText = `建成覺得跟你沒有共同語言（Excel 語言）。\n他拒絕了你的存檔請求。\n最終好感度：${loveScore}`;
        characterImg.style.filter = "grayscale(100%)";
    }
}

function restartGame() {
    // 1. 重置角色立繪的視覺特效
    characterImg.style.filter = "none";

    // 2. 隱藏所有遊戲中的元素
    dialogueBox.style.display = 'none';
    optionsContainer.innerHTML = '';
    uploadedImgDisplay.style.display = 'none';
    endScreen.style.display = 'none';

    // 移除提示文字
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    // 重置檔案上傳欄位
    resetFileInput();

    // 3. 顯示開始畫面
    startScreen.style.display = 'flex';

    // 確保遊戲容器沒有翻轉狀態
    if (gameContainer) {
        gameContainer.classList.remove('flip-out');
    }
};


/**
 * 將遊戲狀態儲存到 LocalStorage
 */
function saveGame() {
    try {
        const gameState = getGameState();
        const jsonState = JSON.stringify(gameState);
        localStorage.setItem(SAVE_KEY, jsonState);
        alert("✅ 遊戲已存檔！");
        console.log("遊戲狀態已儲存:", gameState);
    } catch (e) {
        console.error("存檔失敗:", e);
        alert("❌ 存檔失敗，請檢查瀏覽器設定。");
    }
}

/**
 * 從 LocalStorage 載入遊戲狀態
 */
function loadGame() {
    const savedState = localStorage.getItem(SAVE_KEY);
    
    if (!savedState) {
        alert("❌ 找不到存檔！");
        return false;
    }
    
    try {
        const loadedState = JSON.parse(savedState);
        
        // 1. 載入基本狀態變數
        loveScore = loadedState.loveScore || 0;
        currentSceneId = loadedState.currentSceneId || 'scene_start';
        currentStepIndex = loadedState.currentStepIndex || 0;
        playerName = loadedState.playerName || "你";

        // 2. 載入 Set 類型的變數 (從 Array 轉回 Set)
        playedChapters = new Set(loadedState.playedChapters || []);
        visitedScenes = new Set(loadedState.visitedScenes || []);
        
        // 3. 更新畫面元素
        updateScore();
        startScreen.style.display = 'none';
        endScreen.style.display = 'none';
        dialogueBox.style.display = 'block';

        // 4. 開始載入場景
        // 確保先移除舊的監聽器
        dialogueBox.removeEventListener('click', nextStep);

        // **最終簡化：直接從存檔點重新開始**
        // 為了避免複雜的步驟同步問題，我們讓遊戲從存檔場景的第一步 (currentStepIndex = 0) 重新開始。
        // 移除上面所有關於手動設置 currentStepIndex 的複雜邏輯。
        // 僅保留以下載入邏輯：
        
        _loadSceneContent(currentSceneId); // 載入存檔場景，從步驟 0 開始
        
        alert("✅ 遊戲已讀檔！將從該場景的開頭重新開始。");
        return true;
        
    } catch (e) {
        console.error("讀檔失敗:", e);
        alert("❌ 讀檔失敗，存檔資料格式錯誤。");
        return false;
    }
}


// ----------------------------------------------------
// 【✨ DOM 載入後初始化區塊】 (約 497 行)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. 獲取所有 DOM 元素
    uploadedImgDisplay = document.getElementById('char-img-display');
    characterImg = document.getElementById('character-img');
    clearImgButton = document.getElementById('clear-img-button');
    dialogueBox = document.getElementById('dialogue-box');
    textContent = document.getElementById('text-content');
    nameTag = document.getElementById('name-tag');
    optionsContainer = document.getElementById('options-container');
    scoreDisplay = document.getElementById('score');
    startScreen = document.getElementById('start-screen');
    endScreen = document.getElementById('end-screen');
    endTitle = document.getElementById('end-title');
    endDesc = document.getElementById('end-desc');
    fileInput = document.getElementById('char-upload');

    menuToggleButton = document.getElementById('menu-toggle-btn');
    menuContent = document.getElementById('game-menu-content');

    // 🌟 獲取名字輸入相關元素 [NEW]
    playerNameInput = document.getElementById('player-name-input'); // <-- 修正：確保在這裡獲取
    startGameButton = document.getElementById('start-game-btn'); // <-- 修正：確保在這裡獲取

    // 🌟 獲取遊戲容器 (用於翻轉)
    gameContainer = document.getElementById('game-container');
    
    // 🌟 NEW: 獲取模態視窗相關元素 (約 519 行)
    announcementModal = document.getElementById('myModal');
    announcementOpenBtn = document.getElementById('open-announcement-btn');
    // 注意：這裡使用 querySelector 是因為 close-btn 屬於 modal 內容
    announcementCloseBtn = announcementModal ? announcementModal.querySelector('.close-btn') : null;


    // 2. 綁定所有初始事件監聽器
    fileInput.addEventListener('change', handleFileUpload);
    clearImgButton.addEventListener('click', function () {
        uploadedImgDisplay.src = defaultImageSrc;
        resetFileInput();
        uploadedImgDisplay.style.display = 'none';
    });
    dialogueBox.addEventListener('click', skipTyping);

    // 🌟 新增：綁定菜單切換事件
    menuToggleButton.addEventListener('click', toggleMenu);

    // 🌟 修正：確保遊戲開始按鈕事件綁定在 DOMContentLoaded 後
    if (startGameButton) {
        startGameButton.addEventListener('click', loadAndStartGame);
    }
    
    // ----------------------------------------------------
    // 【✨ 公告模態視窗事件綁定 ✨】 (約 544 行)
    // ----------------------------------------------------
    if (announcementModal && announcementOpenBtn && announcementCloseBtn) {
        // 1. 開啟模態視窗
        announcementOpenBtn.addEventListener('click', function() {
            announcementModal.style.display = "block";
        });

        // 2. 關閉模態視窗 (點擊 X)
        announcementCloseBtn.addEventListener('click', function() {
            announcementModal.style.display = "none";
        });

        // 3. 關閉模態視窗 (點擊視窗外部)
        window.addEventListener('click', function(event) {
            if (event.target === announcementModal) {
                announcementModal.style.display = "none";
            }
        });
    }
    // ----------------------------------------------------
});

// ----------------------------------------------------
// 【✨ 菜單切換功能 ✨】
// ----------------------------------------------------

function toggleMenu() {
    // 檢查當前的 display 狀態，並切換它
    if (menuContent.style.display === 'flex' || menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
    } else {
        // 為了讓內容垂直排列，我們可以使用 'flex' 或 'block'
        menuContent.style.display = 'block';
    }
}

// ----------------------------------------------------
// 【✨ 章節標題顯示功能 ✨】
// ----------------------------------------------------
/**
 * 創建並顯示一個短暫的章節標題覆蓋層
 * @param {string} title - 要顯示的章節標題
 */
function displayChapterTitle(title,onComplete = () => {}) {
    if (!gameContainer) return; // 確保遊戲容器存在

    const existingChapter = document.getElementById('chapter-title-overlay');
    if (existingChapter) existingChapter.remove(); // 確保不會重複疊加

    const overlay = document.createElement('div');
    overlay.id = 'chapter-title-overlay';
    
    // ⚠️ 注意：這裡使用內聯樣式演示，為了覆蓋整個遊戲畫面，需要設置樣式。
    // 建議將這些樣式移至 styles.css 以便管理。
    
    overlay.innerText = title;

    gameContainer.appendChild(overlay);

    // 1. 淡入 (Fade In)
    setTimeout(() => {
        overlay.style.opacity = 1;
    }, 100);

    // 2. 顯示 2.5 秒
    setTimeout(() => {
        // 3. 淡出 (Fade Out)
        overlay.style.opacity = 0;
        
        // 4. 動畫結束後移除元素
        setTimeout(() => {
            overlay.remove();
            onComplete();
        }, 500); // 配合 CSS transition time
    }, 2500);
}

// ----------------------------------------------------
// 【✨ 關鍵公開：讓 HTML 的 onclick 可以呼叫 ✨】
// ----------------------------------------------------
window.startGame = startGame;
window.restartGame = restartGame;
window.saveGame = saveGame; // 🌟 新增
window.loadGame = loadGame; // 🌟 新增