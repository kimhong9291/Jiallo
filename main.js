// 遊戲狀態
let loveScore = 0;
let currentSceneId = 'scene_start';
let currentStepIndex = 0;
let visitedScenes = new Set();
const MAX_LOVE_SCORE = 150;
let playerName = "";


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

// 🌟 遊戲容器
let gameContainer;

// 🌟 新增：門動畫 DOM 元素
let doorTransition;

let script = [];



/**
 * 載入本地劇本檔案並啟動遊戲
 * 假設劇本檔案位於 /data/script_main.json 和 /data/script_tos.json
 */
async function loadAndStartGame() {
    // 🌟 核心：確認使用了正確的相對路徑 🌟
    const SCRIPT_PATH_MAIN = './script_main.json';
    const SCRIPT_PATH_TOS = './script_tos.json';

    try {
        const [mainResponse, tosResponse] = await Promise.all([
            fetch(SCRIPT_PATH_MAIN),
            fetch(SCRIPT_PATH_TOS),
        ]);

        if (!mainResponse.ok) {
            // 這會捕獲 404 錯誤，並拋出您看到的訊息
            throw new Error(`主劇本載入失敗 (${mainResponse.status}): ${SCRIPT_PATH_MAIN}`);
        }

        // 獨立解析 JSON 資料
        const mainData = await mainResponse.json();
        const tosData = await tosResponse.json();

        // 合併所有劇本 
        // 確保 mainData 和 tosData 都是陣列
        if (!Array.isArray(mainData) || !Array.isArray(tosData)) {
            throw new Error("劇本檔案格式錯誤，預期為 JSON 陣列。");
        }
        script = [...mainData, ...tosData];

        // 開始遊戲
        startGame(script);

    } catch (error) {
        console.error("無法載入遊戲劇本！", error);
        // 提示用戶檢查文件路徑和伺服器（如果本地測試需要伺服器，如 Live Server）
        alert(`遊戲載入失敗。請確認劇本檔案存在且路徑正確：${error.message}`);
    }
}


// ... (所有其他函式如 handleFileUpload, typeWriterEffect, nextStep 等保持不變) ...

// ----------------------------------------------------
// 文件上傳及清空核心邏輯 (保持不變)
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
// 逐字播放核心邏輯 (保持不變)
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
// 遊戲流程控制 (保持不變)
// ----------------------------------------------------

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

        if (step.img) {
            characterImg.src = step.img;
        }

        dialogueBox.removeEventListener('click', nextStep);

        nameTag.innerText = step.name;

        let textSource = step.text;
        if (step.name === '你') {
            nameTag.innerText = playerName;
        }
        const textToDisplay = processTextForName(textSource);

        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        typeWriterEffect(textContent, textToDisplay, () => {
            currentStepIndex++;
            if (currentStepIndex === scene.steps.length) {
                displayOptions(scene.options);
            } else {
                dialogueBox.addEventListener('click', nextStep, { once: true });

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

function playReactions(reactions, nextSceneId) {
    let reactionIndex = 0;

    function showNextReaction() {
        if (reactionIndex < reactions.length) {
            const step = reactions[reactionIndex];

            if (step.img) {
                characterImg.src = step.img;
            }

            nameTag.innerText = step.name;

            const oldTip = document.getElementById('next-step-tip');
            if (oldTip) oldTip.remove();

            const textToDisplay = processTextForName(step.text);

            typeWriterEffect(textContent, textToDisplay, () => {
                reactionIndex++;

                if (reactionIndex < reactions.length) {
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
                    handleReactionEnd(nextSceneId);
                }
            });

        } else {
            handleReactionEnd(nextSceneId);
        }
    }
    showNextReaction();
}

function handleReactionEnd(nextSceneId) {
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

    const tip = document.createElement('div');
    tip.id = 'next-step-tip';
    tip.style.fontSize = "12px";
    tip.style.color = "#ccc";
    tip.style.textAlign = "right";
    tip.innerText = isEnding ? "▼ 點擊查看結局" : "▼ 點擊進入下一場景";
    textContent.appendChild(tip);
}

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

function _loadSceneContent(id) {
    optionsContainer.innerHTML = '';
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    currentSceneId = id;
    currentStepIndex = 0;

    visitedScenes.add(id);

    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.addEventListener('click', nextStep);

    nextStep();
}

// ----------------------------------------------------
// 【✨ 新增：關門動畫核心邏輯 ✨】
// ----------------------------------------------------

function runDoorTransition(sceneId) {
    if (!doorTransition) {
        console.warn("Door transition element not found. Skipping door animation.");
        _loadSceneContent(sceneId);
        return;
    }

    const DOOR_TRANSITION_TIME = 1000; // 1.0秒 (與 CSS 保持一致)

    // 1. 關門動畫開始
    doorTransition.style.visibility = 'visible';
    doorTransition.style.pointerEvents = 'auto';
    doorTransition.classList.add('closing');

    // 2. 等待門關閉 (一半的時間，確保畫面被完全遮擋)
    setTimeout(() => {
        // A. 載入場景內容
        textContent.innerText = '';
        nameTag.innerText = '';
        optionsContainer.innerHTML = '';
        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        _loadSceneContent(sceneId);


        // B. 延遲後開門
        setTimeout(() => {
            // 3. 開門動畫開始
            doorTransition.classList.remove('closing');

            // 4. 等待門完全打開後，隱藏容器
            setTimeout(() => {
                doorTransition.style.visibility = 'hidden';
                doorTransition.style.pointerEvents = 'none';
            }, DOOR_TRANSITION_TIME + 50);

        }, 100);

    }, DOOR_TRANSITION_TIME);
}

// ----------------------------------------------------
// 【✨ 替換：遊戲流程控制 - showScene (移除 3D) ✨】
// ----------------------------------------------------

function showScene(id) {
    const scene = script.find(s => s.id === id);
    if (!scene) {
        console.error(`找不到場景 ID: ${id}`);
        return;
    }

    dialogueBox.removeEventListener('click', nextStep);

    // 1. 檢查是否有 Chapter Page 需要顯示
    if (scene.chapter) {
        // A. 顯示 Chapter 標題 (黑幕)
        displayChapterTitle(scene.chapter); // Chapter 顯示時間約 3.1 秒

        // B. 等待 Chapter Title 結束 (大約 3.1 秒)
        setTimeout(() => {
            // C. 啟動關門轉場動畫，並載入下一場景內容
            runDoorTransition(id);

        }, 3100);

    } else {
        // 【流程 B：直接關門 -> Scene】
        runDoorTransition(id);
    }
}


// ----------------------------------------------------
// 【✨ 替換：遊戲流程控制 - startGame (新的開場流程) ✨】
// ----------------------------------------------------

function startGame() {

    // 1. 處理玩家名字輸入
    if (!playerNameInput) {
        playerNameInput = document.getElementById('player-name-input');
    }

    let inputName = playerNameInput ? playerNameInput.value.trim() : "";
    if (inputName) {
        playerName = inputName;
    } else {
        playerName = "你";
    }

    // 2. 重置遊戲狀態 
    loveScore = 0;
    currentSceneId = 'scene_start';
    currentStepIndex = 0;
    visitedScenes.clear();
    updateScore();
    endScreen.style.display = 'none';

    // 舊的 3D 翻轉邏輯已移除
    if (gameContainer) {
        gameContainer.classList.remove('flip-out');
    }

    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.addEventListener('click', nextStep);

    // BGM 播放邏輯 
    const audio = document.getElementById('bgm');
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(e => console.log("需使用者互動才能播放音樂或被阻止。"));
    }

    // 🌟 【Start Screen 淡出 $\to$ Chapter Title $\to$ 關門 $\to$ Scene】 🌟

    // 1. 讓開始畫面進入淡出動畫狀態 
    startScreen.classList.add('animate-intro');

    // 假設開場淡出動畫持續 0.5 秒 (請根據您的 CSS 調整)
    const INTRO_FADE_DURATION = 500;

    setTimeout(() => {
        // 動畫結束後：
        startScreen.style.display = 'none';
        dialogueBox.style.display = 'block';

        startScreen.classList.remove('animate-intro'); // 清除 class

        // 2. 啟動場景載入 (這會走入 showScene 函式，並啟動 Chapter Title)
        showScene('scene_start');

    }, INTRO_FADE_DURATION);
}


function processTextForName(text) {
    if (playerName && text.includes('【玩家名字】')) {
        return text.replace(/【玩家名字】/g, playerName);
    }
    return text;
}

function getNextScene(next) {
    if (next === '29') {
        if (loveScore >= 131 && visitedScenes.has('神魔之塔2') && !visitedScenes.has('神魔之塔3')) {
            return '29_A';
        }
        else if (loveScore >= 131 && visitedScenes.has('神魔之塔4') && (playerName == "白銀" || playerName == "白银")) {
            return '29_Silver';
        }
        else { return '29'; }

        return next;
    }
    return next;
};

function updateScore() {
    scoreDisplay.innerText = loveScore;
}

function handleChoice(option) {
    loveScore = Math.min(loveScore + option.score, MAX_LOVE_SCORE);;
    updateScore();
    optionsContainer.innerHTML = '';

    let destinationId = option.next;
    destinationId = getNextScene(destinationId);

    const reactionData = option.reaction;

    if (Array.isArray(reactionData)) {
        playReactions(reactionData, destinationId);
    } else {
        nameTag.innerText = "林建成";

        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        const reactionText = processTextForName(reactionData);

        typeWriterEffect(textContent, reactionText, () => {
            handleReactionEnd(destinationId);
        });
    }
}


function showEnding(endingId = 'ending_check') {
    isTypingActive = false;
    clearTimeout(typingTimeout);

    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.removeEventListener('click', skipTyping);

    dialogueBox.style.display = 'none';
    optionsContainer.innerHTML = '';
    endScreen.style.display = 'flex';

    if (endingId === 'special_ending_check_塔批') {
        endTitle.innerText = "Special End: 塔批的末路";
        endTitle.style.color = "#FFD700";
        endDesc.innerText = '他迷上了神魔之塔，他的excel現在只有滿滿的卡片，再也沒有空餘的地方裝下你了。\n最終好感度：-20130128';
        characterImg.style.filter = "drop-shadow(0 0 20px #FFD700)";
    }
    else if (endingId === 'special_ending_check_TOSS') {
        endTitle.innerText = "Special End: 幫會的崛起";
        endTitle.style.color = "#FFD700";
        endDesc.innerText = '你們決定回到神魔之塔，在神劍闖江湖的合作中開啟了新的時代\n最終好感度：' + loveScore;
        characterImg.style.filter = "drop-shadow(0 0 20px #FFD700)";
    }

    else if (endingId === 'ending_check_TOS') {
        endTitle.innerText = "Special True End: 轉出與建成的愛情";
        endTitle.style.color = "#0000ffff";
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
    characterImg.style.filter = "none";

    dialogueBox.style.display = 'none';
    optionsContainer.innerHTML = '';
    uploadedImgDisplay.style.display = 'none';
    endScreen.style.display = 'none';

    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    resetFileInput();

    startScreen.style.display = 'flex';

    if (gameContainer) {
        gameContainer.classList.remove('flip-out');
    }
};


// ----------------------------------------------------
// 【✨ DOM 載入後初始化區塊】
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

    playerNameInput = document.getElementById('player-name-input');
    startGameButton = document.getElementById('start-game-btn');

    gameContainer = document.getElementById('game-container');

    // 🌟 新增：獲取門動畫的 DOM 元素
    doorTransition = document.getElementById('door-transition');


    // 2. 綁定所有初始事件監聽器
    fileInput.addEventListener('change', handleFileUpload);
    clearImgButton.addEventListener('click', function () {
        uploadedImgDisplay.src = defaultImageSrc;
        resetFileInput();
        uploadedImgDisplay.style.display = 'none';
    });
    dialogueBox.addEventListener('click', skipTyping);

    menuToggleButton.addEventListener('click', toggleMenu);

    if (startGameButton) {
        startGameButton.addEventListener('click', loadAndStartGame);
    }
});

// ----------------------------------------------------
// 【✨ 菜單切換功能 ✨】
// ----------------------------------------------------

function toggleMenu() {
    if (menuContent.style.display === 'flex' || menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
    } else {
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
function displayChapterTitle(title) {
    if (!gameContainer) return;

    const overlay = document.getElementById('chapter-title-overlay');
    if (!overlay) return;

    // 確保顯示
    overlay.style.display = 'flex';
    overlay.innerText = title;

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
            overlay.style.display = 'none';
        }, 500); // 配合 CSS transition time
    }, 2500);
}

// ----------------------------------------------------
// 【✨ 關鍵公開：讓 HTML 的 onclick 可以呼叫 ✨】
// ----------------------------------------------------
window.startGame = startGame;
window.restartGame = restartGame;