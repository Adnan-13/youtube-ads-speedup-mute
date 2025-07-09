// ==UserScript==
// @name         YouTube Auto Mute + Custom Ad Speed
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  Mutes YouTube ads and plays them at a custom speed. Restores user speed after ads, including mid-roll and skipped ads.
// @author       Adnan Bin Zahir
// @match        *://www.youtube.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    const AD_SPEED_MULTIPLIER = 10;
    const AD_SKIP_PERCENTAGE = 80;

    let lastMutedState = null;
    let wasAdSpeed = false;
    let userPlaybackRate = null;
    let checkInterval = null;

    const shouldSkipAd = () => Math.random() * 100 < AD_SKIP_PERCENTAGE;

    function restoreSpeedWhenReady(video) {
        if (!video) return;

        const tryRestore = () => {
            try {
                if (video.readyState >= 3 && !video.paused && !video.ended) {
                    const restoreRate = userPlaybackRate || 1;
                    video.playbackRate = restoreRate;
                    wasAdSpeed = false;
                } else {
                    setTimeout(tryRestore, 100);
                }
            } catch (err) {
                console.error('[YT Auto Mute Ads] Error restoring speed:', err);
            }
        };

        tryRestore();
    }

    function setAdMode(video, isAd) {
        if (!video) return;

        try {
            const skipAd = shouldSkipAd();

            if (isAd && video.playbackRate !== AD_SPEED_MULTIPLIER) {
                if (video.playbackRate !== 1) {
                    userPlaybackRate = video.playbackRate;
                } else {
                    setTimeout(() => {
                        if (video.playbackRate !== 1) {
                            userPlaybackRate = video.playbackRate;
                        }
                    }, 1000);
                }
            }

            if (lastMutedState !== isAd) {
                video.muted = isAd;
                lastMutedState = isAd;
            }

            if (isAd && !wasAdSpeed && skipAd) {
                const delay = 200 + Math.random() * 300;
                setTimeout(() => {
                    if (document.querySelector('.ad-showing')) {
                        video.playbackRate = AD_SPEED_MULTIPLIER;
                        wasAdSpeed = true;
                    }
                }, delay);
            } else if (!isAd && video.playbackRate === AD_SPEED_MULTIPLIER) {
                restoreSpeedWhenReady(video);
            }
        } catch (err) {
            console.error('[YT Auto Mute Ads] Error in setAdMode:', err);
        }
    }

    function handleAdCheck() {
        try {
            const video = document.querySelector('.html5-main-video');
            const isAd = document.querySelector('.ad-showing');
            setAdMode(video, !!isAd);
        } catch (err) {
            console.error('[YT Auto Mute Ads] Error during ad check:', err);
        }
    }

    function observeAndCheck() {
        try {
            const player = document.querySelector('.html5-video-player');

            if (player) {
                const observer = new MutationObserver(() => {
                    handleAdCheck();
                });

                observer.observe(player, {
                    attributes: true,
                    childList: true,
                    subtree: true,
                });

                clearInterval(checkInterval);
                checkInterval = setInterval(handleAdCheck, 500);

                handleAdCheck();
            } else {
                setTimeout(observeAndCheck, 500);
            }
        } catch (err) {
            console.error('[YT Auto Mute Ads] Error in observer:', err);
        }
    }

    observeAndCheck();

    window.addEventListener('yt-navigate-finish', () => {
        lastMutedState = null;
        wasAdSpeed = false;
        userPlaybackRate = null;
        clearInterval(checkInterval);
        observeAndCheck();
    });
})();
