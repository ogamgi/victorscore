var $ = jQuery;

$(document).ready(function() {
    //# 이미지 크게 보기
    if ($('.image-popup-vertical-fit').length > 0) {
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });
    }
});

//# 파일 업로드
$(document).on('change', '.file_image', function() {
    var disp_image = $(this).prevAll('.disp_image');
    var path_image = $(this).prevAll('.path_image');
    var state_image = $(this).prevAll('.state_image');

    state_image.val('UPDATE');

    if(disp_image.length > 0)
    {
        disp_image.hide();
    }
});

$(document).on('click', '.delete_image', function() {
    var disp_image = $(this).prevAll('.disp_image');
    var state_image = $(this).prevAll('.state_image');
    
    state_image.val('DELETE');

    if(disp_image.length > 0)
    {
        disp_image.hide();
    }
});

$(document).on('click', '.reset_image', function() {
    var disp_image = $(this).prevAll('.disp_image');
    var state_image = $(this).prevAll('.state_image');

    state_image.val('');

    if(disp_image.length > 0)
    {
        disp_image.show();
    }
});

//# 유효성 검사
$.fn.checkValidation = function() {
    xe.input_box_message = '%s을(를) 입력해주세요.';
    xe.select_box_message = '%s을(를) 선택해주세요.';
    xe.email_box_message = '%s의 값은 올바른 이메일 주소가 아닙니다.';

	var result = {
		is_check: true,
		message: ''
	};

	$.each($(this).find('tr'), function() {
        if ($(this).find('th .require').length == 0) {
			return true;
		}

		if ($(this).find('td .input_box').length > 0 && isEmpty($(this).find('td .input_box').val())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('th .label').text().trim());
			$(this).find('td .input_box').focus();
			$('html, body').scrollTop($(this).find('td .input_box').offset().top);
			return false;
		} else if ($(this).find('.value .textarea-box').length > 0 && isEmpty($(this).find('.value .textarea-box textarea').val())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .textarea-box textarea').focus();
			$('html, body').scrollTop($(this).find('.value .textarea-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('td .select_box').length > 0 && isEmpty($(this).find('td .select_box option:selected').val())) {
			result.is_check = false;
			result.message = xe.select_box_message.replace('%s', $(this).find('th .label').text().trim());
			$(this).find('td .select_box').focus();
			$('html, body').scrollTop($(this).find('td .select_box').offset().top);
			return false;
		} else if ($(this).find('.value .check-box').length > 0 && $(this).find('.value .check-box input:checked').length == 0) {
			result.is_check = false;
			result.message = xe.check_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .check-box input').focus();
			$('html, body').scrollTop($(this).find('.value .check-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('.value .radio-box').length > 0 && isEmpty($(this).find('.value .radio-box input:checked').val())) {
			result.is_check = false;
			result.message = xe.radio_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .radio-box input').focus();
			$('html, body').scrollTop($(this).find('.value .radio-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('.value .content-box').length > 0 && !isEmpty(CKEDITOR.instances['editor1']) && isEmpty(CKEDITOR.instances['editor1'].getData())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			CKEDITOR.instances['editor1'].focus();
			$('html, body').scrollTop($(this).find('.value .content-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('td input[type=email]').length > 0 && !checkEmail($(this).find('td input[type=email]').val())) {
            result.is_check = false;
			result.message = xe.email_box_message.replace('%s', $(this).find('th .label').text().trim());
			$(this).find('td input[type=email]').focus();
			$('html, body').scrollTop($(this).find('td input[type=email]').offset().top);
			return false;
        }
	});

	return result;
}

//# 저장폼 Submit
$(document).on('click', '.save_button', function() {
    if ($(this).hasClass('disabled')) {
        return false;
    }

    if (!confirm('저장 하시겠습니까？')) {
        return false;
    }

    var form = $(this).data('form');
    var validation = $(form).checkValidation();
    // console.log(validation);
    if (!validation.is_check) {
        alert(validation.message);
        return false;
    }

    $(this).addClass('disabled');
    $(form).submit();
});

//# 삭제폼 Submit
$(document).on('click', '.delete_button', function() {
    if ($(this).hasClass('disabled')) {
        return false;
    }

    if (!confirm('삭제 하시겠습니까？')) {
        return false;
    }

    var form = $(this).data('form');
    var delete_key = $(this).data('key');

    if ($(this).hasClass('selected')) {
        var checkbox = $(this).data('checkbox');
        var selected_cart = new Array();

        $.each($(checkbox).find('input[name=cart]'), function() {
            if ($(this).is(':checked')) {
                selected_cart.push($(this).val());
            }
        });

        if (selected_cart.length == 0) {
            alert('선택된 내역이 없습니다.');
            return false;
        }

        var selected_cart_join = selected_cart.join(',');

        $(form).find('input[name=' + delete_key + ']').val(selected_cart_join);
    } else {
        var delete_value = $(this).data(delete_key);

        $(form).find('input[name=' + delete_key + ']').val(delete_value);
    }

    $(this).addClass('disabled');
    $(form).submit();
});

//# 없는 값 확인
var isEmpty = function(value) {
    if (value == "" || value == null || value == 'null' || value == undefined || value == 'undefined' || (value != null && typeof value == "object" && !Object.keys(value).length)) return true;
    else return false;
};

//# 이메일 확인
function checkEmail(str) {
	var checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

	return checkEmail.test(str);
}
