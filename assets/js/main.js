function startBackgroundVideo() {
    document.querySelectorAll('.fixed-bg-video, .sm-main_video').forEach(video => {
        video.autoplay = true;
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.controls = false;

        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.removeAttribute('controls');

        const tryPlay = () => {
            if (!video.paused) return;

            const promise = video.play();
            if (promise && typeof promise.catch === 'function') {
                promise.catch(() => {});
            }
        };

        video.addEventListener('loadedmetadata', tryPlay, { once: true });
        video.addEventListener('canplay', tryPlay, { once: true });
        tryPlay();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startBackgroundVideo, { once: true });
} else {
    startBackgroundVideo();
}

window.addEventListener('pageshow', startBackgroundVideo);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') startBackgroundVideo();
});

function playBackgroundVideoOnUserGesture() {
    document.querySelectorAll('.fixed-bg-video, .sm-main_video').forEach(video => {
        video.muted = true;
        video.defaultMuted = true;
        video.controls = false;
        video.removeAttribute('controls');

        const promise = video.play();
        if (promise && typeof promise.catch === 'function') {
            promise.catch(() => {});
        }
    });
}

['touchstart', 'pointerdown', 'wheel', 'scroll'].forEach(eventName => {
    window.addEventListener(eventName, playBackgroundVideoOnUserGesture, {
        once: true,
        passive: true
    });
});

// Модальное окно
$('.open-modal').click(function() {
    $('.sm-questionnaire').addClass('sm-open')
    $('body').addClass('lock')
    $('html.animating [data-jsscroll]:not([data-jsscroll_nomob])').css('opacity','1')
})

$('.sm-quest-modal-close').click(function() {
    $('.sm-quest-modal').removeClass('sm-open')
    $('body').removeClass('lock')
})

const wishSliderParams = {
    slidesToShow: 1,
    infinite: true,
    adaptiveHeight: false,
    nextArrow: $('#wishes-navigation .sm-arrow-next'),
    prevArrow: $('#wishes-navigation .sm-arrow-prev'),
}

function onResize(){
    //
    // $('.sm-dress-code__slider1').slick({
    //     slidesToShow: 1,
    //     infinite: true,
    //     adaptiveHeight: true,
    //     nextArrow: $('.sm-dress-code__slider1').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-next'),
    //     prevArrow: $('.sm-dress-code__slider1').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-prev'),
    // });
    //
    // $('.sm-dress-code__slider2').slick({
    //     slidesToShow: 1,
    //     infinite: true,
    //     adaptiveHeight: true,
    //     nextArrow: $('.sm-dress-code__slider2').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-next'),
    //     prevArrow: $('.sm-dress-code__slider2').parents('.sm-dress-code__box-gallery__item').find('.sm-arrow-prev'),
    // });

}
//
// $(window).on('resize', function() {
//     onResize();
// });
function startAll() {
    startAllScripts();
    onResize();
}
const body = document.body;

// Закрываем модальное сообщение
$(".sm-modal-close").on('click', function() {
    $(this).closest('.sm-modal.sm-open').removeClass('sm-open');
    $('body').removeClass('lock');
})

$(window).on('load', function() {
    setTimeout(function(){
        console.log('len: '+$('.sm-dress-code__colors .sm_colors div').length);
        $('.sm_colors div').each(function (color) {
            if($(this).css('background')==$('.sm-dress-code').css('background')){
                $(this).css('border','solid 1px #262222');
            }
        });

    },700);



    var helloPanelMessage = $('.sm-about__pager-text').text();
    var charNum = 0;
    var panelMessageCurrent = '';
    var textInterval = setInterval(function(){},500);
    setTimeout(function(){
        helloPanelMessage = $('.sm-about__pager-text').text();
        harNum = 0;
        panelMessageCurrent = '';
        textInterval = setInterval(function(){},500);
        clearInterval(textInterval);
        animateText();
    }, 1500);


    function animateText(){
        // console.log('animate4');
        var counter = 30;
        charNum = 0;
        panelMessageCurrent = '';
        textInterval = setInterval(function(){
            if(helloPanelMessage == $('.sm-about__pager-text').text() && counter==30){
                $('.sm-about__pager-text').html('');
                charNum = 0;
            }else{
                if(helloPanelMessage == $('.sm-about__pager-text').text()){
                    counter++;
                }else{
                    counter = 0;
                    charNum++;
                    panelMessageCurrent = helloPanelMessage.slice(0,charNum);
                    $('.sm-about__pager-text').text(panelMessageCurrent);
                }
            }

        },70);

    }
    function stopAnimateText(){
        if (textInterval) {
            // console.log('stopanimate4');
            clearInterval(textInterval);
            textInterval = null;
        }else{
            // console.log('stopanimate4 error');
        }

    }


    $('.play-pause').click(function(){
        console.log(playing)
        if (playing) {
            playing = false;

            $('#audio').get(0).pause();
        } else {
            playing = true;
            $('#audio').get(0).play();
        }

        $('.sm-sound_toggle').toggleClass('active', playing)
    })

    // sm-about__pager-text
});


function checkVisibilityEr(element, callback, offset = 0) {

    const rect = element.getBoundingClientRect();
    const isVisible = (     rect.top <= (window.innerHeight + offset) &&         rect.bottom >= (0 - offset))
    if (isVisible) callback();
}

var isThrottleder = false;
$(function(){
    setTimeout(function(){
        var checkIntro = setInterval(function(){
            if(!$(body).hasClass('opener-active')) {
                handleScroller();
                handleScrollerOwn();
                clearInterval(checkIntro);
            }
        }, 500)
    },2000);
})
window.addEventListener('scroll',  () => {if (!isThrottleder) {
    handleScroller();
    handleScrollerOwn();
    isThrottleder = true;
    setTimeout(() => { isThrottleder = false; }, 100);
}})
// window.addEventListener('load',  () => {if (!isThrottleder) {
//     handleScroller();
//     isThrottleder = true;
//     setTimeout(() => { isThrottleder = false; }, 100);
// }})
window.addEventListener('resize', () => { if (!isThrottleder) {
    handleScroller();
    handleScrollerOwn();
    isThrottleder = true;
    setTimeout(() => { isThrottleder = false; }, 100);
}})

function handleShutters() {
    document.querySelectorAll('.hero-cover-frame-decor').forEach(el => {
        checkVisibilityEr(el, () => {
            el.classList.add('shutters-open');
        });
    });
}

function handleScroller() {
    if(!$(body).hasClass('opener-active')) {
        document.querySelectorAll('.item-animation').forEach(el => {
            checkVisibilityEr(el, () => {
                el.classList.add('item-active');
                if(el.classList.contains('hero-cover-frame-decor')) {
                    console.log('opening')
                    el.classList.add('shutters-open');
                }
            });
        });
    }
}
function handleScrollerOwn() {
    if(!$(body).hasClass('opener-active')) {
        document.querySelectorAll('.hero-cover-frame-decor').forEach(el => {
            checkVisibilityEr(el, () => {
                    el.classList.add('shutters-open');
            });
        });
    }
}


function handleAnimationTemplateElements(){
    if (document.readyState !== 'complete') return;

    $('.sm-js-animation').each(function() {
        const maxWidth = 434;
        const minWidth = 190;

        const scrollTop = $(window).scrollTop();

        // Если пользователь в самом верху страницы
        if (scrollTop <= 100) {
            $('.sm-js-animation').each(function () {
                $(this).css('--decor-width', maxWidth + 'px');
            });
            return;
        }

        // Иначе — обычная логика
        $('.sm-js-animation').each(function () {
            var $el = $(this);

            var windowHeight = $(window).height();
            var elTop = $el.offset().top;
            var elHeight = $el.outerHeight();

            var animationOffset = 50;
            var start = elTop - windowHeight + animationOffset;
            var end = elTop + elHeight / 2 - windowHeight / 2;

            var progressRaw = (scrollTop - start) / (end - start);
            var scrollProgress = Math.min(Math.max(progressRaw, 0), 1);

            var newWidth = maxWidth - (maxWidth - minWidth) * scrollProgress;

            $el.css('--decor-width', newWidth + 'px');
        });
    });
}

$(window).on('load', function() {
    setTimeout(function(){
        console.log('len: '+$('.sm-dress-code__colors .sm_colors div').length);
        $('.sm_colors div').each(function (color) {
            if($(this).css('background-color')==$('.sm-dresscode').css('background-color')){
                $(this).css('border','solid 1px #B62D09');
            }
        });
    },1000);
});


jQuery(document).ready(function() {
    jQuery("a.scrollto").click(function () {
        let as = document.querySelectorAll('.scrollto');
        this.remove();
        elementClick = jQuery(this).attr("href")
        destination = jQuery(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});
