// cosmetics.js - Centralized Cosmetic Registry and Manager

const COSMETICS = {
  rarities: {
    common:    { label: 'Common', color: 'text-discord-gray-300' },
    rare:      { label: 'Rare', color: 'text-blue-400' },
    epic:      { label: 'Epic', color: 'text-purple-400' },
    legendary: { label: 'Legendary', color: 'text-yellow-400' }
  },
  frames: {
    'none':       { class: 'frame-none', label: 'No Frame', rarity: 'common', type: 'none' },
    'subtle':     { class: 'frame-subtle', label: 'Subtle Ring', rarity: 'common', type: 'css' },
    'gold':       { class: 'frame-gold', label: 'Gold Rim', rarity: 'rare', type: 'css' },
    'emerald':    { class: 'frame-emerald', label: 'Emerald Edge', rarity: 'rare', type: 'css' },
    'crimson':    { class: 'frame-crimson', label: 'Crimson Glow', rarity: 'epic', type: 'css' },
    'neon':       { class: 'frame-neon', label: 'Neon Circuit', rarity: 'epic', type: 'css' },
    // PNG legends
    'pfp_10':     { class: 'frame-pfp-10', label: 'Shattered Obsidian', rarity: 'legendary', type: 'png', path: '/images/frames/pfp_frame_10.png' },
    'pfp_11':     { class: 'frame-pfp-11', label: 'Eldritch Eye', rarity: 'legendary', type: 'png', path: '/images/frames/pfp_frame_11.png' },
    'pfp_2':      { class: 'frame-pfp-2', label: 'Mechanized Gear', rarity: 'legendary', type: 'png', path: '/images/frames/pfp_frame_2.png' },
    // More PNG legends
    'pfp_12':     { class: 'frame-pfp-12', label: 'Celestial Halo', rarity: 'epic', type: 'png', path: '/images/frames/pfp_frame_12.png' },
    'pfp_13':     { class: 'frame-pfp-13', label: 'Void Ring', rarity: 'legendary', type: 'png', path: '/images/frames/pfp_frame_13.png' },
    'pfp_3':      { class: 'frame-pfp-3', label: 'Mystic Aura', rarity: 'rare', type: 'png', path: '/images/frames/pfp_frame_3.png' },
    'pfp_4':      { class: 'frame-pfp-4', label: 'Amethyst Crystal', rarity: 'epic', type: 'png', path: '/images/frames/pfp_frame_4.png' },
    'pfp_5':      { class: 'frame-pfp-5', label: 'Golden Leaves', rarity: 'rare', type: 'png', path: '/images/frames/pfp_frame_5.png' },
    'pfp_6':      { class: 'frame-pfp-6', label: 'Cyber Edge', rarity: 'epic', type: 'png', path: '/images/frames/pfp_frame_6.png' },
    'pfp_7':      { class: 'frame-pfp-7', label: 'Ice Spike', rarity: 'rare', type: 'png', path: '/images/frames/pfp_frame_7.png' },
    'pfp_8':      { class: 'frame-pfp-8', label: 'Galactic Swirl', rarity: 'legendary', type: 'png', path: '/images/frames/pfp_frame_8.png' },
    'pfp_9':      { class: 'frame-pfp-9', label: 'Molten Core', rarity: 'epic', type: 'png', path: '/images/frames/pfp_frame_9.png' }
  },
  effects: {
    'none':       { class: 'effect-none', label: 'No Effect', rarity: 'common' },
    'glow':       { class: 'effect-glow', label: 'Soft Glow', rarity: 'common' },
    'pulse':      { class: 'effect-pulse', label: 'Gentle Pulse', rarity: 'common' },
    'ring':       { class: 'effect-ring', label: 'Spinning Ring', rarity: 'rare' },
    'sparkle':    { class: 'effect-sparkle', label: 'Sparkle', rarity: 'rare' },
    'shimmer':    { class: 'effect-shimmer', label: 'Shimmer', rarity: 'epic' },
    'matrix':     { class: 'effect-matrix', label: 'Digital Rain', rarity: 'legendary' },
    'fire':       { class: 'effect-fire', label: 'Flame Aura', rarity: 'legendary' },
    'scanline':   { class: 'effect-scanline', label: 'Holo Scan', rarity: 'epic' }
  },
  bannerEffects: {
    'none':             { class: 'banner-none', label: 'Normal' },
    'blur-overlay':     { class: 'banner-blur', label: 'Frosted' },
    'gradient-overlay': { class: 'banner-gradient', label: 'Vibrant' },
    'vignette':         { class: 'banner-vignette', label: 'Vignette' },
    'neon-glow':        { class: 'banner-neon', label: 'Neon Edge' },
    'scanline':         { class: 'banner-scanline', label: 'Scanline' },
    'monochrome':       { class: 'banner-mono', label: 'Monochrome' },
    'sepia':            { class: 'banner-sepia', label: 'Vintage Sepia' }
  }
};

/**
 * Main application of avatar cosmetics
 * @param {HTMLElement} container The .avatar-container wrapping the avatar
 * @param {string} effectKey The key of the effect in COSMETICS.effects
 * @param {string} frameKey The key of the frame in COSMETICS.frames
 */
window.applyAvatarCosmetics = function(container, effectKey, frameKey) {
  if (!container) return;

  // Make sure we're targeting the .avatar-container
  const targetContainer = container.classList.contains('avatar-container') 
    ? container 
    : container.closest('.avatar-container') || container;

  const effectLayer = targetContainer.querySelector('.avatar-effect');
  const frameLayer = targetContainer.querySelector('.avatar-frame');

  // Handle Action
  if (effectLayer) {
    // Clear old effect classes but keep layout utilities
    effectLayer.className = 'avatar-effect absolute inset-0 pointer-events-none rounded-full z-0';
    const effectData = COSMETICS.effects[effectKey] || COSMETICS.effects['none'];
    if (effectData && effectData.class) {
      effectLayer.classList.add(effectData.class);
    }
  }

  if (frameLayer) {
    // Clear old frame classes but keep layout utilities 
    frameLayer.className = 'avatar-frame absolute inset-0 pointer-events-none rounded-full z-20';
    frameLayer.style.backgroundImage = '';
    
    const frameData = COSMETICS.frames[frameKey] || COSMETICS.frames['none'];
    if (frameData && frameData.class) {
      frameLayer.classList.add(frameData.class);
      
      // If it's a PNG/SVG asset type, we render it as background image on the absolute layer
      if ((frameData.type === 'png' || frameData.type === 'svg') && frameData.path) {
        frameLayer.style.backgroundImage = `url('${frameData.path}')`;
      }
    }
  }
};

/**
 * Main application of banner cosmetics
 * @param {HTMLElement} bannerElement The .banner-wrapper or banner img
 * @param {string} effectKey The key of the effect in COSMETICS.bannerEffects
 */
window.applyBannerCosmetics = function(bannerElement, effectKey) {
  if (!bannerElement) return;

  // If passed the actual <img> tag, grab its immediate parent wrapper.
  // Otherwise, assume bannerElement IS the intended wrapper container.
  const targetContainer = bannerElement.tagName === 'IMG' 
    ? bannerElement.parentElement 
    : bannerElement;
    
  if (!targetContainer.classList.contains('banner-wrapper')) {
    targetContainer.classList.add('banner-wrapper');
  }

  let effectLayer = targetContainer.querySelector('.banner-effect');
  if (!effectLayer) {
    effectLayer = document.createElement('div');
    effectLayer.className = 'banner-effect absolute inset-0 pointer-events-none';
    targetContainer.appendChild(effectLayer);
  }

  // Clear old
  effectLayer.className = 'banner-effect absolute inset-0 pointer-events-none';
  
  const effectData = COSMETICS.bannerEffects[effectKey] || COSMETICS.bannerEffects['none'];
  if (effectData && effectData.class) {
    effectLayer.classList.add(effectData.class);
  }
};


// Cosmetics Cache
const cosmeticsCache = new Map();

window.applyUserCosmetics = async function(username, container) {
  if (!container || !username) return;
  
  // Ensure frame and effect layers exist
  let frameLayer = container.querySelector('.avatar-frame');
  if (!frameLayer) {
    frameLayer = document.createElement('div');
    frameLayer.className = 'avatar-frame absolute inset-0 pointer-events-none rounded-full z-20';
    container.appendChild(frameLayer);
  }
  
  let effectLayer = container.querySelector('.avatar-effect');
  if (!effectLayer) {
    effectLayer = document.createElement('div');
    effectLayer.className = 'avatar-effect absolute inset-0 pointer-events-none rounded-full z-0';
    container.appendChild(effectLayer);
  }
  
  // Default styling on the container if not present
  if (!container.classList.contains('avatar-container')) {
    container.classList.add('avatar-container', 'relative');
  }
  
  // Apply cached cosmetics if available
  if (cosmeticsCache.has(username)) {
    const settings = cosmeticsCache.get(username);
    if (window.applyAvatarCosmetics) {
      applyAvatarCosmetics(container, settings.profileEffect || 'none', settings.profileFrame || 'none');
    }
    return;
  }
  
  // Fallback default until fetched to prevent unstyled pop-ins
  if (window.applyAvatarCosmetics) applyAvatarCosmetics(container, 'none', 'none');
  
  try {
    const res = await fetch(`/api/get-user?identifier=${encodeURIComponent(username)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.user) {
        const settings = data.user.settings || {};
        cosmeticsCache.set(username, settings);
        if (window.applyAvatarCosmetics) {
          applyAvatarCosmetics(container, settings.profileEffect || 'none', settings.profileFrame || 'none');
        }
      }
    }
  } catch (e) {
    console.error('Failed to fetch user cosmetics for:', username, e);
  }
};
