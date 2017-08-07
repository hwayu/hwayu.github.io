$(document).ready(function() {
    $('.button').click(function() { //使button只能按一次
        $(this).prop('disabled', true);
        var app = {
            totalTime: 0,
            cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
            init: function() {
                //洗牌
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
            }, //計時
            timer: function() {
                var time = 0

                var timer = setInterval(myMethod, 1000);

                function myMethod() {
                    time = time + 1

                    $('#result').val(time);

                    //傳到totaltime
                    app.totalTime = time;

                }
                app.clickHandlers();
            },



            clickHandlers: function() {
                $('.card').on('click', function() {
                    //確保一次最多只有兩張牌被翻起
                    if ($('.selected').length < 2) {
                        var v = $(this).data('card-value');
                        console.log(v)
                        $(this).addClass('selected');
                        //find可換成children
                        $(this).find('img').attr('src', './poker/pic' + v + '.png');
                        app.checkMatch();

                    };
                })
            },
            checkMatch: function() {
                if ($('.selected').length === 2) {
                    if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
                        $('.selected').each(function() {
                            $(this).animate({ //不透明度為0
                                opacity: 0
                            }).removeClass('unmatched');
                        });
                        $('.selected').each(function() {
                            $(this).removeClass('selected');
                        });
                        app.checkWin();
                    } else { //翻回去
                        setTimeout(function() {
                            $('.selected').each(function() {

                                $(this).find('img').attr('src', './poker/back.png');
                                $(this).removeClass('selected');
                            });
                        }, 700);
                    }
                }
            },
            checkWin: function() {
                if ($('.unmatched').length === 0) {
                    alert("所花時間 " + app.totalTime + "秒")
                    $h2 = $('<h2>').addClass("title").text('恭喜挑戰成功');
                    $img = $('<img>').attr('src', './poker/images.jpg');
                    $p = $('<p>').text('所花時間' + app.totalTime + '秒');
                    //加入按鈕重整
                    $input = $('<input>').attr({
                        type: "button",
                        id: "field",
                        value: "再玩一次",
                        class: 'btn-warning'
                    }); //先p then img,input
                    $('#output').append($h2).append($p).append($img).append($input);
                    //重整頁面
                    $('#field').on('click', function() {
                        window.location.reload();

                    });
                }

            }
        };
        app.init();

    });
});