document.addEventListener('DOMContentLoaded', () => {
    // --- LANGUAGE TRIGGER REDIRECT CORES ---
    const languageToggle = document.getElementById('languageToggle');
    const languagePanel = document.getElementById('languagePanel');
    const closeLangPanel = document.getElementById('closeLangPanel');
    const langOptions = document.querySelectorAll('.lang-opt');

    if (languageToggle && languagePanel) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isPanelOpen = languageToggle.getAttribute('aria-expanded') === 'true';
            languageToggle.setAttribute('aria-expanded', !isPanelOpen);
            languagePanel.hidden = isPanelOpen;
            if (!isPanelOpen) {
                languagePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (closeLangPanel && languagePanel && languageToggle) {
        closeLangPanel.addEventListener('click', () => {
            languagePanel.hidden = true;
            languageToggle.setAttribute('aria-expanded', 'false');
        });
    }

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            langOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const dynamicUrl = option.getAttribute('data-url');
            if (dynamicUrl) {
                setTimeout(() => {
                    window.location.href = dynamicUrl;
                }, 150);
            }
        });
    });

    // --- SIDE NAVIGATION DRAWER PANEL ---
    const menuToggle = document.getElementById('menuToggle');
    const menuPanel = document.getElementById('menuPanel');
    const closeMenuPanel = document.getElementById('closeMenuPanel');

    if (menuToggle && menuPanel) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isOpen);
            menuPanel.hidden = isOpen;
        });
    }

    if (closeMenuPanel && menuPanel && menuToggle) {
        closeMenuPanel.addEventListener('click', () => {
            menuPanel.hidden = true;
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('click', (e) => {
        if (languagePanel && !languagePanel.hidden && !languagePanel.contains(e.target)) {
            languagePanel.hidden = true;
            if(languageToggle) languageToggle.setAttribute('aria-expanded', 'false');
        }
        if (menuPanel && !menuPanel.hidden && !menuPanel.contains(e.target)) {
            menuPanel.hidden = true;
            if(menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // --- INTERACTIVE TIMELINE STEP MODULATION SWITCHER ---
    const btnWfJob = document.getElementById('btn-wf-job');
    const btnWfSelf = document.getElementById('btn-wf-self');
    const panelWfJob = document.getElementById('workflow-job-panel');
    const panelWfSelf = document.getElementById('workflow-self-panel');

    function restartTimelineSequence(containerPanel) {
        const stepItems = containerPanel.querySelectorAll('.step-node-item');
        stepItems.forEach(node => {
            const preservedAnimation = node.style.animation;
            node.style.animation = 'none';
            node.offsetHeight; 
            node.style.animation = preservedAnimation;
        });
    }

    if (btnWfJob && btnWfSelf && panelWfJob && panelWfSelf) {
        btnWfJob.addEventListener('click', () => {
            btnWfSelf.classList.remove('active');
            btnWfJob.classList.add('active');
            panelWfSelf.hidden = true;
            panelWfJob.hidden = false;
            restartTimelineSequence(panelWfJob);
        });

        btnWfSelf.addEventListener('click', () => {
            btnWfJob.classList.remove('active');
            btnWfSelf.classList.add('active');
            panelWfJob.hidden = true;
            panelWfSelf.hidden = false;
            restartTimelineSequence(panelWfSelf);
        });
    }
});