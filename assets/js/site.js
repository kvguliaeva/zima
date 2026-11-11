(function ($) {
    'use strict';

    $('.sm-wishes__content-slider').slick(wishSliderParams);
    Fancybox.bind('[data-fancybox]', { Thumbs: false, caption: false });

    const days = document.getElementById('days');
    const weddingDate = new Date(days.dataset.weddingDate);
    const clock = ['days', 'hours', 'minutes', 'seconds'].map(unit =>
        document.querySelectorAll('#' + unit + ' .sm-timer-time_number')
    );

    function updateCountdown() {
        const remaining = Math.max(0, Math.floor((weddingDate - Date.now()) / 1000));
        const values = [
            Math.floor(remaining / 86400),
            Math.floor(remaining / 3600) % 24,
            Math.floor(remaining / 60) % 60,
            remaining % 60
        ];

        clock.forEach((digits, index) => {
            const value = String(values[index]).padStart(2, '0');
            digits.forEach((digit, position) => {
                if (index === 0) $(digit).toggle(position < value.length);
                digit.firstElementChild.textContent = value[position] || '';
            });
        });

        if (remaining > 0) window.setTimeout(updateCountdown, 1000);
    }

    function updateScroll() {
        $('.sm-mob-btn').toggleClass('sm-hidden_slow', window.scrollY < window.innerHeight / 2);
        handleAnimationTemplateElements();
    }

    let pendingScrollUpdate = false;
    function scheduleScrollUpdate() {
        if (pendingScrollUpdate) return;
        pendingScrollUpdate = true;
        window.requestAnimationFrame(() => {
            pendingScrollUpdate = false;
            updateScroll();
        });
    }

    $(window).on('load resize scroll', scheduleScrollUpdate);
    $('.open-modal').on('click', handleScroller);

    updateCountdown();
    updateScroll();
})(jQuery);
