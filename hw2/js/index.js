$('#insert').on('click', function() {
        var data = {
            name: $('#InputProductName').val(),
            price: +$('#InputProductPrice').val(),
            count: +$('#InputProductCount').val(),
            image: $('#InputProductImage').val()
        }
        $.post("http://js2017-hw2.kchen.club/insert", data, function(response) {
            if (response) {
                if (response.result) {
                    $('#message').text('新增成功');
                } else {
                    $('#message').text('新增失敗 (' + response.data + ')');
                }
            } else {
                $('#message').text('新增失敗');
            }
            $('#dialog').modal('show');
            console.log(response);
        }, "json");
    })
    //搜尋關鍵字
$('#search').on('click', function() {
    //把上一頁的東西清除
    $('.item').remove();
    var results = [];
    var m = $('#keyword').val();
    console.log(m);
    $.get("http://js2017-hw2.kchen.club/query", function(response) {
        for (var i = 0; i < response.data.length; i++) {
            //Array.indexOf ()方法是用來搜尋陣列中的元素，若是匹配成功則傳回該元素所在位置的索引，失敗則傳回-1,!=是不等於
            if (response.data[i].name.indexOf(m) != -1) {
                $img = $('<img>').addClass("thumb").attr('src', response.data[i].image);
                $h3 = $('<h3>').addClass("title").text(response.data[i].name);
                $p = $('<p>').addClass("price").text('NT$' + response.data[i].price);
                $div = $('<div>').attr('class', 'item').append($img).append($h3).append($p);
                $col = $('<div>').attr('class', 'col-*').append($div);
                $('#product-list').append($col);
                //  results.push(response.data[i].name);
                // console.log(results);

            }
        };
    })
})
$('#query').on('click', function() {
    $(this).prop('disabled', true);
    $.get("http://js2017-hw2.kchen.club/query", function(response) {
        if (response) {
            if (response.result) {
                // TODO HW2 作業寫在這裡
                //一頁放12個
                var lim = 12
                var all = response.data.length
                    //ceil:取最小整數
                var totalPage = Math.ceil(all / lim);
                for (var i = 1; i <= totalPage; i++) {
                    //無作用連結,做頁碼
                    $("#numbers").append("<a href='javascript:void(0);'>" + i + "</a>");
                }
                $("#numbers a:first").addClass("active");
                //先顯示第一頁
                for (var i = 0; i < 12; i++) {
                    $img = $('<img>').addClass("thumb").attr('src', response.data[i].image);
                    $h3 = $('<h3>').addClass("title").text(response.data[i].name);
                    $p = $('<p>').addClass("price").text('NT$' + response.data[i].price);
                    $div = $('<div>').attr('class', 'item').append($img).append($h3).append($p);
                    $col = $('<div>').attr('class', 'col-*').append($div);
                    $('#product-list').append($col);

                }
                $("#numbers a").on('click', function() {
                    var index = $(this).index() + 1;
                    //到這頁總共商品數
                    var gt = lim * index;
                    $("#numbers a").removeClass("active");
                    $(this).addClass("active");
                    //把上一頁的東西清除
                    $('.item').remove();
                    //顯示
                    //這一頁的第一個到最後一個
                    for (var i = gt - lim; i < gt; i++) {
                        $img = $('<img>').addClass("thumb").attr('src', response.data[i].image);
                        $h3 = $('<h3>').addClass("title").text(response.data[i].name);
                        $p = $('<p>').addClass("price").text('NT$' + response.data[i].price);
                        $div = $('<div>').attr('class', 'item').append($img).append($h3).append($p);
                        $col = $('<div>').attr('class', 'col-*').append($div);
                        $('#product-list').append($col);

                    }
                }); //一次全部產生於同一頁
                $("#allthings").on('click', function() { //移除這一頁
                    $('.item').remove();

                    for (var i = 0; i < response.data.length; i++) {
                        $img = $('<img>').addClass("thumb").attr('src', response.data[i].image);
                        $h3 = $('<h3>').addClass("title").text(response.data[i].name);
                        $p = $('<p>').addClass("price").text('NT$' + response.data[i].price);
                        $div = $('<div>').attr('class', 'item').append($img).append($h3).append($p);
                        $col = $('<div>').attr('class', 'col-*').append($div);
                        $('#product-list').append($col);

                    }
                });



            } else {
                $('#message').text('查詢失敗 (' + response.data + ')');
                $('#dialog').modal('show');
            }
        } else {
            $('#message').text('查詢失敗');
            $('#dialog').modal('show');
        }
        console.log(response);
    }, "json");
})