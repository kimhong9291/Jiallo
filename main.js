import { script } from './script_data.js';//調用劇本

// 遊戲狀態
let loveScore = 0;
let currentSceneId = 'scene_start';
let currentStepIndex = 0;
// 最佳實踐：使用 Set 來儲存 ID，因為 Set 只允許唯一值，查詢速度更快。
let visitedScenes = new Set(); 

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

        // 處理多步驟反應時，避免重複綁定
        dialogueBox.removeEventListener('click', nextStep);

        nameTag.innerText = step.name;

        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        typeWriterEffect(textContent, step.text, () => {
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

// 新增：處理多步驟反應陣列
function playReactions(reactions, nextSceneId) {
    let reactionIndex = 0;

    function showNextReaction() {
        if (reactionIndex < reactions.length) {
            const step = reactions[reactionIndex];
            nameTag.innerText = step.name;

            // 移除上一次的提示文字
            const oldTip = document.getElementById('next-step-tip');
            if (oldTip) oldTip.remove();

            typeWriterEffect(textContent, step.text, () => {
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


// 輔助函數：處理反應結束後的跳轉邏輯
function handleReactionEnd(nextSceneId) {
    // 移除可能存在的舊提示文字
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    const isEnding = nextSceneId === 'ending_check' || nextSceneId === 'ending_hidden_1' || nextSceneId === 'ending_true_vba' || nextSceneId === 'special_ending_check_塔批';

    const handler = () => {
        dialogueBox.removeEventListener('click', handler);
        if (isEnding) {
            showEnding(nextSceneId);
        } else {
            showScene(nextSceneId);
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


// 輔助函數：顯示選項
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


function startGame() {
    loveScore = 0;
    currentSceneId = 'scene_start';
    currentStepIndex = 0;
    visitedScenes.clear();
    updateScore();
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    dialogueBox.style.display = 'block';

    // 確保 nextStep 監聽器在 startGame 時被添加 (這裡是正確的)
    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.addEventListener('click', nextStep);

    const audio = document.getElementById('bgm');
    if (audio) {
        audio.volume = 0.3;
        audio.play().catch(e => console.log("需使用者互動才能播放音樂或被阻止。"));
    }

    showScene('scene_start');
}

function updateScore() {
    scoreDisplay.innerText = loveScore;
}

function showScene(id) {
    optionsContainer.innerHTML = '';
    const oldTip = document.getElementById('next-step-tip');
    if (oldTip) oldTip.remove();

    currentSceneId = id;
    currentStepIndex = 0;

    // 記錄場景 ID
    visitedScenes.add(id);

    // 確保 nextStep 監聽器在 showScene 時被添加
    dialogueBox.removeEventListener('click', nextStep);
    dialogueBox.addEventListener('click', nextStep);

    nextStep();
}

function handleChoice(option) {
    // 1. 處理分數
    loveScore += option.score;
    updateScore();
    optionsContainer.innerHTML = '';

    // 2. 判斷反應類型
    const reactionData = option.reaction;

    if (Array.isArray(reactionData)) {
        // 是多步驟反應：啟動反應播放流程
        playReactions(reactionData, option.next);
    } else {
        // 是單一步驟反應：直接播放字串
        nameTag.innerText = "林建成"; 

        // 移除可能存在的舊提示文字
        const oldTip = document.getElementById('next-step-tip');
        if (oldTip) oldTip.remove();

        typeWriterEffect(textContent, reactionData, () => {
            // 字串反應播放完畢後，進入下一場景/結局
            handleReactionEnd(option.next);
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
        endDesc.innerText = '他迷上了神魔之塔，他的excel現在只有滿滿的卡片，再也沒有空餘的地方裝下你了。\n最終好感度：' + loveScore;
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
};


// ----------------------------------------------------
// 【✨ 關鍵修正區塊：確保在 DOM 載入後才操作 DOM 元素和綁定初始事件】
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. 在 DOM 載入完成後，獲取所有 DOM 元素
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

    // 2. 綁定所有**初始**事件監聽器 (解決 TypeError)
    fileInput.addEventListener('change', handleFileUpload);
    clearImgButton.addEventListener('click', function () {
        uploadedImgDisplay.src = defaultImageSrc;
        resetFileInput();
        uploadedImgDisplay.style.display = 'none';
    });
    dialogueBox.addEventListener('click', skipTyping);
    
    // 3. 確保音量設置在DOM載入後進行
    const audio = document.getElementById('bgm');
    if (audio) {
        audio.volume = 0.3;
    }
});

// ----------------------------------------------------
// 【✨ 關鍵公開：讓 HTML 的 onclick 可以呼叫 ✨】
// ----------------------------------------------------
window.startGame = startGame;
window.restartGame = restartGame;