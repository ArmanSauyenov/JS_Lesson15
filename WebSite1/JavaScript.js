//Практика:
//1. Сделать кнопку, по нажатию на которую, аякс запросом загружается форма(отдельный файл).
//В начале всех аякс запросов на странице должна появлятся надпись "загрузка..."
//Учесть, что если отправлено сразу два запроса, плашка должна быть одна.
//После загрузки(с ошибкой или без), надпись "загрузка..." должна удаляться или скрываться.
//В загруженной форме должны быть поля: Имя, Возраст, Дата рождения, Пол
//Имя - текстовое поле от 2 до 15 символов
//Возраст - число от 1 до 99
//Дата рождения - формат d.m.Y(11.12.2018)
//Пол - select с двумя пунктами муж, жен
//На отправку формы сделать проверку введенных данных, $('form').on('submit', fun...)
//Если форма заполнена не верно, должно выходить сообщение "Данные не верны",
//    если форма заполнена верно, то должен отправляться аякс запрос с данными формы.
//Во время отправки именно формы на странице должна появиться надпись "отправка данных"
//    (вместо надписи "загрузка")
//После того как пришел ответ, очистить поля формы.
//При изменение(событие change) поля Имя на сервер должен отправляться запрос с этим именем.

$('#btn1').on('click', function () {
    $('#divcontent').load('form123.html', 'html')
    //xml, json, script, или html

    //$.ajax({
    //    type: 'GET',
    //    data: "name=John&location=Bosto&t=" + (new Date).getTime(),
    //    dataType: 'html',
    //    url: 'form123.html',
    //    // beforeSend: function () {
    //    //     //
    //    // }, 
    //    error: function () {
    //        //
    //    },
    //    dataFilter: function (data) {
    //        // обработка данных data
    //        return data;
    //    },
    //    success: function (data) {
    //        $('#divcontent').html(data)
    //    }
//})
})

$.ajaxSetup({
    timeout: 1000,
    beforeSend: function () {
        $('body').append(
            $('<div>').addClass('ajax-load').html('Загрузка...')
        )
    },
    complete: function () {
        setTimeout(function () {
            $('.ajax-load').remove()
        }, 1000)
    },
    statusCode: {
        403: function () {
            alert('access denied')
        },
        404: function () {
            alert("page not found");
        }
    }
})



$('body').on('submit', 'form', function (e) {
    console.log("1");
    console.log($('input[name="nameinput"]').val());
    var valid = /\S{2,15}/i.test($('input[name="nameinput"]').val()) &&
        /\d{1,2}/i.test($('input[name=ageinput]').val()) && 
        /\d{1,2}\.\d{1,2}\.\d{4}/i.test($('input[name="dobinput"]').val())
    console.log($('input[name="ageinput"]').val());
    console.log($('input[name="dobinput"]').val());
    console.log("12");
    if (valid) {
        $.post('form123.html', $('form').serialize(), function (data) {
            console.log("123");
        })
    }
    else {
        alert("Неверные данные");
    }
    return false;
})



//проверить существует ли объект с ID "content"
if ($('#content').length) {
    //объект есть
}