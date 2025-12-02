// ----------------------------------------------------
// 【I. 遊戲狀態與常量】
// ----------------------------------------------------

let loveScore = 0;
let currentSceneId = 'scene_start'; // 初始場景ID
let currentStepIndex = 0;           // 場景內對話步驟索引
let visitedScenes = new Set();      // 用於追蹤已播放過開場標題的場景
let isTyping = false;               // 避免在打字時觸發下一步
let isSceneActive = false;          // 避免選項點擊被誤認為下一步
const MAX_LOVE_SCORE = 150;
let playerName = "你";              // 預設玩家名字

// DOM 元素 (預先聲明，在 DOMContentLoaded 內賦值)
let uploadedImgDisplay;
let characterImg;
let clearImgButton;
const defaultImageSrc = 'https://via.placeholder.com/300x500/cccccc/000000?text=Please+Upload+Jiancheng';
let dialogueBox;
let textContent;
let nameTag;
let optionsContainer;
let scoreDisplay;
let startScreen;
let gameContainer;
let menuToggleButton;
let menuContent;
let playerNameInput;
let startGameButton;
let doorTransition;
let chapterTitleOverlay;
let bgmElement;

// 🌟 主劇本陣列，將在 loadScriptsAndInit 中合併
let script = [];
let scriptMap = new Map(); // 用於快速查找場景

// ----------------------------------------------------
// 【II. 初始化與腳本載入】
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', initGame);

/**
 * 遊戲初始化：DOM 元素緩存、事件監聽器設定、載入腳本
 */
function initGame() {
    // 1. DOM 元素緩存
    uploadedImgDisplay = document.getElementById('char-img-display');
    characterImg = document.getElementById('character-img');
    clearImgButton = document.getElementById('clear-img-button');
    dialogueBox = document.getElementById('dialogue-box');
    textContent = document.getElementById('text-content');
    nameTag = document.getElementById('name-tag');
    optionsContainer = document.getElementById('options-container');
    scoreDisplay = document.getElementById('score');
    startScreen = document.getElementById('start-screen');
    gameContainer = document.getElementById('game-container');
    menuToggleButton = document.getElementById('menu-toggle-btn');
    menuContent = document.getElementById('game-menu-content');
    playerNameInput = document.getElementById('player-name-input');
    startGameButton = document.getElementById('start-game-btn');
    doorTransition = document.getElementById('door-transition');
    chapterTitleOverlay = document.getElementById('chapter-title-overlay');
    fileInput = document.getElementById('char-upload');
    bgmElement = document.getElementById('bgm');
    
    // 2. 設定事件監聽器
    startGameButton.addEventListener('click', startGame);
    menuToggleButton.addEventListener('click', toggleMenu);
    clearImgButton.addEventListener('click', clearImage);
    fileInput.addEventListener('change', handleImageUpload);
    
    // 點擊對話框推進劇情 (選項出現時會被 disable)
    dialogueBox.addEventListener('click', nextStep);

    // 3. 載入腳本並準備遊戲
    loadScriptsAndInit();
    
    // 4. 嘗試載入存檔 (如果沒有則保持初始狀態)
    loadGame();
}

/**
 * 載入並整合劇本檔案
 * 假設 script_main.js 和 script_tos.js 已作為全局變數載入
 */
function loadScriptsAndInit() {
    // 檢查全域變數是否存在
    if (typeof main_script_chap1 === 'undefined' || typeof script_tosLine === 'undefined') {
        console.error("錯誤：劇本檔案 (script_main.js 或 script_tos.js) 未被正確載入。");
        textContent.innerText = "錯誤：劇本載入失敗。請確認腳本文件已正確載入。";
        return;
    }

    // 合併所有腳本
    script = [...main_script_chap1, ...script_tosLine];

    // 建立場景 ID 到場景數據的映射，方便快速查找
    script.forEach(scene => {
        scriptMap.set(scene.id, scene);
    });

    console.log(`劇本載入完成。共 ${script.length} 個場景。`);
}

// ----------------------------------------------------
// 【III. 遊戲流程控制】
// ----------------------------------------------------

/**
 * 啟動遊戲
 */
function startGame() {
    if (isTyping) return;
    
    // 1. 獲取玩家名稱
    const inputName = playerNameInput.value.trim();
    playerName = inputName === "" ? "你" : inputName;

    // 2. 播放門動畫
    doorTransition.style.display = 'flex';
    setTimeout(() => {
        startScreen.style.display = 'none'; // 隱藏開始畫面
    }, 10); // 給予動畫時間

    // 3. 開始播放 BGM
    if (bgmElement) {
        bgmElement.volume = 0.5;
        bgmElement.play().catch(e => console.error("BGM播放失敗:", e));
    }

    // 4. 延遲開始場景，等待動畫結束
    setTimeout(() => {
        doorTransition.classList.add('animate-close');
    }, 10);

    setTimeout(() => {
        doorTransition.classList.remove('animate-close');
        doorTransition.style.display = 'none';
        
        gameContainer.style.opacity = 1;
        playScene(currentSceneId); // 開始第一個場景
        saveGame();
    }, 1200); // 動畫時間約 1.2 秒
}

/**
 * 播放特定 ID 的場景
 * @param {string} sceneId - 場景的唯一 ID
 */
function playScene(sceneId) {
    const scene = scriptMap.get(sceneId);
    if (!scene) {
        showEnding("ERROR_NOT_FOUND", `場景ID [${sceneId}] 不存在！`, loveScore);
        return;
    }

    // 重置狀態
    currentSceneId = sceneId;
    currentStepIndex = 0;
    optionsContainer.innerHTML = '';
    isSceneActive = true;

    // 顯示章節標題 (如果存在且尚未播放過)
    if (scene.chapter && !visitedScenes.has(sceneId)) {
        displayChapterTitle(scene.chapter);
        visitedScenes.add(sceneId);
        // 等待章節標題淡出後再開始對話
        setTimeout(() => {
            processStep(scene.steps[currentStepIndex]);
        }, 3500); // 配合 displayChapterTitle 內動畫時間
    } else {
        processStep(scene.steps[currentStepIndex]);
    }
}

/**
 * 處理並顯示當前的對話步驟
 * @param {object} step - 當前的對話步驟數據
 */
function processStep(step) {
    if (!step) return;

    // 替換名字
    let speakerName = step.name === "旁白" ? step.name : step.name.replace("你", playerName);
    let dialogueText = step.text.replace(/\[你的名字\]/g, playerName);

    nameTag.innerText = speakerName;
    typeText(dialogueText);
}

/**
 * 推進到下一個對話步驟
 */
function nextStep() {
    if (!isSceneActive) return; // 避免在等待打字時被點擊
    if (isTyping) {
        // 如果正在打字，則跳過打字動畫
        textContent.innerText = textContent.dataset.fullText;
        isTyping = false;
        return;
    }

    const scene = scriptMap.get(currentSceneId);
    if (!scene) return;

    currentStepIndex++;

    if (currentStepIndex < scene.steps.length) {
        // 還有對話步驟
        processStep(scene.steps[currentStepIndex]);
    } else {
        // 對話結束，顯示選項或檢查結局
        isSceneActive = false;
        
        if (scene.options) {
            displayOptions(scene.options);
        } else if (scene.next) {
            // 如果沒有選項，直接跳轉
            handleOptionClick(scene.next, 0);
        } else {
            // 該場景沒有後續，檢查結局
            checkEndings();
        }
        saveGame();
    }
}

// ----------------------------------------------------
// 【IV. 交互與文本顯示】
// ----------------------------------------------------

/**
 * 顯示所有可選的選項按鈕
 * @param {Array<object>} options - 選項陣列
 */
function displayOptions(options) {
    optionsContainer.innerHTML = '';
    optionsContainer.style.display = 'flex';
    
    // 點擊對話框不再推進劇情，直到選擇選項
    dialogueBox.removeEventListener('click', nextStep);

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerText = option.text;
        
        button.addEventListener('click', () => {
            // 重新啟用點擊對話框推進劇情
            dialogueBox.addEventListener('click', nextStep);
            
            // 處理選項邏輯
            optionsContainer.style.display = 'none';
            handleOptionClick(option.next, option.score, option.reaction);
        });
        optionsContainer.appendChild(button);
    });
}

/**
 * 處理選項點擊後的邏輯
 * @param {string} nextSceneId - 下一個場景 ID
 * @param {number} scoreChange - 好感度變化值
 * @param {string|Array<object>} reaction - 點擊後的反應對話
 */
function handleOptionClick(nextSceneId, scoreChange, reaction) {
    updateLoveScore(scoreChange);
    
    // 如果有反應對話 (reaction)，則先播放 reaction
    if (reaction) {
        const reactionSteps = Array.isArray(reaction) 
            ? reaction 
            : [{ name: "旁白", text: reaction }];

        // 構造一個臨時場景來播放 reaction
        const tempSceneId = `reaction_${Date.now()}`;
        const tempScene = {
            id: tempSceneId,
            steps: reactionSteps,
            next: nextSceneId // reaction 播完後再跳轉到目標場景
        };
        scriptMap.set(tempSceneId, tempScene);
        playScene(tempSceneId);
        
    } else {
        // 沒有 reaction，直接跳轉
        if (nextSceneId.startsWith('ending_check')) {
            checkEndings(nextSceneId);
        } else {
            playScene(nextSceneId);
        }
    }
}

/**
 * 打字機效果
 * @param {string} fullText - 完整的文本內容
 */
function typeText(fullText) {
    isTyping = true;
    textContent.innerText = ''; // 清空文本
    textContent.dataset.fullText = fullText; // 儲存完整文本
    
    let charIndex = 0;
    const typingSpeed = 50; // 每個字符的延遲 (毫秒)

    function typeChar() {
        if (!isTyping) return; // 如果被 nextStep 提前跳過，則停止

        if (charIndex < fullText.length) {
            textContent.innerText += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            isTyping = false;
            isSceneActive = true; // 打字結束後允許點擊推進
        }
    }

    typeChar();
}

/**
 * 創建並顯示一個短暫的章節標題覆蓋層
 * @param {string} title - 要顯示的章節標題
 */
function displayChapterTitle(title) {
    if (!gameContainer || !chapterTitleOverlay) return;

    chapterTitleOverlay.style.display = 'flex';
    chapterTitleOverlay.innerText = title;
    
    // 1. 淡入 (Fade In)
    setTimeout(() => {
        chapterTitleOverlay.style.opacity = 1;
    }, 10);

    // 2. 顯示 3 秒
    setTimeout(() => {
        // 3. 淡出 (Fade Out)
        chapterTitleOverlay.style.opacity = 0;

        // 4. 動畫結束後移除元素
        setTimeout(() => {
            chapterTitleOverlay.style.display = 'none';
        }, 500); // 配合 CSS transition duration
    }, 3000);
}


// ----------------------------------------------------
// 【V. 好感度與結局】
// ----------------------------------------------------

/**
 * 更新好感度並更新顯示
 * @param {number} change - 好感度的變化值
 */
function updateLoveScore(change) {
    loveScore += change;
    // 限制分數在 0 到 MAX_LOVE_SCORE 之間
    loveScore = Math.max(0, Math.min(MAX_LOVE_SCORE, loveScore));
    scoreDisplay.innerText = loveScore;
    
    // 根據分數調整 UI 顏色
    const percentage = loveScore / MAX_LOVE_SCORE;
    scoreDisplay.style.color = `hsl(0, 100%, ${60 - (percentage * 20)}%)`;
    scoreDisplay.parentElement.style.textShadow = `0 0 10px rgba(255, 0, 0, ${percentage * 0.8})`;

    saveGame();
}

/**
 * 檢查並顯示結局
 */
function checkEndings(endingType) {
    let title, description;

    if (endingType === 'ending_check_NORMAL') {
        if (loveScore >= 120) {
            title = "🎉 完美結局：VBA之戀 (愛意滿滿)";
            description = `你的好感度高達 ${loveScore}！林建成承認他對你的感情，並表示希望你們在職場與生活中都能成為彼此的 XLOOKUP，永遠不會找不到對方。`;
        } else if (loveScore >= 50) {
            title = "😊 一般結局：Power BI 之交 (友好關係)";
            description = `你的好感度為 ${loveScore}。林建成將你視為他最好的工作夥伴，並推薦你使用 Power BI 簡化報表。你們的關係停留在專業的友誼。`;
        } else {
            title = "💔 悲慘結局：#REF! 錯誤 (關係破裂)";
            description = `你的好感度只有 ${loveScore}。由於你的 Excel 格式過於混亂，林建成無法忍受，最終選擇了離職。你在他的離職單上看到了一個大大的 #REF! 錯誤。`;
        }
    } else if (endingType === 'ending_check_TOSS') {
        if (loveScore >= 100) {
            title = "🎮 隱藏結局：神魔之塔之戀 (共同登頂)";
            description = `你和林建成因為共同迷戀神魔之塔而結緣，好感度 ${loveScore}。你們在遊戲中成了最強的拍檔，在現實中也從 Excel 轉為了戀人。你們的偉業鑄造了神魔之塔的一段傳說。`;
        } else {
            title = "📉 壞結局：Excel 還是遊戲？ (失去焦點)";
            description = `你和林建成雖然一起玩遊戲，但你們的工作效率直線下降，好感度 ${loveScore}。你們最終都被主管約談，建成意識到遊戲並不能當飯吃，兩人的關係也隨之淡去。`;
        }
    } else {
        // 如果是沒有指定類型的結局檢查
        title = "🚧 遊戲結束 (未定義結局)";
        description = `好感度: ${loveScore}。故事未完待續，或是發生了未知錯誤！`;
    }

    showEnding(title, description);
}

/**
 * 顯示結局畫面
 * @param {string} title - 結局標題
 * @param {string} description - 結局描述
 */
function showEnding(title, description) {
    // 禁用所有遊戲交互
    isSceneActive = false;
    dialogueBox.removeEventListener('click', nextStep);
    optionsContainer.innerHTML = '';

    // 創建結局畫面 DOM
    let endScreen = document.getElementById('end-screen');
    if (!endScreen) {
        endScreen = document.createElement('div');
        endScreen.id = 'end-screen';
        endScreen.innerHTML = `
            <h1 id="end-title" class="end-title"></h1>
            <p id="end-desc" class="end-desc"></p>
            <button id="restart-btn" class="end-button">重新開始</button>
        `;
        gameContainer.appendChild(endScreen);
        
        // 結局畫面的樣式 (使用嵌入式樣式，因為這裡沒有 styles.css)
        endScreen.style.cssText = `
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.95); color: white;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: 5vh; z-index: 100; text-align: center;
            animation: fadeIn 1.5s forwards;
        `;
        document.getElementById('restart-btn').style.cssText = `
            margin-top: 3vh; padding: 1.5vh 3vh; font-size: 1.5em;
            background: #ff6b6b; color: white; border: none;
            border-radius: 1vh; cursor: pointer; transition: background 0.2s;
        `;
        document.getElementById('end-title').style.fontSize = '3em';
        document.getElementById('end-desc').style.fontSize = '1.5em';
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            localStorage.removeItem('visualNovelSave'); // 清除存檔
            window.location.reload(); // 重新載入頁面
        });
    }

    // 更新內容並顯示
    document.getElementById('end-title').innerText = title;
    document.getElementById('end-desc').innerText = description;
    endScreen.style.display = 'flex';
}

// ----------------------------------------------------
// 【VI. 存檔與讀檔 (使用 localStorage)】
// ----------------------------------------------------

/**
 * 儲存遊戲進度到 localStorage
 */
function saveGame() {
    const gameState = {
        loveScore,
        currentSceneId,
        currentStepIndex,
        playerName,
        visitedScenes: Array.from(visitedScenes), // Set 轉為 Array 才能儲存
        uploadedImgSrc: uploadedImgDisplay.src
    };
    try {
        localStorage.setItem('visualNovelSave', JSON.stringify(gameState));
        console.log("遊戲已儲存。");
    } catch (e) {
        console.error("儲存遊戲失敗:", e);
    }
}

/**
 * 從 localStorage 載入遊戲進度
 */
function loadGame() {
    try {
        const savedState = localStorage.getItem('visualNovelSave');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            
            // 讀取狀態
            loveScore = gameState.loveScore || 0;
            currentSceneId = gameState.currentSceneId || 'scene_start';
            currentStepIndex = gameState.currentStepIndex || 0;
            playerName = gameState.playerName || "你";
            visitedScenes = new Set(gameState.visitedScenes || []);
            
            // 更新 UI
            updateLoveScore(0); // 僅更新顯示，分數不變
            playerNameInput.value = playerName === "你" ? "" : playerName;
            
            // 處理圖片
            if (gameState.uploadedImgSrc && gameState.uploadedImgSrc !== defaultImageSrc) {
                uploadedImgDisplay.src = gameState.uploadedImgSrc;
                uploadedImgDisplay.style.display = 'block';
                characterImg.style.display = 'none';
            } else {
                uploadedImgDisplay.style.display = 'none';
                characterImg.style.display = 'block';
            }

            // 顯示讀檔提示
            const resumeBtn = document.createElement('button');
            resumeBtn.innerText = "繼續上次的進度";
            resumeBtn.id = "resume-game-btn";
            resumeBtn.className = "start-btn";
            resumeBtn.style.marginTop = '20px';
            
            const startBtn = document.getElementById('start-game-btn');
            startBtn.parentElement.insertBefore(resumeBtn, startBtn.nextSibling);

            resumeBtn.addEventListener('click', () => {
                // 直接跳過開始畫面，進入上次的場景
                startScreen.style.display = 'none';
                gameContainer.style.opacity = 1;
                
                // 播放 BGM
                if (bgmElement) {
                    bgmElement.volume = 0.5;
                    bgmElement.play().catch(e => console.error("BGM播放失敗:", e));
                }
                
                // 繼續播放場景
                const scene = scriptMap.get(currentSceneId);
                if (scene && scene.steps[currentStepIndex]) {
                    // 重新從上一個步驟開始
                    currentStepIndex--; 
                    playScene(currentSceneId); 
                } else {
                    // 如果索引或場景出錯，則從場景開頭開始
                    playScene(currentSceneId);
                }
            });
            
            console.log(`遊戲已載入。上次進度：${currentSceneId}, 步驟 ${currentStepIndex}`);
        }
    } catch (e) {
        console.error("讀取遊戲失敗:", e);
        localStorage.removeItem('visualNovelSave');
    }
}

// ----------------------------------------------------
// 【VII. 菜單與圖片處理】
// ----------------------------------------------------

/**
 * 切換菜單的顯示/隱藏
 */
function toggleMenu() {
    if (menuContent.style.display === 'flex' || menuContent.style.display === 'block') {
        menuContent.style.display = 'none';
    } else {
        menuContent.style.display = 'block';
    }
}

/**
 * 處理角色圖片上傳
 */
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImgDisplay.src = e.target.result;
            uploadedImgDisplay.style.display = 'block';
            characterImg.style.display = 'none'; // 隱藏預設圖片
            saveGame();
        };
        reader.readAsDataURL(file);
    }
}

/**
 * 清除已上傳的角色圖片，恢復預設
 */
function clearImage() {
    uploadedImgDisplay.src = '';
    uploadedImgDisplay.style.display = 'none';
    characterImg.style.display = 'block'; // 顯示預設圖片
    fileInput.value = ''; // 重設文件輸入
    saveGame();
}