var leftswap = document.getElementById("left_swap");
var rightswap = document.getElementById("right_swap");
let left_path = document.getElementById("left_path");
let right_path = document.getElementById("right_path");
let checkbox = document.getElementById("form__buttons-access");
let form_input_name = $("#input_name");
let form_input_phone = $("#input_phone");
let numcards = 3;
let cards = $(".review__card");
const mediaQuery_twocard = window.matchMedia('(max-width: 768px)');
const mediaQuery_onecard = window.matchMedia('(max-width: 375px)');
function handleMediaQueryChange(mediaQuery) {
    console.log(window.innerWidth)
    if (mediaQuery.matches) {
        if (mediaQuery == mediaQuery_onecard) {
            numcards = 1;
            for (let i = 1; i < cards.length; i++) {
                $(cards[i]).addClass("hidden_card");
            }
        } else if (mediaQuery == mediaQuery_twocard) {
            numcards = 2;
            for (let i = 0; i < cards.length; i++) {
                if (i < 2) {
                    $(cards[i]).removeClass("hidden_card");
                } else {
                    $(cards[i]).addClass("hidden_card");
                }
            }
        }
    }
}
mediaQuery_twocard.addListener(handleMediaQueryChange);
mediaQuery_onecard.addListener(handleMediaQueryChange);

handleMediaQueryChange(mediaQuery_twocard);
handleMediaQueryChange(mediaQuery_onecard);
jQuery(function ($) {
    form_input_phone.mask("+7 (999) 999-99-99");
    form_input_phone.attr('pattern', '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}');
});
form_input_name.on('keypress', function (event) {
    var regex = /^[а-яА-ЯёЁ\s]+$/;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false;
    }
});
form_input_name.on('blur', function () {
    if ($(this).val() == '') {
        form_input_name.css('padding', '16px');
        form_input_name.css('background', '#f6f8fa');
        form_input_name.css('border', "none");
        form_input_name.parent().children(".form__inputs_name_container_text").addClass("hidden");
    }
});
form_input_phone.on('blur', function () {
    if ($(this).val() == "+7 (___) ___-__-__") {
        form_input_phone.css('padding', '16px');
        form_input_phone.css('background', '#f6f8fa');
        form_input_phone.css('border', "none");
        form_input_phone.parent().children(".form__inputs_phone_container_text").addClass("hidden");
    }
});
form_input_phone.on('focus', function () {
    form_input_phone.css('padding', '28px 51px 4px 16px');
    form_input_phone.css('background', '#FFF');
    form_input_phone.css('border', "2px solid  #C2C8CD");
    form_input_phone.css('border-radius', "4px");
    form_input_phone.parent().children(".form__inputs_phone_container_text").removeClass("hidden")
})
form_input_name.on('focus', function () {
    form_input_name.css('padding', '28px 51px 4px 16px');
    form_input_name.css('background', '#FFF');
    form_input_name.css('border', "2px solid  #C2C8CD");
    form_input_name.css('border-radius', "4px");
    form_input_name.parent().children(".form__inputs_name_container_text").removeClass("hidden")
})
let header = $(".header");
(function paggination() {
    let cards = $(".review__card");
    let paggination = $(".paggination");
    let paggitems = "";
    for (let i = 0; i < cards.length - numcards + 1; i++) {
        if (i == 0) {
            paggitems += `<circle class="button_pagination" cx="${4 + i * 25}" cy="4" r="4" fill="#2A6CEA" />`;
        } else {
            paggitems += `<circle class="button_pagination" cx="${4 + i * 25}" cy="4" r="4" fill="#C2C8CD" />`;
        }
    }
    paggination.html(paggitems);
})()

function recolorpath() {
    if ($(".review__card:not(.hidden_card):first").nextAll(".review__card.hidden_card:first").length > 0) {
        right_path.setAttribute("fill", "#2A6CEA");
    } else {
        right_path.setAttribute("fill", "#C2C8CD");
    }
    if ($(".review__card:not(.hidden_card):last").prevAll(".review__card.hidden_card:first").length > 0) {
        left_path.setAttribute("fill", "#2A6CEA");
    } else {
        left_path.setAttribute("fill", "#C2C8CD");
    }
}
function recolorpaggplus() {
    let paggination = $(".paggination");
    let indexpag = paggination.find('[fill="#2A6CEA"]').index();
    let asd = paggination.find('[fill="#2A6CEA"]');
    asd.attr("fill", "#C2C8CD");
    paggination.children().eq(indexpag + 1).attr("fill", "#2A6CEA");
}
function recolorpaggminus() {
    let paggination = $(".paggination");
    let indexpag = paggination.find('[fill="#2A6CEA"]').index();
    let asd = paggination.find('[fill="#2A6CEA"]');
    asd.attr("fill", "#C2C8CD");
    paggination.children().eq(indexpag - 1).attr("fill", "#2A6CEA");
}
function swapleft() {
    let lastVisible = $(".review__card:not(.hidden_card):last");
    let nextHidden = lastVisible.prevAll(".review__card.hidden_card:first");
    if (nextHidden.length > 0) {
        lastVisible.addClass("hidden_card");
        nextHidden.removeClass("hidden_card");
        recolorpath();
        recolorpath()
        recolorpaggminus();
    } else {
        left_path.setAttribute("fill", "#C2C8CD");
    }
}
function swapright() {
    var firstVisible = $(".review__card:not(.hidden_card):first");
    var nextHidden = firstVisible.nextAll(".review__card.hidden_card:first");
    if (nextHidden.length > 0) {
        nextHidden.removeClass("hidden_card");
        firstVisible.addClass("hidden_card");
        recolorpath()
        recolorpaggplus();
    } else {
        right_path.setAttribute("fill", "#C2C8CD");
    }
}
leftswap.addEventListener("click", () => {
    swapleft()
})
rightswap.addEventListener("click", () => {
    swapright()
})
var answerisshowen = "<circle cx=\"12\" cy=\"12\" r=\"11\" stroke=\"#191C1F\" stroke-width=\"2\" /> <path d = \"M16.2426 14.8286L13.4142 12.0002L16.2426 9.17175C16.4302 8.98421 16.5355 8.72986 16.5355 8.46464C16.5355 8.19942 16.4302 7.94507 16.2426 7.75753C16.0551 7.57 15.8008 7.46464 15.5355 7.46464C15.2703 7.46464 15.016 7.57 14.8284 7.75753L12 10.586L9.17157 7.75753C8.98404 7.57 8.72968 7.46464 8.46447 7.46464C8.19925 7.46464 7.9449 7.57 7.75736 7.75753C7.56982 7.94507 7.46447 8.19942 7.46447 8.46464C7.46447 8.72986 7.56982 8.98421 7.75736 9.17175L10.5858 12.0002L7.75736 14.8286C7.56982 15.0161 7.46447 15.2705 7.46447 15.5357C7.46447 15.8009 7.56982 16.0553 7.75736 16.2428C7.9449 16.4304 8.19925 16.5357 8.46447 16.5357C8.72968 16.5357 8.98404 16.4304 9.17157 16.2428L12 13.4144L14.8284 16.2428C15.016 16.4304 15.2703 16.5357 15.5355 16.5357C15.8008 16.5357 16.0551 16.4304 16.2426 16.2428C16.4302 16.0553 16.5355 15.8009 16.5355 15.5357C16.5355 15.2705 16.4302 15.0161 16.2426 14.8286Z\"fill = \"#191C1F\" /> ";
var answerisclose = "<circle cx=\"12\" cy=\"12\" r=\"11\" stroke=\"#191C1F\" stroke-width=\"2\" /> <path d=\"M17 11H13V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11Z\" fill=\"#191C1F\" />"
var showanswer = document.querySelectorAll("#questions__card_show");
showanswer.forEach(function (svgElement) {
    svgElement.addEventListener("click", function (event) {
        let svg = $(event.target).closest("svg");
        let answer = svg.parent().parent().children(".questions__card_answer");
        if (answer.hasClass("hidden_ans")) {
            answer.removeClass("hidden_ans");
            $(svg).html(answerisshowen);
        } else {
            answer.addClass("hidden_ans");
            $(svg).html(answerisclose);
        }
    })
});


checkbox.addEventListener("change", function () {
    if (this.checked) {
        $(".form__buttons_label").html("Я соглашаюсь");
    } else {
        $(".form__buttons_label").html("Я отказываюсь");
    }
});
window.onscroll = () => {
    if (window.pageYOffset > 50) {
        header.addClass("header_active");
    } else {
        header.removeClass("header_active");
    }
};

function validateFunc(event) {
    event.preventDefault();
    let form_input_name = document.getElementById("input_name");
    let form_input_phone = document.getElementById("input_phone");
    let wrong_name_input = $(".form__inputs_name_container_wrong");
    let validator = true;
    if (form_input_name.value === "") {
        $(".form__inputs_name_container_wrong")[0].classList.remove("hidden");
        $(".form__inputs_name_container_correct")[0].classList.add("hidden");
        form_input_name.classList.add("wrong_input");
        validator = false;
    } else {
        $(".form__inputs_name_container_wrong")[0].classList.add("hidden");
        $(".form__inputs_name_container_correct")[0].classList.remove("hidden");
        form_input_name.classList.remove("wrong_input");
    }
    if (form_input_phone.value === "") {
        $(".form__inputs_phone_container_wrong")[0].classList.remove("hidden");
        $(".form__inputs_phone_container_correct")[0].classList.add("hidden");
        form_input_phone.classList.add("wrong_input");
        validator = false;
    }
    else {
        $(".form__inputs_phone_container_wrong")[0].classList.add("hidden");
        $(".form__inputs_phone_container_correct")[0].classList.remove("hidden");
        form_input_phone.classList.remove("wrong_input");
    }
    if (document.querySelector('input[class="form__buttons-access"]:checked') === null) {
        $(".form__buttons_data-access-span").addClass("wrong_checkbox");
    } else {
        $(".form__buttons_data-access-span").removeClass("wrong_checkbox");
    }
}


$(document).ready(function () {
    // При клике на кнопку "Открыть модальное окно"
    $(".burger_menu_header").click(function () {
        // Показываем модальное окно
        $(".header__modal").show();
    });
    $(".header__modal_cross").click(function () {
        $(".header__modal").hide();
    });
    $(".header__modal_nav_link").click(function () {
        $(".header__modal").hide();
    });

});


