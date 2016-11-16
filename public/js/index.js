'use strict'
window.jQuery = window.$ = require('jquery');
require('bootstrap');
require('bootstrap-validator');
// require('./third_party/mep-feature-playlist');
(function () {
    $(document).ready(function() {
        $(window).scroll(function() {
            var wScroll = $(this).scrollTop();
            $('#logo').css({
                'transform' : 'translate(0px, '+ wScroll / 1.3 +'%)'
            });
        });
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                if ($('#bar').hasClass('visible') == false) {
                    $('#bar').stop().animate({
                        left: '0px'
                    }, function() {
                        $('#bar').addClass('visible');
                    });
                }
            } else {
                if ($('#bar').hasClass('visible') == true) {
                    $('#bar').stop().animate({
                        left: '-100px'
                    }, function() {
                        $('#bar').removeClass('visible');
                    });
                }
            }
        });
        $('.loader').fadeOut('slow');
        $('#bar').on('mouseover',function(e) {
            $('#hideArea').addClass('show');
        });
        $('#hideArea').on('mouseover',function(e) {
            $(this).addClass('show');
        });
        $('#hideArea').on('mouseout',function(e) {
            $(this).removeClass('show');
        });
        $('#reviewFrame').each(function() {
           $(this).css('min-height', $('#reviewRight', this).outerHeight());
        });
        $('#bookContents').each(function() {
           $(this).css('min-height', $('#contact', this).outerHeight());
        });
        $('#policy').css({'height':($('#contact').height()+'px')});
    });
    // Audio Player
    var b = document.documentElement;
    b.setAttribute('data-useragent',  navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform );
    var supportsAudio = !! document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0;
        var playing = false;
        var mediaPath = 'images/video/audio/';
        var extension = '';
        var tracks = [
            {
                'track': 1,
                'name': '遺憾 Regret - 方炯鑌 Abin Fang',
                'length': '04:00',
                'file': '3-regret'
            },
            {
                'track': 2,
                'name': '好好先生 Nice Guy - 蕭煌奇 Ricky Xiao',
                'length': '04:33',
                'file': '1-niceGuy'
            },
            {
                'track': 3,
                'name': '慢靈魂 Slow Soul - 盧  廣仲 Crowd Lu',
                'length': '04:29',
                'file': '2-slowSoul'
            }
        ];
        var trackCount = tracks.length;
        var npAction = $('#npAction');
        var npTitle = $('#npTitle');
        var audio = $('#audio1').bind('play', function() {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function() {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function() {
            npAction.text('Paused...');
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0);
        var btnPrev = $('#btnPrev').click(function () {
            if ((index - 1) > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        });
        var btnNext = $('#btnNext').click(function () {
            if ((index + 1) < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        });
        const loadTrack = function (id) {
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        };
        const playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
        var li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        });
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    };
    require('./contact')();
})()
