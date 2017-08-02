$('button').on('click', function() {

    var m = $('#mom').val()

    var d = $('#dad').val()

    m = Number(m)

    d = Number(d)
        //男孩計算公式
    bmi = (m + d + 12) / 2
        //女孩計算公式
    bmi2 = (m + d - 12) / 2
    if ($('#male').is(':checked')) { $('#result').val(bmi); } else if ($('#female').is(':checked')) {
        $('#result').val(bmi2);
    } else {
        alert("請選擇性別");
    }
});