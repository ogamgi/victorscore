//# 공통 변수
const datepickDateFormat = new Array();
datepickDateFormat['ko'] = 'YYYY.MM.DD';
datepickDateFormat['en'] = 'MM/DD/YYYY';
const daysOfWeek = new Array();
daysOfWeek['ko'] = ['일', '월', '화', '수', '목', '금', '토'];
const monthNames = new Array();
monthNames['ko'] = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

//# 로딩 완료
$(window).load(function() {
	setTimeout(function() {
		hideLoading();
	}, 300);
});

$(document).ready(function () {
	//# 라디오 박스
	$('.radio-box input').on('change', function () {
		var name = $(this).attr('name');
		$(this)
			.parent()
			.parent()
			.find('input[name=' + name + ']')
			.each(function () {
				var $parent_li = $(this).parent('li');
				if ($(this).prop('checked') === true) {
					$parent_li.addClass('active');
				} else {
					$parent_li.removeClass('active');
				}
			});
	});

	//# 체크 박스
	$('.check-box input').on('change', function () {
		var $parent_li = $(this).parent();
		if ($(this).prop('checked') === true) {
			$parent_li.addClass('active');
		} else {
			$parent_li.removeClass('active');
		}
	});

	//# 숫자만 입력
	$('.input-number').on('input', function(e) {
		$(this).val($(this).val().replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
		// 길이 제한
		if ($(this).attr('data-size') && ($(this).attr('data-size') <= $(this).val().length)) {
			$(this).val($(this).val().substring(0, $(this).attr('data-size')));
		}
	});

	//# 언어 변경
	$('.lang-toggle-button').off().on('click', function() {
		var lang_type = '';

		$(this).find('h6').each(function() {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
				lang_type = $(this).data('lang_type');
				return true;
			}
		});

		XE.cookie.set('lang_type', lang_type, { path: '/', expires: 3650 });
		location.reload();
	});

	//# 테이블 확장
	$('.table-zone .expand .title').on('click', function() {
		var $this = $(this);
		var is_show = true;

		if ($(this).parent().parent().next('tr').css('display') == 'none') {
			is_show = false;
		}
		
		$(this).parent().parent().nextAll('tr').each(function() {
			if ($(this).hasClass('expand')) {
				return;
			}

			if (is_show) {
				$this.find('.icon').removeClass('xi-angle-up').addClass('xi-angle-down');
				$(this).hide();
			} else {
				$this.find('.icon').removeClass('xi-angle-down').addClass('xi-angle-up');
				$(this).show();
			}
		});
	});

	//# 팝업 닫기
	$('.popup-wrap .popup-close, .popup-wrap .background, .popup-wrap .close-button').on('click', function() {
		$('.popup-wrap').hide();
	});
});

//# 유효성 검사
$.fn.checkValidation = function() {
	var result = {
		is_check: true,
		message: ''
	};

	$.each($(this).find('> ul > li'), function() {
		if ($(this).css('display') == 'none' || $(this).find('.key .require').length == 0) {
			return true;
		}
		
		if ($(this).find('.value .input-box').length > 0 && isEmpty($(this).find('.value .input-box input').val())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .input-box input').focus();
			$('html, body').scrollTop($(this).find('.value .input-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('.value .textarea-box').length > 0 && isEmpty($(this).find('.value .textarea-box textarea').val())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .textarea-box textarea').focus();
			$('html, body').scrollTop($(this).find('.value .textarea-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('.value .select-box').length > 0 && isEmpty($(this).find('.value .select-box option:selected').val())) {
			result.is_check = false;
			result.message = xe.select_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value .select-box select').focus();
			$('html, body').scrollTop($(this).find('.value .select-box').offset().top - xe.top_margin);
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
		} else if ($(this).find('.value .contents-box').length > 0 && !isEmpty(CKEDITOR.instances['editor1']) && isEmpty(CKEDITOR.instances['editor1'].getData())) {
			result.is_check = false;
			result.message = xe.input_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			CKEDITOR.instances['editor1'].focus();
			$('html, body').scrollTop($(this).find('.value .contents-box').offset().top - xe.top_margin);
			return false;
		} else if ($(this).find('.value input[type=email]').length > 0 && !checkEmail($(this).find('.value input[type=email]').val())) {
            result.is_check = false;
			result.message = xe.email_box_message.replace('%s', $(this).find('.key > .text').text().trim());
			$(this).find('.value input[type=email]').focus();
			$('html, body').scrollTop($(this).find('.value input[type=email]').offset().top - xe.top_margin);
			return false;
        } else if ($(this).find('.value .is-checked').length > 0 && $(this).find('.value .is-checked input').val() == 'N') {
			result.is_check = false;
			
			if ($(this).find('.value input[type=password]').length > 0) {
				result.message = xe.msg_password_mismatch;
			} else {
				result.message = xe.is_check_message.replace('%s', $(this).find('.key > .text').text().trim());;
			}

			$(this).find('.value .input-box input').focus();
			$('html, body').scrollTop($(this).find('.value .input-box').offset().top - xe.top_margin);
			return false;
		}
	});

	return result;
}

//# 없는 값 확인
var isEmpty = function(value) {
    if (value == '' || value == null || value == 'null' || value == undefined || value == 'undefined' || (value != null && typeof value == 'object' && !Object.keys(value).length)) return true;
    else return false;
};

//# 폼에서 엔터 막기
function lockEnter() {
	$(document).on('keydown', 'input', function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		};
	});
}

//# 이메일 확인
function checkEmail(str) {
	var checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

	return checkEmail.test(str);
}

//# 비밀번호 확인
function checkPassword(str) {
	var checkPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/;

	return checkPassword.test(str);
}

//# 천단위 콤마
function addComma(str) {
	str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return str; 
}

//# 로딩 표시
function showLoading(show_loading = true) {
	$('#LoadingWrap').fadeIn('fast');
	lockBody();

	if (!show_loading) {
		$('#LoadingWrap .loading-icon').hide();
	} else {
		$('#LoadingWrap .loading-icon').show();
	}
}

function hideLoading() {
	$('#LoadingWrap').fadeOut('fast');
	unlockBody();
}

//# 날짜 계산
//# 일 차이
function getDateDiff(d1, d2) {
	var date1 = new Date(d1);
	var date2 = new Date(d2);

	var diffDate = date1.getTime() - date2.getTime();

	return Math.abs(diffDate / (1000 * 60 * 60 * 24));
}

//# 월 차이
function getMonthDiff(d1, d2) {
	var date1 = new Date(d1);
	var date2 = new Date(d2);

	var diffDate = date1.getTime() - date2.getTime();

	return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24 * 30)));
}
  
//# 연도 차이
function getYearDiff(d1, d2) {
	var date1 = new Date(d1);
	var date2 = new Date(d2);

	var diffDate = date1.getTime() - date2.getTime();

	return Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24 * 365)));
}

//# body 스크롤 막기
var $body_elem = $('html, body');
var $scrollTop;

function lockBody() {
    if (window.pageYOffset) {
        $scrollTop = window.pageYOffset;
    }

    $body_elem.css({
        overflow: 'hidden'
    });
}

function unlockBody() {
    $body_elem.css({
        overflow: ''
    });
    window.scrollTo(0, $scrollTop);
    window.setTimeout(function () {
        $scrollTop = null;
    }, 0);
}