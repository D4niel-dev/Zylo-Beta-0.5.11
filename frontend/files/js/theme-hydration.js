(function() {
  try {
    const mode = localStorage.getItem("themeMode") || localStorage.getItem("theme") || "dark";
    if (mode === "dark" || mode === "light") {
      document.documentElement.classList.toggle("dark", mode === "dark");
      document.documentElement.classList.toggle("light", mode === "light");
    }

    if (mode === "custom") {
      const curJSON = localStorage.getItem("currentCustomTheme");
      if (!curJSON) return;
      
      let t;
      try {
        t = JSON.parse(curJSON);
        
        // Handle migration cases where it might just be the theme name
        if (typeof t === 'string') {
            const arrJSON = localStorage.getItem("customThemes");
            if (arrJSON) {
                const arr = JSON.parse(arrJSON);
                t = arr.find((x) => x.name === curJSON);
            } else {
                t = null;
            }
        }
      } catch (e) {
        // Fallback for raw string lookup
        const arrJSON = localStorage.getItem("customThemes");
        if (arrJSON) {
            const arr = JSON.parse(arrJSON);
            t = arr.find((x) => x.name === curJSON);
        }
      }
      
      if (t) {
        document.documentElement.classList.add("theme-custom");
        // Polyfill class for body when it loads, to maintain any remaining body selectors
        document.addEventListener("DOMContentLoaded", () => {
          document.body.classList.add("theme-custom");
        });
        
        const hex2rgb = (c, def) => {
          if(typeof c === 'string' && c.startsWith('#')) {
            let h = c.substring(1);
            if(h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
            const val = parseInt(h, 16);
            return `${(val >> 16) & 255} ${(val >> 8) & 255} ${val & 255}`;
          }
          return def;
        };

        const s = document.documentElement.style;
        
        s.setProperty("--navbar-bg", t.ui.navbarBg);
        s.setProperty("--sidebar-bg", t.ui.sidebarBg);
        s.setProperty("--panel-bg", t.ui.panelBg);
        s.setProperty("--text-color", t.textColor);
        s.setProperty("--accent-color", t.accentColor);
        s.setProperty("--main-bg", t.ui.mainBg || "#0f172a");
        s.setProperty("--header-bg", t.ui.headerBg || t.ui.navbarBg);
        s.setProperty("--user-panel-bg", t.ui.userPanelBg || t.ui.sidebarBg);
        s.setProperty("--bg-hover", t.ui.hoverBg || "rgba(255,255,255,0.1)");
        s.setProperty("--bg-active", t.ui.activeBg || t.accentColor || "#5865F2");

        s.setProperty("--color-discord-gray-900", hex2rgb(t.ui.headerBg || t.ui.navbarBg, "32 34 37"));
        s.setProperty("--color-discord-gray-800", hex2rgb(t.ui.sidebarBg, "47 49 54"));
        s.setProperty("--color-discord-gray-700", hex2rgb(t.ui.mainBg || t.ui.navbarBg, "54 57 63"));
        s.setProperty("--color-discord-gray-600", hex2rgb(t.ui.panelBg, "64 68 75"));
        s.setProperty("--color-discord-gray-500", hex2rgb(t.ui.userPanelBg || t.ui.sidebarBg, "79 84 92"));
        s.setProperty("--color-discord-gray-400", hex2rgb(t.textColor, "185 187 190")); 
        s.setProperty("--color-discord-gray-300", hex2rgb(t.textColor, "220 221 222"));
        s.setProperty("--color-discord-blurple", hex2rgb(t.accentColor, "88 101 242"));
        
        if (t.background) {
            document.addEventListener("DOMContentLoaded", () => {
                const bgS = document.body.style;
                if (t.background.mode === "solid") {
                    bgS.background = t.background.solid;
                } else if (t.background.mode === "gradient") {
                    const angle = t.background.gradient?.angle ?? 135;
                    bgS.background = `linear-gradient(${angle}deg, ${t.background.gradient?.from}, ${t.background.gradient?.to})`;
                } else if (t.background.mode === "image" && t.background.imageDataUrl) {
                    bgS.backgroundImage = `url(${t.background.imageDataUrl})`;
                    bgS.backgroundSize = "cover";
                    bgS.backgroundAttachment = "fixed";
                }
            });
        }
      }
    }
  } catch(e) { console.error("Theme hydration failed", e); }
})();
