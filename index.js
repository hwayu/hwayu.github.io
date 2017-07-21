$('button').on('click', function() {

    var m = $('#mom').val()

    var d = $('#dad').val()

    m = Number(m)

    d = Number(d)

    bmi = (m + d + 12) / 2

    $('#result').val(bmi)
})