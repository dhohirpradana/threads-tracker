(() => {
    // Constants untuk konfigurasi - disesuaikan agar lebih natural dan anti-spam
    const CONFIG = {
        SCROLL_DELAY_MIN: 8000,        // 8 detik (lebih natural)
        SCROLL_DELAY_MAX: 15000,       // 15 detik (variasi lebih besar)
        MODAL_CHECK_INTERVAL: 1000,
        SCROLL_AMOUNT_MIN: 300,        // Scroll lebih kecil dan bertahap
        SCROLL_AMOUNT_MAX: 600,        // Random scroll amount
        IDLE_THRESHOLD: 3,             // Berapa kali tidak ada data baru sebelum stop
        DATA_CHECK_INTERVAL: 2000      // Interval cek data baru
    };

    // State management - dengan tracking untuk data completion
    const state = {
        users: new Map(),
        isAutoScrolling: false,
        scrollTimeout: null,
        lastUserCount: 0,
        noNewDataCount: 0,
        lastScrollPosition: 0,
        isStuck: false
    };

    // Cache DOM elements
    const domCache = {
        statusDiv: null,
        btnScroll: null,
        btnList: null,
        btnDownload: null,
        blocker: null,
        modal: null,
        listContainer: null
    };

    // Utility functions
    const utils = {
        getElement: (id) => domCache[id] || (domCache[id] = document.getElementById(id)),
        
        clearElement: (element) => {
            if (element) element.innerHTML = '';
        },

        setButtonState: (button, enabled, opacity = '1', cursor = 'pointer') => {
            if (!button) return;
            button.disabled = !enabled;
            button.style.opacity = opacity;
            button.style.cursor = cursor;
        },

        createButton: (config) => {
            const btn = document.createElement('button');
            Object.entries(config.styles).forEach(([key, value]) => {
                btn.style[key] = value;
            });
            btn.id = config.id;
            btn.innerText = config.text;
            if (config.onclick) btn.onclick = config.onclick;
            return btn;
        },

        createDiv: (styles = {}) => {
            const div = document.createElement('div');
            Object.entries(styles).forEach(([key, value]) => {
                div.style[key] = value;
            });
            return div;
        },

        // Random number generator untuk natural behavior
        getRandomDelay: (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getRandomScrollAmount: () => {
            return utils.getRandomDelay(CONFIG.SCROLL_AMOUNT_MIN, CONFIG.SCROLL_AMOUNT_MAX);
        }
    };

    // Data management
    const dataManager = {
        addUser: (username, followedBy, following) => {
            state.users.set(username, {
                username,
                followed_by: followedBy,
                following: following
            });
        },

        getUnfollowers: () => {
            return [...state.users.values()].filter(x => !x.followed_by);
        },

        getAllUsers: () => {
            return [...state.users.values()];
        },

        getTotalCount: () => state.users.size,

        getUnfollowersCount: () => dataManager.getUnfollowers().length,

        // Check if new data arrived
        hasNewData: () => {
            const currentCount = state.users.size;
            const hasNew = currentCount > state.lastUserCount;
            if (hasNew) {
                state.lastUserCount = currentCount;
                state.noNewDataCount = 0;
            } else {
                state.noNewDataCount++;
            }
            return hasNew;
        },

        // Check if we should continue scrolling
        shouldContinueScrolling: () => {
            return state.noNewDataCount < CONFIG.IDLE_THRESHOLD;
        }
    };

    // UI Update functions
    const uiManager = {
        updateStats: () => {
            const statusDiv = utils.getElement('threads-tracker-status');
            if (statusDiv) {
                const total = dataManager.getTotalCount();
                const unfollowers = dataManager.getUnfollowersCount();
                const status = state.isAutoScrolling ? 
                    `<span style="color: #4ade80;">● Scanning...</span>` : 
                    `<span style="color: #94a3b8;">○ Stopped</span>`;
                statusDiv.innerHTML = `${status}<br>Total: <b>${total}</b> | Unfollowers: <b>${unfollowers}</b>`;
            }
        },

        toggleScrollButton: (isScrolling) => {
            const btnScroll = utils.getElement('btn-autoscroll');
            const blocker = utils.getElement('threads-tracker-blocker');
            
            if (isScrolling) {
                if (btnScroll) {
                    btnScroll.innerText = '⏹ Hentikan';
                    btnScroll.style.background = '#ff4d4d';
                    btnScroll.style.color = '#fff';
                }
                if (blocker) blocker.style.display = 'block';
                utils.setButtonState(utils.getElement('btn-show-list'), false, '0.4', 'not-allowed');
                utils.setButtonState(utils.getElement('btn-download-txt'), false, '0.4', 'not-allowed');
            } else {
                if (btnScroll) {
                    btnScroll.innerText = '⏬ Mulai Scan';
                    btnScroll.style.background = '#fff';
                    btnScroll.style.color = '#000';
                }
                if (blocker) blocker.style.display = 'none';
                utils.setButtonState(utils.getElement('btn-show-list'), true);
                utils.setButtonState(utils.getElement('btn-download-txt'), true);
            }
            
            uiManager.updateStats();
        },

        showModal: () => {
            const modal = utils.getElement('threads-tracker-modal');
            if (modal) modal.style.display = 'flex';
        },

        hideModal: () => {
            const modal = utils.getElement('threads-tracker-modal');
            if (modal) modal.style.display = 'none';
        },

        renderUserList: (users) => {
            const listContainer = utils.getElement('threads-tracker-list');
            if (!listContainer) return;

            utils.clearElement(listContainer);
            
            const fragment = document.createDocumentFragment();
            
            users.forEach((user, index) => {
                const row = utils.createDiv({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 10px',
                    borderBottom: '1px solid #333'
                });

                const nameDiv = document.createElement('div');
                nameDiv.innerText = `${index + 1}. @${user.username}`;
                nameDiv.style.fontWeight = '500';

                const btnOpen = document.createElement('a');
                btnOpen.href = `https://www.threads.net/@${user.username}`;
                btnOpen.target = '_blank';
                btnOpen.innerText = 'Buka Profil';
                Object.assign(btnOpen.style, {
                    padding: '6px 12px',
                    background: '#181818',
                    border: '1px solid #555',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    transition: '0.2s'
                });
                
                btnOpen.onmouseover = () => btnOpen.style.background = '#333';
                btnOpen.onmouseout = () => btnOpen.style.background = '#181818';

                row.appendChild(nameDiv);
                row.appendChild(btnOpen);
                fragment.appendChild(row);
            });

            listContainer.appendChild(fragment);
        }
    };

    // Scroll management - IMPROVED untuk anti-spam dan data completion
    const scrollManager = {
        findScrollableElement: () => {
            const scrollableDivs = Array.from(document.querySelectorAll('div')).filter(div => {
                const style = window.getComputedStyle(div);
                return (style.overflowY === 'auto' || style.overflowY === 'scroll') && 
                       div.scrollHeight > div.clientHeight;
            });
            return scrollableDivs.length > 0 ? scrollableDivs[scrollableDivs.length - 1] : null;
        },

        // Check if scroll is stuck
        isScrollStuck: (target) => {
            const currentPos = target ? target.scrollTop : window.scrollY;
            const isStuck = currentPos === state.lastScrollPosition;
            state.lastScrollPosition = currentPos;
            return isStuck;
        },

        // Smooth scroll dengan amount yang lebih kecil dan random
        performScroll: () => {
            if (!state.isAutoScrolling) return;

            const target = scrollManager.findScrollableElement();
            const scrollAmount = utils.getRandomScrollAmount();

            if (target) {
                // Smooth scroll increment, bukan langsung ke bottom
                target.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });

                // Check if reached bottom
                const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
                if (isAtBottom) {
                    console.log('📍 Reached bottom of scroll area');
                    state.isStuck = true;
                }
            } else {
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            }

            // Check for new data periodically
            setTimeout(() => {
                const hasNew = dataManager.hasNewData();
                if (!hasNew) {
                    console.log(`⚠️ No new data (${state.noNewDataCount}/${CONFIG.IDLE_THRESHOLD})`);
                }

                // Auto stop if no new data after threshold
                if (!dataManager.shouldContinueScrolling() || state.isStuck) {
                    console.log('✅ Scan completed - no more new data or reached end');
                    actions.toggleAutoScroll();
                    alert(`Scan selesai!\n\nTotal: ${dataManager.getTotalCount()}\nUnfollowers: ${dataManager.getUnfollowersCount()}`);
                    return;
                }

                uiManager.updateStats();
            }, CONFIG.DATA_CHECK_INTERVAL);

            // Random delay untuk natural behavior (8-15 detik)
            const randomDelay = utils.getRandomDelay(CONFIG.SCROLL_DELAY_MIN, CONFIG.SCROLL_DELAY_MAX);
            console.log(`⏰ Next scroll in ${(randomDelay/1000).toFixed(1)}s`);
            
            state.scrollTimeout = setTimeout(scrollManager.performScroll, randomDelay);
        },

        stop: () => {
            if (state.scrollTimeout) {
                clearTimeout(state.scrollTimeout);
                state.scrollTimeout = null;
            }
            state.isStuck = false;
            state.noNewDataCount = 0;
        }
    };

    // Main action handlers
    const actions = {
        toggleAutoScroll: () => {
            state.isAutoScrolling = !state.isAutoScrolling;
            uiManager.toggleScrollButton(state.isAutoScrolling);

            if (state.isAutoScrolling) {
                // Reset counters
                state.lastUserCount = state.users.size;
                state.noNewDataCount = 0;
                state.isStuck = false;
                console.log('🚀 Starting scan...');
                scrollManager.performScroll();
            } else {
                console.log('⏹ Scan stopped manually');
                scrollManager.stop();
            }
        },

        showUnfollowersList: () => {
            if (state.isAutoScrolling) return;

            const unfollowers = dataManager.getUnfollowers();
            
            if (unfollowers.length === 0) {
                alert("Belum ada data! Silakan buka daftar Following dan biarkan proses berjalan dulu.");
                return;
            }

            uiManager.renderUserList(unfollowers);
            uiManager.showModal();
        },

        exportToTxt: () => {
            if (state.isAutoScrolling) return;

            const unfollowers = dataManager.getUnfollowers();
            if (unfollowers.length === 0) {
                alert("Belum ada data untuk didownload! Silakan scan daftar Following Anda terlebih dahulu.");
                return;
            }

            const text = unfollowers.map(x => x.username).join("\n");
            const blob = new Blob([text], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "belum_follback.txt";
            a.click();
            URL.revokeObjectURL(a.href);
        },

        closeModal: () => {
            uiManager.hideModal();
        }
    };

    // XHR Interceptor
    const setupXHRInterceptor = () => {
        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url) {
            this._url = url;
            return originalOpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function(body) {
            this.addEventListener("load", function() {
                if (!this._url?.includes("/graphql/query")) return;

                try {
                    const json = JSON.parse(this.responseText);
                    const edges = json?.data?.fetch__XDTUserDict?.following?.edges;

                    if (!edges || edges.length === 0) return;

                    let newUsersCount = 0;
                    edges.forEach(edge => {
                        const node = edge?.node;
                        if (!node?.username) return;

                        const username = node.username;
                        if (!state.users.has(username)) {
                            newUsersCount++;
                            dataManager.addUser(
                                username,
                                node.friendship_status?.followed_by ?? false,
                                node.friendship_status?.following ?? false
                            );
                        }
                    });

                    if (newUsersCount > 0) {
                        console.log(`✨ Found ${newUsersCount} new users`);
                    }

                    uiManager.updateStats();
                } catch (e) {
                    console.error("Terjadi kesalahan parsing JSON:", e);
                }
            });

            return originalSend.apply(this, arguments);
        };
    };

    // Modal checker
    const setupModalChecker = () => {
        setInterval(() => {
            const btnScroll = utils.getElement('btn-autoscroll');
            if (!btnScroll) return;

            const isModalOpen = document.querySelector('div[role="dialog"]') !== null;

            if (!isModalOpen) {
                if (state.isAutoScrolling) {
                    actions.toggleAutoScroll();
                }
                
                btnScroll.innerText = '🔒 Buka list Following';
                utils.setButtonState(btnScroll, false, '0.4', 'not-allowed');
            } else {
                if (!state.isAutoScrolling) {
                    btnScroll.innerText = '⏬ Mulai Scan';
                    utils.setButtonState(btnScroll, true);
                }
            }
        }, CONFIG.MODAL_CHECK_INTERVAL);
    };

    // UI Creation
    const createUI = () => {
        if (document.getElementById('threads-tracker-container')) return;

        // Blocker overlay
        const blocker = utils.createDiv({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.1)',
            zIndex: '999998',
            display: 'none'
        });
        blocker.id = 'threads-tracker-blocker';
        document.body.appendChild(blocker);

        // Main container
        const container = utils.createDiv({
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '999999',
            background: '#181818',
            color: '#fff',
            padding: '15px',
            borderRadius: '12px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
            border: '1px solid #333',
            width: '220px'
        });
        container.id = 'threads-tracker-container';

        // Title
        const title = utils.createDiv({
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center'
        });
        title.innerText = '🧵 Tracker v1.0.5';

        // Status
        const status = utils.createDiv({
            fontSize: '11px',
            marginBottom: '12px',
            color: '#aaa',
            lineHeight: '1.5'
        });
        status.id = 'threads-tracker-status';
        status.innerHTML = `<span style="color: #94a3b8;">○ Stopped</span><br>Total: <b>0</b> | Unfollowers: <b>0</b>`;

        // Buttons
        const btnScroll = utils.createButton({
            id: 'btn-autoscroll',
            text: '🔒 Buka list Following',
            onclick: actions.toggleAutoScroll,
            styles: {
                width: '100%',
                padding: '8px',
                marginBottom: '8px',
                background: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                opacity: '0.4',
                cursor: 'not-allowed',
                fontSize: '13px'
            }
        });
        btnScroll.disabled = true;

        const btnList = utils.createButton({
            id: 'btn-show-list',
            text: '📋 Lihat Daftar',
            onclick: actions.showUnfollowersList,
            styles: {
                width: '100%',
                padding: '8px',
                marginBottom: '8px',
                background: '#0095f6',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.3s',
                fontSize: '13px'
            }
        });

        const btnDownload = utils.createButton({
            id: 'btn-download-txt',
            text: '💾 Download .txt',
            onclick: actions.exportToTxt,
            styles: {
                width: '100%',
                padding: '8px',
                background: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.3s',
                fontSize: '13px'
            }
        });

        container.append(title, status, btnScroll, btnList, btnDownload);
        document.body.appendChild(container);

        // Modal
        const modal = utils.createDiv({
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.7)',
            zIndex: '1000000',
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        });
        modal.id = 'threads-tracker-modal';

        const modalContent = utils.createDiv({
            background: '#181818',
            width: '400px',
            maxHeight: '80vh',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #333',
            color: '#fff',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
        });

        const modalHeader = utils.createDiv({
            padding: '15px',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        });

        const titleModal = document.createElement('span');
        titleModal.innerText = '📋 Daftar Belum Follback';
        titleModal.style.fontWeight = 'bold';

        const btnClose = document.createElement('button');
        btnClose.innerText = '✖';
        Object.assign(btnClose.style, {
            background: 'transparent',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
        });
        btnClose.onclick = actions.closeModal;

        modalHeader.append(titleModal, btnClose);

        const listContainer = utils.createDiv({
            padding: '10px',
            overflowY: 'auto',
            flex: '1'
        });
        listContainer.id = 'threads-tracker-list';

        modalContent.append(modalHeader, listContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        setupModalChecker();
    };

    // Expose to window
    window.toggleAutoScroll = actions.toggleAutoScroll;
    window.showUnfollowersList = actions.showUnfollowersList;
    window.exportBelumFollbackTxt = actions.exportToTxt;
    window.closeModal = actions.closeModal;

    // Initialize
    setupXHRInterceptor();

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        createUI();
    } else {
        document.addEventListener('DOMContentLoaded', createUI);
    }

    console.log("✅ Threads Tracker v1.0.5 (Anti-Spam + Complete Data Capture) ready!");
})();
