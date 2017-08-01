$(document).ready(function() {
    $("#btn1").click(function() {
        var app = {
            cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
            init: function() {

                app.shuffle();
            },
            shuffle: function() {
                var random = 0;
                var temp = 0;
                for (i = 1; i < app.cards.length; i++) {
                    random = Math.round(Math.random() * i);
                    temp = app.cards[i];
                    app.cards[i] = app.cards[random];
                    app.cards[random] = temp;
                }

                app.assignCards();
                console.log('Shuffled Card Array: ' + app.cards);
            },
            assignCards: function() {
                $('.card').each(function(index) {
                    $(this).attr('data-card-value', app.cards[index]);
                });
                app.timer();
            },
            timer: function() {
                var time = 0

                var time = setInterval(myMethod, 1000);

                function myMethod() {
                    time = time + 1

                    $('#result').val(time);

                    window.bar1 = time;

                }
                app.clickHandlers();
            },



            clickHandlers: function() {
                $('.card').on('click', function() {
                    var v = $(this).data('cardValue')
                    console.log(v) //換成撲克牌
                    $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected')

                    $("img").attr('src', './poker/pic' + v + '.png ');
                    app.checkMatch();

                });
            },
            checkMatch: function() {
                if ($('.selected').length === 2) {
                    if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
                        $('.selected').each(function() {
                            $(this).animate({
                                opacity: 0
                            }).removeClass('unmatched');
                        });
                        $('.selected').each(function() {
                            $(this).removeClass('selected');
                        });
                        app.checkWin();
                    } else {
                        setTimeout(function() {
                            $('.selected').each(function() {

                                $("img").attr('src', './poker/back.png');
                                $(this).html('').removeClass('selected');
                            });
                        }, 1000);
                    }
                }
            },
            checkWin: function() {
                if ($('.unmatched').length === 0) {
                    alert("所花時間 " + bar1 + "秒")

                    $('.container').html('<h1>恭喜!遊戲結束~</h1>')
                        //想放照片'<div > < img src = "./poker / back.png " > < /div> ')







                }
            }
        };
        app.init();

    });
});