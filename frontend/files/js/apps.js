
/**
 * apps.js - Logic for the internal "Apps" modal (Calculator, Calendar, etc.)
 */

var currentApp = null;

function openAppModal(appName) {
    currentApp = appName;
    const modal = document.getElementById('appsModal');
    const title = document.getElementById('appModalTitle');
    const content = document.getElementById('appModalContent');

    const apps = {
        menu: {
            title: 'Apps & Tools',
            render: () => {
                // Fetch Zylo Slayer State
                let slayerState = null;
                try {
                    const saved = localStorage.getItem('zylo_slayer_save');
                    if (saved) slayerState = JSON.parse(saved);
                } catch(e) {}

                const hasSave = !!slayerState;
                const level = hasSave ? slayerState.level : 1;
                const stage = hasSave ? slayerState.stage : 1;
                const xp = hasSave ? slayerState.xp : 0;
                const gold = hasSave ? Math.floor(slayerState.gold) : 0;
                const atk = hasSave && slayerState.stats ? slayerState.stats.atk : 10;
                const nextXp = Math.floor(100 * Math.pow(1.5, level - 1));
                const xpPercent = Math.min(100, (xp / nextXp) * 100).toFixed(1);
                
                // Quest preview
                const questProgress = hasSave && slayerState.quest ? slayerState.quest.progress : 0;
                const questTarget = hasSave && slayerState.quest ? slayerState.quest.target : 50;
                const questName = hasSave && slayerState.quest ? slayerState.quest.name : "Monster Hunter";

                return `
        <div class="flex flex-col gap-4 p-2">
          
          <!-- Zylo Slayer Featured Hub -->
          <div class="bg-gradient-to-br from-discord-gray-800 to-discord-gray-900 border border-purple-500/30 rounded-xl p-4 relative overflow-hidden group shadow-lg">
            
            <!-- Status Badge -->
            <div class="absolute top-4 right-4 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse drop-shadow-[0_0_3px_rgba(192,132,252,0.8)]"></span> Season Active
            </div>
            
            <!-- Header -->
            <div class="flex items-start gap-3 mb-4 cursor-pointer" onclick="openAppModal('zyloslayer')">
              <div class="w-14 h-14 rounded-xl bg-discord-gray-800 border-2 border-purple-500/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(147,51,234,0.15)] group-hover:border-purple-400 transition-colors">
                <i data-feather="shield" class="w-7 h-7 text-purple-400 group-hover:text-purple-300 drop-shadow-md"></i>
              </div>
              <div class="flex-1 mt-0.5">
                <h3 class="text-xl font-bold text-white leading-tight drop-shadow-sm group-hover:text-purple-50 transition-colors">Zylo Slayer <span class="tracking-widest text-[9px] font-bold text-purple-400/80 ml-1 uppercase bg-purple-500/10 px-1.5 py-0.5 rounded">Idle RPG</span></h3>
                <p class="text-xs text-discord-gray-400 mt-1">Defeat monsters, earn gold, & level up your hero.</p>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-3 mb-4">
               
               <!-- Level & XP -->
               <div class="bg-black/30 rounded-lg p-2.5 border border-white/5">
                 <div class="flex justify-between items-end mb-1.5">
                   <div class="text-[10px] text-discord-gray-400 font-medium uppercase tracking-wider">Player Level <span class="text-white text-sm font-bold ml-1">${level}</span></div>
                   <div class="text-[9px] text-discord-gray-500 font-bold uppercase">Stage ${stage}</div>
                 </div>
                 <div class="w-full bg-discord-gray-800 rounded-full h-1.5 mb-2 shadow-inner">
                   <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style="width: ${xpPercent}%"></div>
                 </div>
                 <div class="flex justify-between text-[10px] font-medium text-discord-gray-400">
                   <span class="flex items-center gap-1 text-yellow-400/90"><i data-feather="database" class="w-3 h-3"></i> ${gold}</span>
                   <span class="flex items-center gap-1 text-red-400/90"><i data-feather="crosshair" class="w-3 h-3"></i> ${atk} Atk</span>
                 </div>
               </div>

               <!-- Active Quest -->
               <div class="bg-black/30 rounded-lg p-2.5 border border-white/5 flex flex-col justify-center">
                  <div class="text-[10px] text-discord-gray-400 font-medium uppercase tracking-wider mb-1 flex items-center justify-between">
                     <span>Active Quest</span>
                     <i data-feather="map" class="w-3 h-3 text-green-400/80"></i>
                  </div>
                  <div class="text-xs font-bold text-white mb-2 truncate">${questName}</div>
                  <div class="max-w-full">
                     <div class="flex justify-between text-[9px] text-discord-gray-500 mb-1 font-bold">
                        <span>${questProgress} / ${questTarget} Kills</span>
                        <span class="text-green-400/90">${Math.floor(Math.min(100, (questProgress/questTarget)*100))}%</span>
                     </div>
                     <div class="w-full bg-discord-gray-800 rounded-full h-1 shadow-inner">
                       <div class="bg-green-500 h-1 rounded-full" style="width: ${Math.min(100, (questProgress/questTarget)*100)}%"></div>
                     </div>
                  </div>
               </div>

            </div>

            <!-- CTA -->
            <button onclick="openAppModal('zyloslayer')" class="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 group/btn">
              <i data-feather="${hasSave ? 'play' : 'zap'}" class="w-4 h-4 group-hover/btn:scale-110 transition-transform"></i> 
              <span class="tracking-wide">${hasSave ? 'CONTINUE ADVENTURE' : 'START PLAYING'}</span>
            </button>
          </div>

          <!-- Utilities Label -->
          <div class="flex items-center gap-2 px-1 mt-2 lg:mt-0">
             <div class="h-px bg-discord-gray-700 flex-1"></div>
             <h4 class="text-[10px] font-bold text-discord-gray-500 uppercase tracking-widest text-center shrink-0">Other Utilities</h4>
             <div class="h-px bg-discord-gray-700 flex-1"></div>
          </div>

          <!-- Generic Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onclick="openAppModal('calculator')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="hash" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Calculator</div>
            </button>
            <button onclick="openAppModal('calendar')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="calendar" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Calendar</div>
            </button>
            <button onclick="openAppModal('speedtest')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="zap" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Speed Test</div>
            </button>
            <button onclick="openAppModal('notes')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="file-text" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Notes</div>
            </button>
            <button onclick="openAppModal('timer')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="clock" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Timer</div>
            </button>
            <button onclick="openAppModal('colorpicker')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="aperture" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Colors</div>
            </button>
            <button onclick="openAppModal('snake')" class="p-3 rounded-xl bg-discord-gray-700 hover:bg-discord-gray-600 transition text-center group flex flex-col items-center">
              <i data-feather="play-circle" class="w-6 h-6 mb-1.5 text-discord-gray-400 group-hover:text-white transition"></i>
              <div class="text-xs font-medium text-discord-gray-300 group-hover:text-white">Snake</div>
            </button>
          </div>
        </div>
      `;
            }
        },
        calculator: {
            title: 'Calculator',
            render: () => `
        <div class="bg-discord-gray-700 p-4 rounded-lg">
          <input type="text" id="calcDisplay" class="w-full bg-discord-gray-900 text-white text-2xl text-right p-3 rounded mb-3" readonly value="0">
          <div class="grid grid-cols-4 gap-2">
            ${['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map(b =>
                `<button onclick="calcPress('${b}')" class="p-3 rounded ${b.match(/[0-9.]/) ? 'bg-discord-gray-600' : 'bg-discord-blurple'} hover:opacity-80 text-white font-bold">${b}</button>`
            ).join('')}
          </div>
        </div>
      `
        },
        calendar: {
            title: 'Calendar',
            render: () => {
                const now = new Date();
                const month = now.toLocaleString('default', { month: 'long' });
                const year = now.getFullYear();
                const today = now.getDate();
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
                const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

                let days = '';
                for (let i = 0; i < firstDay; i++) days += '<div></div>';
                for (let d = 1; d <= daysInMonth; d++) {
                    const isToday = d === today ? 'bg-discord-blurple text-white' : 'bg-discord-gray-700 hover:bg-discord-gray-600';
                    days += `<div class="p-2 text-center rounded ${isToday} cursor-pointer">${d}</div>`;
                }

                return `
          <div class="text-center mb-4">
            <div class="text-xl font-bold text-white">${month} ${year}</div>
          </div>
          <div class="grid grid-cols-7 gap-1 text-xs text-center">
            <div class="text-discord-gray-400 font-bold">Sun</div>
            <div class="text-discord-gray-400 font-bold">Mon</div>
            <div class="text-discord-gray-400 font-bold">Tue</div>
            <div class="text-discord-gray-400 font-bold">Wed</div>
            <div class="text-discord-gray-400 font-bold">Thu</div>
            <div class="text-discord-gray-400 font-bold">Fri</div>
            <div class="text-discord-gray-400 font-bold">Sat</div>
            ${days}
          </div>
        `;
            }
        },
        speedtest: {
            title: 'Speed Test',
            render: () => `
        <div class="text-center">
          <div id="speedResult" class="text-6xl font-bold text-white mb-2">--</div>
          <div class="text-discord-gray-400 mb-4">Mbps (Download)</div>
          <button onclick="runSpeedTest()" class="px-6 py-3 bg-discord-blurple hover:bg-opacity-80 text-white rounded-lg font-medium">
            Run Test
          </button>
          <p class="text-xs text-discord-gray-500 mt-4">Note: Simulated test for demo</p>
        </div>
      `
        },
        notes: {
            title: 'Quick Notes',
            render: () => `
        <textarea id="quickNotes" class="w-full h-48 bg-discord-gray-700 text-white p-3 rounded-lg resize-none" placeholder="Type your notes here...">${localStorage.getItem('quickNotes') || ''}</textarea>
        <button onclick="saveNotes()" class="mt-2 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Save Notes</button>
      `
        },
        timer: {
            title: 'Timer',
            render: () => `
        <div class="text-center">
          <div id="timerDisplay" class="text-6xl font-mono font-bold text-white mb-4">00:00</div>
          <div class="flex gap-2 justify-center mb-4">
            <input type="number" id="timerMinutes" class="w-20 bg-discord-gray-700 text-white p-2 rounded text-center" placeholder="Min" value="5">
            <span class="text-2xl text-white">:</span>
            <input type="number" id="timerSeconds" class="w-20 bg-discord-gray-700 text-white p-2 rounded text-center" placeholder="Sec" value="00">
          </div>
          <div class="flex gap-2 justify-center">
            <button onclick="startTimer()" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Start</button>
            <button onclick="stopTimer()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Stop</button>
            <button onclick="resetTimer()" class="px-4 py-2 bg-discord-gray-600 hover:bg-discord-gray-500 text-white rounded-lg">Reset</button>
          </div>
        </div>
      `
        },
        colorpicker: {
            title: 'Color Picker',
            render: () => `
        <div class="space-y-4">
          <div id="colorPreview" class="w-full h-24 rounded-lg bg-discord-blurple border-2 border-discord-gray-600"></div>
          <input type="color" id="colorInput" class="w-full h-12 rounded cursor-pointer" value="#5865f2" onchange="updateColorPreview()">
          <input type="text" id="colorHex" class="w-full bg-discord-gray-700 text-white p-2 rounded text-center font-mono" value="#5865f2" onchange="updateFromHex()">
          <button onclick="copyColor()" class="w-full py-2 bg-discord-blurple hover:bg-opacity-80 text-white rounded-lg">Copy Hex Code</button>
        </div>
      `
        },
        snake: {
            title: 'Snake',
            render: () => `
        <div class="flex flex-col items-center">
          <div class="flex justify-between w-full mb-2 max-w-[300px]">
             <span class="text-white font-bold">Score: <span id="snakeScore">0</span></span>
             <span class="text-discord-gray-400 font-bold">High: <span id="snakeHighScore">0</span></span>
          </div>
          <canvas id="snakeCanvas" width="300" height="300" class="bg-discord-gray-900 border-2 border-discord-gray-600 rounded-lg shadow-lg"></canvas>
          <div class="text-discord-gray-400 text-xs mt-3 text-center">Use Arrow Keys to move.<br>Game auto-starts.</div>
        </div>
      `,
            init: () => {
                const canvas = document.getElementById('snakeCanvas');
                const ctx = canvas.getContext('2d');
                const gridSize = 15;
                const tileCount = canvas.width / gridSize;

                let snake = [{ x: 10, y: 10 }];
                let velocity = { x: 0, y: 0 };
                let apple = { x: 5, y: 5 };
                let score = 0;
                let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
                
                document.getElementById('snakeHighScore').textContent = highScore;

                function resetGame() {
                    snake = [{ x: 10, y: 10 }];
                    velocity = { x: 0, y: 0 };
                    score = 0;
                    document.getElementById('snakeScore').textContent = score;
                    placeApple();
                }

                function placeApple() {
                    apple = {
                        x: Math.floor(Math.random() * tileCount),
                        y: Math.floor(Math.random() * tileCount)
                    };
                    // Ensure apple doesn't spawn on snake
                    if (snake.some(segment => segment.x === apple.x && segment.y === apple.y)) {
                        placeApple();
                    }
                }

                function update() {
                    // Move snake
                    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

                    // Wall collision (wrap around)
                    if (head.x < 0) head.x = tileCount - 1;
                    if (head.x >= tileCount) head.x = 0;
                    if (head.y < 0) head.y = tileCount - 1;
                    if (head.y >= tileCount) head.y = 0;

                    // Self collision
                    if (velocity.x !== 0 || velocity.y !== 0) {
                        for (let i = 0; i < snake.length; i++) {
                            if (head.x === snake[i].x && head.y === snake[i].y) {
                                resetGame();
                                return; // Game over frame
                            }
                        }
                    }

                    snake.unshift(head);

                    // Apple collision
                    if (head.x === apple.x && head.y === apple.y) {
                        score += 10;
                        document.getElementById('snakeScore').textContent = score;
                        if (score > highScore) {
                            highScore = score;
                            localStorage.setItem('snakeHighScore', highScore);
                            document.getElementById('snakeHighScore').textContent = highScore;
                        }
                        placeApple();
                    } else {
                        snake.pop(); // Remove tail if no apple eaten
                    }
                }

                function draw() {
                    ctx.fillStyle = '#202225'; // discord-gray-900 background
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw Apple
                    ctx.fillStyle = '#ed4245'; // discord red
                    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize - 2, gridSize - 2);

                    // Draw Snake
                    ctx.fillStyle = '#57F287'; // discord green
                    snake.forEach((segment, index) => {
                        ctx.fillStyle = index === 0 ? '#3ba55d' : '#57F287'; // Head is slightly darker green
                        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
                    });
                }

                function gameLoop() {
                    update();
                    draw();
                }

                window.snakeKeydownListener = (e) => {
                    switch (e.key) {
                        case 'ArrowLeft': if (velocity.x !== 1) velocity = { x: -1, y: 0 }; break;
                        case 'ArrowUp': if (velocity.y !== 1) velocity = { x: 0, y: -1 }; break;
                        case 'ArrowRight': if (velocity.x !== -1) velocity = { x: 1, y: 0 }; break;
                        case 'ArrowDown': if (velocity.y !== -1) velocity = { x: 0, y: 1 }; break;
                    }
                };
                document.addEventListener('keydown', window.snakeKeydownListener);
                window.snakeInterval = setInterval(gameLoop, 100);
                
                // Init first frame
                resetGame();
                velocity = { x: 1, y: 0 }; // Start moving right automatically
            },
            destroy: () => {
                if (window.snakeInterval) clearInterval(window.snakeInterval);
                if (window.snakeKeydownListener) document.removeEventListener('keydown', window.snakeKeydownListener);
            }
        },
                zyloslayer: {
            title: 'Zylo Slayer (Idle RPG)',
            render: () => `
        <div class="flex flex-col md:flex-row gap-4 h-full text-sm w-full">
            <!-- Left Panel: Game Window -->
            <div class="flex flex-col gap-3 flex-1 h-full min-w-[50%] overflow-hidden bg-discord-gray-900/50 p-2 rounded-xl border border-white/5 relative">
                
                <!-- Stage Header -->
                <div class="flex justify-between items-center bg-gradient-to-r from-discord-gray-800 to-discord-gray-900 shadow-inner p-3 rounded-lg border border-purple-500/20">
                    <div class="font-bold text-lg text-white drop-shadow-sm">Stage <span id="rpgStage" class="text-purple-400">1</span></div>
                    <div class="font-bold text-yellow-400 drop-shadow-sm flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-yellow-500/20"><i data-feather="database" class="w-4 h-4 text-yellow-500"></i> <span id="rpgGold">0</span></div>
                    <div class="font-bold text-teal-400 drop-shadow-sm flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md border border-teal-500/20"><i data-feather="hexagon" class="w-4 h-4 text-teal-500"></i> <span id="rpgGems">0</span></div>
                </div>

                <!-- Battle Log -->
                <div id="rpgLog" class="bg-discord-gray-900 border border-black/20 shadow-inner rounded-xl p-3 h-48 overflow-y-auto text-xs font-mono text-discord-gray-300 flex flex-col gap-1.5 scrollbar-thin">
                    <div class="text-purple-400 font-bold">Welcome back to Zylo Slayer!</div>
                </div>
                
                <!-- Enemy Bar -->
                <div id="rpgEnemyInfo" class="hidden mt-auto mb-2 bg-black/60 p-2 rounded border border-red-500/20">
                    <div id="rpgEnemyName" class="text-xs text-white font-bold mb-1">Enemy</div>
                    <div class="w-full bg-black rounded-full h-1.5 shadow-inner">
                        <div id="rpgEnemyHpBar" class="bg-red-500 h-1.5 rounded-full transition-all" style="width: 100%"></div>
                    </div>
                </div>

                <!-- Core Combat UI -->
                <div class="bg-gradient-to-br from-discord-gray-800 to-discord-gray-900 p-4 rounded-xl border border-white/5 shadow-md">
                    <div class="flex justify-between items-end mb-1.5">
                       <span class="text-xs text-discord-gray-400 font-bold uppercase tracking-wider">Level <span id="rpgLevel" class="text-white text-base ml-1">1</span></span>
                       <span class="text-[10px] text-discord-gray-500 font-medium">XP: <span id="rpgXp">0</span> / <span id="rpgNextXp">100</span></span>
                    </div>
                    <div class="w-full bg-black/40 rounded-full h-2 mb-4 shadow-inner">
                       <div id="rpgXpBar" class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1"><i data-feather="heart" class="w-3.5 h-3.5 text-red-500"></i> HP</span>
                                <span class="text-white text-xs font-mono"><span id="rpgHp">100</span> / <span id="rpgMaxHp">100</span></span>
                            </div>
                            <div class="w-full bg-black/40 rounded-full h-2.5 shadow-inner">
                                <div id="rpgHpBar" class="bg-red-500 h-2.5 rounded-full transition-all duration-200" style="width: 100%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-blue-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1"><i data-feather="droplet" class="w-3.5 h-3.5 text-blue-500"></i> Mana</span>
                                <span class="text-white text-xs font-mono"><span id="rpgMana">100</span> / 100</span>
                            </div>
                            <div class="w-full bg-black/40 rounded-full h-2.5 shadow-inner">
                                <div id="rpgManaBar" class="bg-blue-500 h-2.5 rounded-full transition-all duration-200" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Hotbar -->
                    <div class="flex justify-between items-center mt-4 pt-3 border-t border-white/5 overflow-x-auto scrollbar-none">
                        <div id="rpgHotbar" class="flex gap-1 shrink-0">
                             <!-- rendered by JS -->
                        </div>
                        <button id="zsAutoAuto" onclick="window.ZS_Skills.toggleAutoMode()" class="shrink-0 whitespace-nowrap ml-2 bg-discord-gray-800 text-discord-gray-400 hover:text-white border border-white/5 px-3 py-1.5 rounded flex items-center shadow-md font-bold text-[10px] uppercase">
                             <i data-feather="zap-off" class="w-4 h-4 mr-1"></i> Auto: OFF
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Right Panel: Management Tabs -->
            <div class="flex flex-col flex-1 h-full bg-discord-gray-800 rounded-xl overflow-hidden shadow-lg border border-white/5">
                <!-- Navigation Tabs -->
                <div class="flex bg-discord-gray-900 border-b border-discord-gray-700 w-full flex-wrap">
                    <button id="zsTabEquip" onclick="window.ZS_UI.changeTab('Equip')" class="zs-tab-btn flex-1 py-3 text-purple-400 border-b-2 border-purple-500 hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">EQUIP</button>
                    <button id="zsTabSkills" onclick="window.ZS_UI.changeTab('Skills')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">SKILLS</button>
                    <button id="zsTabSpirits" onclick="window.ZS_UI.changeTab('Spirits')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">SPIRITS</button>
                    <button id="zsTabStats" onclick="window.ZS_UI.changeTab('Stats')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">STATS</button>
                    <button id="zsTabStages" onclick="window.ZS_UI.changeTab('Stages')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">STAGES</button>
                    <button id="zsTabSummon" onclick="window.ZS_UI.changeTab('Summon')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">GACHA</button>
                    <button id="zsTabQuests" onclick="window.ZS_UI.changeTab('Quests')" class="zs-tab-btn flex-1 py-3 text-discord-gray-400 border-b-2 border-transparent hover:bg-white/5 transition text-xs font-bold font-mono min-w-[70px]">QUESTS</button>
                </div>
                
                <!-- Content Area -->
                <div class="flex-1 overflow-y-auto p-4 bg-discord-gray-800">
                    
                    <!-- EQUIP TAB -->
                    <div id="zsContentEquip" class="zs-tab-content flex flex-col gap-2 h-full">
                        <div class="bg-discord-gray-900 border border-white/5 rounded-lg p-3 text-xs mb-2">
                             <div class="font-bold text-gray-300 mb-2 uppercase tracking-wide">Equipped Gear</div>
                             <div class="grid grid-cols-2 gap-2">
                                  <div class="bg-black/30 p-2 rounded">
                                       <span class="text-[10px] text-gray-500 block mb-0.5">Weapon</span>
                                       <span id="eqSlotWeapon" class="text-purple-400 font-bold truncate block">None</span>
                                  </div>
                                  <div class="bg-black/30 p-2 rounded">
                                       <span class="text-[10px] text-gray-500 block mb-0.5">Accessory</span>
                                       <span id="eqSlotAccessory" class="text-blue-400 font-bold truncate block">None</span>
                                  </div>
                                  <div class="bg-black/30 p-2 rounded">
                                       <span class="text-[10px] text-gray-500 block mb-0.5">Relic</span>
                                       <span id="eqSlotRelic" class="text-yellow-400 font-bold truncate block">None</span>
                                  </div>
                                  <div class="bg-black/30 p-2 rounded">
                                       <span class="text-[10px] text-gray-500 block mb-0.5">Class</span>
                                       <span id="eqSlotClass" class="text-green-400 font-bold truncate block">None</span>
                                  </div>
                             </div>
                        </div>
                        <div class="flex gap-2 mb-2">
                             <select onchange="window.currentInvFilter = this.value; window.ZS_UI.renderEquipTab(true)" class="bg-discord-gray-900 text-xs text-white p-1.5 rounded border border-white/5 flex-1 outline-none">
                                 <option value="weapon">Weapons</option>
                                 <option value="accessory">Accessories</option>
                                 <option value="relic">Relics</option>
                                 <option value="class">Classes</option>
                                 <option value="resource">Resources</option>
                             </select>
                        </div>
                        <div id="rpgInventoryList" class="flex flex-col gap-1.5 h-[50vh] overflow-y-auto scrollbar-thin"></div>
                    </div>

                    <!-- SKILLS TAB -->
                    <div id="zsContentSkills" class="zs-tab-content hidden flex flex-col gap-2">
                        <div class="text-xs text-discord-gray-400 font-bold uppercase tracking-wider mb-2">My Skills</div>
                        <div id="zsSkillList" class="flex flex-col gap-2 overflow-y-auto"></div>
                    </div>

                    <!-- SPIRITS TAB -->
                    <div id="zsContentSpirits" class="zs-tab-content hidden flex flex-col gap-2">
                        <div class="text-xs text-discord-gray-400 font-bold uppercase tracking-wider mb-2">Companions</div>
                        <div class="text-[10px] text-gray-500 mb-2">Spirits assist automatically in combat. Upgrading them increases their power.</div>
                        <div id="zsSpiritList" class="flex flex-col gap-2"></div>
                    </div>
                    
                    <!-- STAGES TAB -->
                    <div id="zsContentStages" class="zs-tab-content hidden flex flex-col gap-2">
                        <div class="text-xs text-discord-gray-400 font-bold uppercase tracking-wider mb-2">Select Stage</div>
                        <div id="zsStageList"></div>
                    </div>

                    <!-- STATS TAB -->
                    <div id="zsContentStats" class="zs-tab-content hidden flex flex-col gap-2">
                        <div class="text-xs text-discord-gray-400 font-bold uppercase tracking-wider mb-2">Hero Base Upgrades</div>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="window.ZS_Upgrades.upgradeBaseStat('atk')" class="bg-discord-gray-900 hover:bg-discord-gray-700 border border-white/5 hover:border-purple-500/50 rounded-xl p-3 flex flex-col items-center group transition shadow-sm">
                                <div class="flex items-center justify-center text-gray-300 font-bold mb-1"><i data-feather="crosshair" class="w-4 h-4 mr-1 text-discord-gray-400 group-hover:text-purple-400"></i> Attack</div>
                                <div class="text-[10px] text-discord-gray-400">Base Atk: <span id="rpgStatAtk">10</span></div>
                                <div class="text-[10px] text-yellow-400 mt-2 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">Up Cost: <span id="rpgCostAtk">10</span>g</div>
                            </button>
                            <button onclick="window.ZS_Upgrades.upgradeBaseStat('hp')" class="bg-discord-gray-900 hover:bg-discord-gray-700 border border-white/5 hover:border-red-500/50 rounded-xl p-3 flex flex-col items-center group transition shadow-sm">
                                <div class="flex items-center justify-center text-gray-300 font-bold mb-1"><i data-feather="plus-circle" class="w-4 h-4 mr-1 text-discord-gray-400 group-hover:text-red-400"></i> Max HP</div>
                                <div class="text-[10px] text-discord-gray-400">Base HP: <span id="rpgStatHp">100</span></div>
                                <div class="text-[10px] text-yellow-400 mt-2 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">Up Cost: <span id="rpgCostHp">15</span>g</div>
                            </button>
                            <button onclick="window.ZS_Upgrades.upgradeBaseStat('regen')" class="bg-discord-gray-900 hover:bg-discord-gray-700 border border-white/5 hover:border-green-500/50 rounded-xl p-3 flex flex-col items-center group transition shadow-sm">
                                <div class="flex items-center justify-center text-gray-300 font-bold mb-1"><i data-feather="activity" class="w-4 h-4 mr-1 text-discord-gray-400 group-hover:text-green-400"></i> Regen</div>
                                <div class="text-[10px] text-discord-gray-400">Regen/sec: <span id="rpgStatRegen">1</span></div>
                                <div class="text-[10px] text-yellow-400 mt-2 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">Up Cost: <span id="rpgCostRegen">50</span>g</div>
                            </button>
                            <button onclick="window.ZS_Upgrades.upgradeBaseStat('crit')" class="bg-discord-gray-900 hover:bg-discord-gray-700 border border-white/5 hover:border-yellow-500/50 rounded-xl p-3 flex flex-col items-center group transition shadow-sm">
                                <div class="flex items-center justify-center text-gray-300 font-bold mb-1"><i data-feather="zap" class="w-4 h-4 mr-1 text-discord-gray-400 group-hover:text-yellow-400"></i> Crit %</div>
                                <div class="text-[10px] text-discord-gray-400">Crit Chance: <span id="rpgStatCrit">5</span>%</div>
                                <div class="text-[10px] text-yellow-400 mt-2 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">Up Cost: <span id="rpgCostCrit">100</span>g</div>
                            </button>
                        </div>
                        <div class="mt-8 text-center">
                            <button onclick="window.ZyloSlayer.resetSave()" class="text-xs text-red-500 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/50 px-4 py-2 rounded transition font-bold">WIPE SAVE DATA</button>
                        </div>
                    </div>

                    <!-- SUMMON TAB -->
                    <div id="zsContentSummon" class="zs-tab-content hidden flex flex-col gap-3 h-full">
                        <div id="summonResultArea" class="h-20 flex justify-center items-center bg-discord-gray-900 border border-white/5 rounded-xl shadow-inner text-center px-4 transition-all">
                            <span class="text-discord-gray-500 text-xs">Spend Gems to summon! 100 pulls guarantees Legendary.</span>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-auto">
                            <div class="bg-discord-gray-900 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                                <div class="text-xs text-cyan-400 font-bold uppercase mb-1 drop-shadow">Equipment Gacha</div>
                                <button onclick="window.ZS_Summon.pullEquipment(1)" class="w-full bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 rounded py-2 text-xs text-white font-bold transition">1x (100 Gems)</button>
                                <button onclick="window.ZS_Summon.pullEquipment(10)" class="w-full bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 rounded py-2 text-xs text-white font-bold transition">10x (1000 Gems)</button>
                            </div>
                            <div class="bg-discord-gray-900 border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                                <div class="text-xs text-purple-400 font-bold uppercase mb-1 drop-shadow">Skill Gacha</div>
                                <button onclick="window.ZS_Summon.pullSkill(1)" class="w-full bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded py-2 text-xs text-white font-bold transition">1x (150 Gems)</button>
                                <button onclick="window.ZS_Summon.pullSkill(10)" class="w-full bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded py-2 text-xs text-white font-bold transition">10x (1500 Gems)</button>
                            </div>
                        </div>
                    </div>

                    <!-- QUESTS TAB -->
                    <div id="zsContentQuests" class="zs-tab-content hidden flex flex-col gap-2">
                        <div id="zsQuestList" class="flex flex-col"></div>
                    </div>

                </div>
            </div>
        </div>
        `,
            init: () => {
                if (window.ZyloSlayer) window.ZyloSlayer.init();
            },
            destroy: () => {
                if (window.ZyloSlayer) window.ZyloSlayer.destroy();
            }
        }
    };

    const app = apps[appName];
    if (!app) return;

    if (window.currentAppRef && window.currentAppRef.destroy) {
        window.currentAppRef.destroy();
    }

    window.currentAppRef = app;
    title.textContent = app.title;
    content.innerHTML = app.render();
    modal.classList.remove('hidden');

    if (app.init) {
        setTimeout(app.init, 0); // Allow DOM to repaint before init
    }

    feather.replace();
}

function closeAppModal() {
    if (window.currentAppRef && window.currentAppRef.destroy) {
        window.currentAppRef.destroy();
    }
    document.getElementById('appsModal').classList.add('hidden');
    currentApp = null;
    window.currentAppRef = null;
}

// Calculator functions
var calcValue = '0';
function calcPress(btn) {
    const display = document.getElementById('calcDisplay');
    if (btn === 'C') {
        calcValue = '0';
    } else if (btn === '=') {
        try { calcValue = String(eval(calcValue)); } catch { calcValue = 'Error'; }
    } else {
        if (calcValue === '0' && !btn.match(/[+\-*/]/)) calcValue = btn;
        else calcValue += btn;
    }
    display.value = calcValue;
}

// Speed test (simulated)
function runSpeedTest() {
    const result = document.getElementById('speedResult');
    result.textContent = '...';
    let i = 0;
    const interval = setInterval(() => {
        result.textContent = Math.floor(Math.random() * 100 + 50);
        i++;
        if (i > 20) {
            clearInterval(interval);
            result.textContent = Math.floor(Math.random() * 50 + 75);
        }
    }, 100);
}

// Notes functions
function saveNotes() {
    const notes = document.getElementById('quickNotes').value;
    localStorage.setItem('quickNotes', notes);
    alert('Notes saved!');
}

// Timer functions
var timerInterval = null;
var timerRemaining = 0;
function startTimer() {
    if (timerInterval) return;
    const mins = parseInt(document.getElementById('timerMinutes').value) || 0;
    const secs = parseInt(document.getElementById('timerSeconds').value) || 0;
    timerRemaining = mins * 60 + secs;
    timerInterval = setInterval(tickTimer, 1000);
}
function tickTimer() {
    if (timerRemaining <= 0) {
        stopTimer();
        alert('Timer finished!');
        return;
    }
    timerRemaining--;
    const m = String(Math.floor(timerRemaining / 60)).padStart(2, '0');
    const s = String(timerRemaining % 60).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${m}:${s}`;
}
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
function resetTimer() {
    stopTimer();
    document.getElementById('timerDisplay').textContent = '00:00';
    timerRemaining = 0;
}

// Color picker functions
function updateColorPreview() {
    const color = document.getElementById('colorInput').value;
    document.getElementById('colorPreview').style.backgroundColor = color;
    document.getElementById('colorHex').value = color;
}
function updateFromHex() {
    const hex = document.getElementById('colorHex').value;
    document.getElementById('colorInput').value = hex;
    document.getElementById('colorPreview').style.backgroundColor = hex;
}
function copyColor() {
    const hex = document.getElementById('colorHex').value;
    navigator.clipboard.writeText(hex).then(() => alert('Copied: ' + hex));
}

// Close app modal on click outside
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('appsModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'appsModal') closeAppModal();
    });
});
