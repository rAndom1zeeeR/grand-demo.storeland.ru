///////////////////////////////////////
/// Общие функции ///
///////////////////////////////////////

// Текущее состояние CapsLock
var capsLockEnabled=null;function getChar(a){if(a.which==null){if(a.keyCode<32){return null}return String.fromCharCode(a.keyCode)}if(a.which!=0&&a.charCode!=0){if(a.which<32){return null}return String.fromCharCode(a.which)}return null}if(navigator.platform.substr(0,3)!="Mac"){document.onkeydown=function(a){a=a||event;if(a.keyCode==20&&capsLockEnabled!==null){capsLockEnabled=!capsLockEnabled}}}document.onkeypress=function(b){b=b||event;var a=getChar(b);if(!a){return}if(a.toLowerCase()==a.toUpperCase()){return}capsLockEnabled=(a.toLowerCase()==a&&b.shiftKey)||(a.toUpperCase()==a&&!b.shiftKey)};function checkCapsWarning(){document.getElementById("capslock").style.display=capsLockEnabled?"block":"none"}
function removeCapsWarning(){document.getElementById("capslock").style.display="none"};

// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}
// Установка cookie файлов на основном домене магазина, в случае если покупатель зашёл на другой домен магазина, например по старой ссылке
try{$(document).ajaxSuccess(function(i,l,h){try{if(typeof(h.data)!="undefined"&&-1<h.data.indexOf("ajax_q=1")){var d=$.parseJSON(l.responseText);if(null!=d&&typeof(d.setcookie)=="object"){for(var g in d.setcookie){var c=document.createElement("script");c.type="text/javascript";c.async=typeof(d.status)=="undefined"||d.status=="reload"?true:false;c.src=d.setcookie[g];var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f);}}}}catch(j){}});}catch(e){}

// Функция определения ширины экрана пользователя
function getClientWidth() {
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

// Функция определения браузера
function userAgent(){
  var ua = detect.parse(navigator.userAgent);
  $('body').addClass(ua.browser.family);
}

// Добавляет пробел 1000 -> 1 000  /  10000 -> 10 000
function addSpaces(nStr){
  nStr = String(nStr)
	return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

// Отправляет ошибку на сервер, для того чтобы служба тех поддержки могла разобраться в проблеме как можно быстрее.
function sendError (desc, page, line) {
  var img=document.createElement('img');
  img.src = 'https://storeland.ru/error/js?desc='+encodeURIComponent(desc)+'&page='+encodeURIComponent(window.location)+'&line=0';
  img.style.position = 'absolute';
  img.style.top = '-9999px';
  try { document.getElementsByTagName('head').appendChild(img) } catch (e){}
  return false;
}

///////////////////////////////////////
// Превращает поле пароля в текстовое поле и обратно
// @LinkObject - ссылка по которой кликнули
// @InputObject - объект у которого нужно изменить тип поля
function ChangePasswordFieldType (LinkObject, InputObject) {
  var
    // Ссылка по которой кликнули
    LObject = $(LinkObject),
    // Объект у которого изменяем тип с password на text
    IObject = $(InputObject)
    // Старый текст ссылки
    txtOld = LObject.text(),
    // Новый текст ссылки
    txtNew = LObject.attr('rel');
  // Если объекты не получены, завершим работу функции
  if( LObject.length==0 || IObject.length==0 ) {
    return false;
  }
  // Изменяем у ссылки текст со старого на новый
  LObject.html(txtNew);
  // Старый текст ссылки сохраняем в атрибуте rel
  LObject.attr('rel', txtOld);
  // Изменяем тип input поля
  if(IObject[0].type == 'text') {
    IObject[0].type = 'password';
  } else {
    IObject[0].type = 'text';
  }
}

// Показать пароль
function showPass() {
  $('.form__showPass').on('click', function(event){
		var LinkObject = $(this).find('.showPass')
		var InputObject = $(this).parent().find('.sites_client_pass');
    ChangePasswordFieldType(LinkObject, InputObject);
    $(this).toggleClass('active')
    return false;
  });
}

// Наверх
function toTop() {
  $(".toTop").hide();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('.toTop').fadeIn();
    } else {
      $('.toTop').fadeOut();
    }
  });
  $('.toTop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
}


///////////////////////////////////////
// Уведомления
///////////////////////////////////////
function notyStart(text, type) {
  new Noty({
    text: text,
    layout: "bottomCenter",
    type: type,
    theme: "",
    textAlign: "center",
    animation: {
      open: 'animated fadeInUp',
      close: 'animated fadeOutDown',
      easing: 'swing',
      speed: 400
    },
    timeout: "2000",
    progressBar: true,
    closable: true,
    closeOnSelfClick: true,
    modal: false,
    dismissQueue: false,
    onClose: true,
    killer: false
  }).show();
}

// Предзагрузчик
function preload() {
  var preloader = $('.preloader');
  var spinner = preloader.find('.preloading');
  spinner.fadeOut();
  preloader.delay(1000).fadeOut('slow');
}


///////////////////////////////////////
// Дополнительные пункты меню в шапке Перенос пунктов меню
///////////////////////////////////////
function mainnav(id,rows,media){
	if(getClientWidth() > media){
		var mainnav = $(id);
		var overMenuExist = mainnav.find('.mainnav__overflow li').length;
		// Восстановление классов для больших экранов
		$('.mainnav__overflow').addClass('dropdown__content');
		$('.mainnav__more').show();
		if(overMenuExist){
			mainnav.find('.mainnav__overflow li').removeClass('mainnav__replaced');
			mainnav.find('.mainnav__more').remove();
			mainnav.find('.mainnav__overflow li').each(function(){
				mainnav.find('.mainnav__list').append($(this));
			});
		}
		var menuHeight = rows;
		var menuWidth = mainnav.width() * menuHeight;
		var menuCount = mainnav.find('.mainnav__list li').length + 1;
		var nextCheck = 0;
		for(var i=1; i < menuCount;  i++){
			var currentWidth = parseInt(Math.ceil(mainnav.find('.mainnav__list li:nth-child('+i+')').width())) + 16;
			nextCheck += currentWidth;
			if(nextCheck > menuWidth){
				var a = i;
				for(a;a < menuCount;a++){
					mainnav.find('.mainnav__list li:nth-child('+ a +')').addClass('mainnav__replaced');
				}
				mainnav.find('.mainnav__replaced').each(function(){
					mainnav.find('.mainnav__overflow').append($(this));
				});
				mainnav.find('.mainnav__list').append('<li class="mainnav__more"><a class="mainnav__link flex"><span>Ещё</span><i class="icon-chevron_down"></i></a></li>');
				mainnav.find('.mainnav__more').on('click',function(){
					if($(this).hasClass('opened')){
						$(this).removeClass('opened');
						mainnav.removeClass('opened');
						mainnav.find('.mainnav__overflow').removeClass('opened');
						$('#overlay').removeClass('opened');
					} else{
						$(this).addClass('opened');
						mainnav.addClass('opened');
						mainnav.find('.mainnav__overflow').addClass('opened');
						$('#overlay').addClass('opened')
					}
					// Определение положения кнопки еще
					positionMore()
				});
				
				// Определение положения кнопки еще
				function positionMore(){
					var morePos = mainnav.find('.mainnav__more').position().left;
					var contentPos = parseInt(morePos) - mainnav.find('.mainnav__overflow').width() / 4;
					mainnav.find('.mainnav__overflow').css({'left' : contentPos})
				}

				return false;
			}
		}
	}else{
		// Удаление классов для маленьких экранов
		$('.mainnav__overflow').removeClass('dropdown__content');
		$('.mainnav__more').hide();
	}
}


///////////////////////////////////////
// Сравнение товаров
///////////////////////////////////////
function compare() {

	var swiper = new Swiper('.compare__line',{
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		slidesPerView: 4,
		spaceBetween: 16,
		simulateTouch: false,
		grabCursor: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '2',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '3',
			},
			768: {
				slidesPerView: '3',
			},
			1024: {
				slidesPerView: '4',
			},
			1200: {
				slidesPerView: '4',
			}
		},

	})

	// Сравнение товаров. Отображение всех и различающихся характеристик товара
	$('.compare__switch').on('click', function(){
		$(this).toggleClass('switch-on');
		var txtHide = $(this).find('.compare__switch-label').data('hide');
		var txtShow = $(this).find('.compare__switch-label').data('show');
		if ($(this).hasClass('switch-on')) {
			$(this).find('.compare__switch-label').text(txtHide)
			$('.compare__line:not(.same)').show();
			$('.compare__line.same').hide();
		} else {
			$(this).find('.compare__switch-label').text(txtShow)
			$('.compare__line:hidden').show();
		}
	});

	// Сравнение товаров. Скрытие характеристик товара, которые выделил пользователь
  $('.compare__selected').on('click', function(){
    $('.compare__showAll').css({'display' : 'inline-block'});
    $('.compare__line').each(function(){
      var сheckedCheckbox = $(this).find('.compare__cell input:checked');
      if(сheckedCheckbox.length>0) {
        $(this).hide();
      }
    });
    // отменяем выделение характеристик товаров
    $('.compare__cell input').attr('checked', false);
    return false;
  });

	// Сравнение товаров. Отображение скрытых характеристик товара
  $('.compare__showAll').on('click', function(){
    $(this).hide();
    $('.compare__line:hidden').show();
    return false;
  });
}


///////////////////////////////////////
// Функция подгрузки товаров ajax при скроле
///////////////////////////////////////
function ajaxProducts() {
	var pages = $('.pages');
	var status = $('.pages__ajax');

	if(pages.length && status.length){
		// Функция загрузки товаров со след страницы
		function loadItems(){
			var url = pages.find('.next a').attr('href');
			// Проверяем наличие след страницы
			if(url){
				// console.log('get goods from url', url)
				$.ajax({
					url:url + '&only_body=1',
					cache:false,
					dataType: 'html',
					success:function(data){
						// Получаем товары
						var items = $(data).find('.products__ajax').html();
						// Добавляем товары
						$('.products__ajax').append(items)
						// Обновляем изображение подргуженных товаров
						$('.products__ajax .product__item').each(function(){
							$(this).find('img').attr('src', $(this).find('img').data('src'))
						})
						priceDiff('.products__ajax .product__item', 'percent');
						// Обновляем навигацию
						pages.html($(data).find('.pages').html())
						$('.pages__onPage').text($('.products__ajax .product__item:visible').length);
					}
				})
			}else{
				console.log('Загружены все товары')
				return false;
			}
		}

		// Проверка положения нижней границы контейнера
		function checkPosition() {
			var coords = $(".products__container")[0].getBoundingClientRect();
			var windowHeight = document.documentElement.clientHeight;
			// нижний край элемента виден?
			var bottomVisible = coords.bottom < windowHeight && coords.bottom > 100;
			return bottomVisible
		}

		// обрабатываем скролл на всей странице
		function throttle(func, limit){
			var lastFunc;
			var lastRan;
			return function(){
				var context = this;
				var args = arguments;
				if (!lastRan){
					func.apply(context, args);
					lastRan = Date.now();
				} else {
					clearTimeout(lastFunc);
					lastFunc = setTimeout(function(){
						if((Date.now() - lastRan) >= limit) {
							func.apply(context, args);
							lastRan = Date.now();
						}
					}, limit - (Date.now() - lastRan));
				}
			}
		}
		
		// код будет срабатывать раз в 1 секунду
		document.addEventListener('scroll', throttle(function() {
			if(checkPosition()){
				console.log('loadItems')
				return loadItems();
			} else {
				return false;
			}
		}, 1000));

	}

}


///////////////////////////////////////
// Разница в цене в процентах %
///////////////////////////////////////
function priceDiff(obj,type) {
	$(obj).each(function(){
		if($(this).find('.price__old')){
			var old = parseFloat($(this).find('.price__old .num').text().replace(' ',''));
			var now = parseFloat($(this).find('.price__now .num').text().replace(' ',''));
			var diff = 0;
			if (type == 'percent') {
				diffPercent = (((old - now)/old)*100).toFixed();
				$(this).find('.ico__sales').text('-' + diffPercent + '%');
			} else {
				diff = (old - now).toFixed();
				$(this).find('.ico__sales .num').text(addSpaces(diff));
			}
		}else{
			$(this).find('.ico__sales').hide();
		}
	});
}


///////////////////////////////////////
// Много и Мало вместо точного количества
///////////////////////////////////////
function goodsModRest() {
	$('.goodsModRestValue').each(function(){
		var value = $(this).attr('data-value');
		if (value > 0 && value < 11) {
			$(this).text('В наличии мало');
			$(this).css('opacity', '1');
			$(this).parent().removeClass('alot').removeClass('zero');
			$(this).parent().addClass('few');
		}else if (value > 10) {
			$(this).text('В наличии много');
			$(this).css('opacity', '1');
			$(this).parent().removeClass('few').removeClass('zero');
			$(this).parent().addClass('alot');
		}else if (value == 0) {
			$(this).text('Нет в наличии');
			$(this).css('opacity', '1');
			$(this).parent().removeClass('few').removeClass('zero');
			$(this).parent().addClass('zero');
		}
	});
}


///////////////////////////////////////
// Добавление в сравнение и Сохраненное
///////////////////////////////////////
function addTo() {
	// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-compare').off('click').on('click', function(){
		// Объект ссылки, по которой кликнули
		var
			a = $(this)
			isAdd = a.attr('data-action-is-add'),
			addUrl = a.attr('data-action-add-url'),
			delUrl = a.attr('data-action-delete-url'),
			addTitle = a.attr('data-action-add-title'),
			delTitle = a.attr('data-action-delete-title'),
			pageUrl = a.attr('data-action-url'),
			pName = a.attr('data-prodname'),
			pUrl = a.attr('data-produrl'),
			pImg = a.attr('data-prodimg'),
			pDataid = a.attr('data-id'),
			pDataPrice = a.attr('data-mod-price'),
			pDataChar = a.attr('data-char-code'),
			pDataMod = a.attr('data-mod-id'),
			aText = a.find('span'),
			addTooltip = a.attr('data-add-tooltip'),
			delTooltip = a.attr('data-del-tooltip'),
			requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__compare .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						if($('.addto__compare').length){
							$('.addto__compare .addto__items').prepend('' +
								'<div class="addto__item flex" data-id="'+ pDataid +'">' +
									'<a class="addto__image flex-center" href="'+ pUrl +'" title="'+ pName +'"><img src="'+ pImg +'" /></a>' +
									'<div class="addto__content">' +
										'<a class="addto__name" href="'+ pUrl +'" title="'+ pName +'"><span>'+ pName +'</span></a>' +
										'<div class="addto__price '+ pDataChar +'">' +
											'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span> <span>р.</span></span></div>' +
										'</div>' +
										'<div class="addto__actions">' +
											'<a class="addto__remove button-rotate button-link" href="'+ delUrl +'?id='+ pDataid +'" data-id="'+ pDataid +'" title="Убрать товар из списка сравнения" onclick="removeFromCompare($(this))"><i class="icon-close"></i></a>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'');
						}
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
								from = addUrl,
								to = delUrl,
								newIsAddStatus = 0,
								newTitle = delTitle ? delTitle : '',
								newTooltip = delTooltip ? delTooltip : '';
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
								from = delUrl,
								to = addUrl,
								newIsAddStatus = 1,
								newTitle = addTitle ? addTitle : '',
								newTooltip = addTooltip ? addTooltip : '';
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.compare_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-compare');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.compare_goods_count);
								$('.count-compare').attr('data-count', data.compare_goods_count);
								if(data.compare_goods_count > 0){
									$('.compare').addClass("has-items");
								}else{
									$('.compare').removeClass("has-items");
									$('.count-compare').attr('data-count', '0').text("0");
									$('.add-compare').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
							.attr('title', newTitle)
							.attr('data-tooltip', newTooltip)
							.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						if(aText.length) {
						 aText.text(a.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'));
						}

						// Меняем заголовок уведомления
						if (data.message.indexOf("добавлен") != -1) {
							var msg = 'Успешно добавлен!'
						} else {
							var msg = 'Успешно удалён!'
						}

						// Скилет уведомления
						var content = '<div class="noty__addto"><div class="noty__title">'+ msg +'</div><div class="noty__message">'+ data.message + '</div><div class="noty__buttons"><a class="button-primary" href="/compare" title="В сравнение"><span>Перейти в сравнение</span></a></div></div>'
						
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: content,
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						var content = '<div class="noty__addto"><div class="noty__title">Ошибка!</div><div class="noty__message">'+ data.message + '</div><div class="noty__buttons"><a class="button-primary" href="/compare" title="В сравнение"><span>Перейти в сравнение</span></a></div></div>'
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: content,
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});

	// Добавление/удаление товара на сравнение/Сохраненное через ajax
	$('.add-favorites').off('click').on('click', function(){
		// Объект ссылки, по которой кликнули
		var
			a = $(this)
			isAdd = a.attr('data-action-is-add'),
			addUrl = a.attr('data-action-add-url'),
			delUrl = a.attr('data-action-delete-url'),
			addTitle = a.attr('data-action-add-title'),
			delTitle = a.attr('data-action-delete-title'),
			pageUrl = a.attr('data-action-url'),
			pName = a.attr('data-prodname'),
			pUrl = a.attr('data-produrl'),
			pImg = a.attr('data-prodimg'),
			pDataid = a.attr('data-id'),
			pDataPrice = a.attr('data-mod-price'),
			pDataChar = a.attr('data-char-code'),
			pDataMod = a.attr('data-mod-id'),
			aText = a.find('span'),
			addTooltip = a.attr('data-add-tooltip'),
			delTooltip = a.attr('data-del-tooltip'),
			requestUrl = a.attr('href');

		var atl = $(this).closest('.product__links');
		var atlS = $(this).closest('.product__shop');
		var flag = 0;

		$('.addto__favorites .addto__item').each(function(){
			if($(this).attr('data-id') == pDataid){
				flag = 1;
			}
			if(flag == 1){
				$(this).remove();
				return false;
			}
			return flag;
		});

		// Если в ссылке присутствует идентификатор, который мы можем узнать только вытащив его с текущей страницы
		if( /GET_GOODS_MOD_ID_FROM_PAGE/.test(requestUrl)) {
			requestUrl = requestUrl.replace(new RegExp('GET_GOODS_MOD_ID_FROM_PAGE'), $('.goodsModificationId').val());
		}

		// Если есть информация о том какие URL адреса будут изменены, то можено не перегружать страницу и сделать запрос через ajax
		if(addUrl && delUrl) {
			$.ajax({
				type : "POST",
				dataType: 'json',
				cache : false,
				url : requestUrl,
				data : {
					'ajax_q': 1
				},
				success: function(data) {
					if(flag == 0){
						$('.addto__favorites .addto__items').prepend('' +
							'<div class="addto__item flex" data-id="'+ pDataid +'">' +
								'<a class="addto__image flex-center" href="'+ pUrl +'" title="'+ pName +'"><img src="'+ pImg +'" /></a>' +
								'<div class="addto__content">' +
									'<a class="addto__name" href="'+ pUrl +'" title="'+ pName +'"><span>'+ pName +'</span></a>' +
									'<div class="addto__price '+ pDataChar +'">' +
										'<div class="price__now"><span title="'+ pDataPrice +' российских рублей"><span class="num">'+ pDataPrice +'</span></div>' +
									'</div>' +
									'<div class="addto__actions">' +
										'<a class="addto__remove button-rotate button-link" href="'+ delUrl +'?id='+ pDataid +'" data-id="'+ pDataid +'" title="Убрать товар из списка избранного" onclick="removeFromFavorites($(this))"><i class="icon-close"></i></a>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'');
					}
					if('ok' == data.status) {
						if(isAdd == 1) {
							var
								from = addUrl,
								to = delUrl
								newIsAddStatus = 0,
								newTitle = delTitle ? delTitle : '',
								newTooltip = delTooltip ? delTooltip : '';
							a.addClass('added');
							atl.addClass('added');
							atlS.addClass('added');
						} else {
							var
								from = delUrl,
								to = addUrl,
								newIsAddStatus = 1,
								newTitle = addTitle ? addTitle : '',
								newTooltip = addTooltip ? addTooltip : '';
							a.removeClass('added');
							atl.removeClass('added');
							atlS.removeClass('added');
						}

						// Если указано, что изменилось число товаров на сравнении
						if(typeof(data.favorites_goods_count) != 'undefined') {
							// Блок информации о том, что есть товары на сравнении
							var sidecount = $('.count-favorites');
							// Если на сравнении больше нет товаров
							// Указываем информацию о новом количестве товаров на сравнении
							// Блок обновления списка сравнения в каталога
							sidecount.animate({opacity: 0,display: "none"},500,function(){
								sidecount.text(data.favorites_goods_count);
								$('.count-favorites').attr('data-count', data.favorites_goods_count);
								if(data.favorites_goods_count > 0){
									$('.favorites').addClass("has-items");
								}else{
									$('.favorites').removeClass("has-items");
									$('.count-favorites').attr('data-count', '0').text("0");
									$('.add-favorites').removeAttr("title").removeClass("added");
								}
							}).animate({display: "inline",opacity: 1} , 500 );
						}

						// Обновляем ссылку, на которую будет уходить запрос и информацию о ней
						a.attr('href', a.attr('href').replace(new RegExp(from), to))
							.attr('title', newTitle)
							.attr('data-tooltip', newTooltip)
							.attr('data-action-is-add', newIsAddStatus);

						// Если рядом с ссылкой в виде круга есть текстовая надпись с описанием действия
						if(aText.length) {
							aText.text(a.attr(isAdd == 1 ? 'data-del-tooltip' : 'data-add-tooltip'));
						}

						// Меняем заголовок уведомления
						if (data.message.indexOf("добавлен") != -1) {
							var msg = 'Успешно добавлен!'
						} else {
							var msg = 'Успешно удалён!'
						}

						// Скилет уведомления
						var content = '<div class="noty__addto"><div class="noty__title">'+ msg +'</div><div class="noty__message">'+ data.message + '</div><div class="noty__buttons"><a class="button-primary" href="/user/favorites" title="Избранное"><span>Перейти в избранное</span></a></div></div>'

						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: content,
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else if('error' == data.status) {
						var content = '<div class="noty__addto"><div class="noty__title">Ошибка!</div><div class="noty__message">'+ data.message + '</div><div class="noty__buttons"><a class="button-primary" href="/user/login" title="Войти"><span>Войти</span></a></div></div>'
						// Если есть функция, которая отображает сообщения пользователю
						if(typeof(Noty) == "function") {
							new Noty({
								text: content,
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					}
				}
			});
			return false;
		}
	});
}


///////////////////////////////////////
// Добавление товара в корзину
///////////////////////////////////////
function addCart() {
	if($('.product__formOFF').length){
		$('.product__formOFF').off('submit').on('submit', function() {
			// Быстрый заказ
			if ($(this).attr('rel') === 'quick') {
				quickOrder(this);
				$('.cart').addClass("has-items");
				return false;
			}
			// Добавляем активные классы и обновлем счетчик товаров
			$('.cart').addClass("has-items");
			$('.count-cart').animate({opacity: 0,display: "none"},500);
			$('.count-cart').animate({display: "inline",opacity: 1},500);
			// Находим форму, которую отправляем на сервер, для добавления товара в корзину
			var formBlock = $($(this).get(0));
			// Проверка на существование формы отправки запроса на добавление товара в корзину
			if (1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
				alert('Не удалось найти форму добавления товара в корзину');
				return false;
			}
			// Получаем данные формы, которые будем отправлять на сервер
			var formData = formBlock.serializeArray();
			var t = $(this);
			var id = t.find('input[name="form[goods_id]"]').val()
			// Сообщаем серверу, что мы пришли через ajax запрос
			formData.push({name: 'ajax_q', value: 1});
			// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
			//formData.push({name: 'fast_order', value: 1});
			// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
			$.ajax({
				type: "POST",
				cache: false,
				url: formBlock.attr('action'),
				data: formData,
				success: function(data) {
					// Анализ системного сообщения в коризне
					var str = $(data).html();
					// Проверяем текст сообщения на наличие ошибки
					if (str.indexOf("Не удалось") != -1) {
						// Сообщение с ошибкой
						if(typeof(Noty) == "function") {
							new Noty({
								text: str,
								layout:"bottomRight",
								type:"warning",
								theme:"",
								closeWith: ['click'],
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}
					} else {
						// Сообщение с успешным добавлением
						if(typeof(Noty) == "function") {
							new Noty({
								text: str,
								layout:"bottomRight",
								type:"success",
								theme:"",
								closeWith: ['click'],
								easing:"swing",
								animation: {
									open: 'animated fadeInUp',
									close: 'animated fadeOutDown',
									easing: 'swing',
									speed: 400
								},
								timeout:"2000",
								progressBar:true,
								closable:true,
								closeOnSelfClick:true,
								modal:false,
								dismissQueue:false,
								onClose:true,
								killer:false
							}).show();
						}

						// Добавляем активный класс если товар успешно добавился в корзину
						function inCart(obj){
							obj.addClass("inCart");
							var count = obj.find('.inCart__count');
							var newCount = parseInt(count.text()) + 1;
							count.text(newCount)
						}

						// Запуск функции активного класса товара в других категориях
						$('.product__item[data-id="' + id + '"]').each(function(){
							inCart($(this))
							$(this).addClass('inCart');
						});

						// Анимация добавления товара в корзину
						function animateCart(){
							var img = t.find('img');
							var w = img.width();
							var bascket = $(".cart__icon");

							if(!img.length){
								img = t.parents().find('.productView__image img');
								w = 200;
							}

							img.clone()
							.css({
								'width' : w,
								'position' : 'absolute',
								'z-index' : '9999',
								'display' : 'block',
								bottom: img.offset().top,
								left: img.offset().left
							})
							.appendTo("body")
							.animate({
								opacity: 0.1,
								left: bascket.offset()['left'],
								top: bascket.offset()['top'],
								width: 20
							}, 1000, function() {	
								$(this).remove();
							});
						}

						// Запуск Анимации
						animateCart();

						// Открытие/Закрытие корзины при добавлении
						// $('.cart.dropdown').addClass('opened');
						// setTimeout(function () {
						// 	$('.cart.dropdown').removeClass('opened');
						// 	$.fancybox.close();
						// }, 2000);

					}
					// Скрытое обновление корзины
					$('.hiddenUpdate').html(data);
				}
			});
			return false;
		});
	}

	// Бронировать
	$('.add-cart').off('click').on('click', function(event){
		event.preventDefault();
		var formBlock = $(this).closest('.product__form');
    var goodsMod = formBlock.find('[name="form[goods_mod_id]"]').val();
		var name = formBlock.find('.product__name span').text();
		var image = formBlock.find('.product__img img').attr('src');
		// Определяем изображение товара
		if(typeof(image) == 'undefined'){
			var image = formBlock.find('.product__img img').attr('data-src');
		}
		// Обновляем данные
		$('.modal__title-icon img').attr('src', image)
    $('#fancy-book-goods-mod').val(goodsMod)
		$('#fancybox__book .subtitle').text(name)
		// Открываем окно
		$.fancybox.open($('#fancybox__book'), {
			keyboard: false,
			baseClass: "book",
		});
	});
}

// Быстрый заказ
function quickOrder(formSelector) {
	// Находим форму, которую отправляем на сервер, для добавления товара в корзину
	var formBlock = $($(formSelector).get(0));
	// Проверка на существование формы отправки запроса на добавление товара в корзину
	if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
		alert('Не удалось найти форму добавления товара в корзину');
		return false;
	}
	// Получаем данные формы, которые будем отправлять на сервер
	var formData = formBlock.serializeArray();
	// Сообщаем серверу, что мы пришли через ajax запрос
	formData.push({name: 'ajax_q', value: 1});
	// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
	formData.push({name: 'fast_order', value: 1});
	// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
	$.ajax({
		type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox.open(data, {
				keyboard: false,
				baseClass: "fastOrder",
				afterShow: function(){
          showPass();
					orderScripts();
          orderScriptsSelect();
          coupons();
          preload();
          $('.fastOrder__form').validate({
            errorPlacement: function(error, element) { }
          });
					// Стили для новых селектов
					$(".form__phone").mask("+7 (999) 999-9999");
				}
			})
		}
	});
	return false;
}

// Функция выбора модификаций
function quickViewMod() {
	// Получение центральной разметки страницы (для быстрого просмотра)
	$(document).ready(function(){
		$.fn.getColumnContent = function() {
			var block = ($(this).length && $(this).hasClass('productViewBlock') ? $(this).filter('.productViewBlock') : $('.productViewBlock:eq(0)'));
			block.each(function(){
				// Удаляем все блоки, которые не отображаются в быстром просмотре.
				$(this).children().not('.productView').remove();
			});
			block.removeClass('productViewQuick');
			block.addClass('productViewMod');
			block.find('.productView__image img').attr('src', block.find('.productView__image img').data('src'))
			return block;
		}
		// Быстрый просмотр товара
		// При наведении на блок товара загружаем контент этого товара, который будет использоваться для быстрого просмотра, чтобы загрузка происходила быстрее.
		$('.product__item.has-mod').mouseover(function() {
			// Если в блоке нет ссылки на быстрый просмотр, то не подгружаем никаких данных
			var link = $(this).find('.add-mod');
			if(link.length < 1) {
				return true;
			}
			// Если массив с подгруженными заранее карточками товара для быстрого просмотра ещё не создан - создадим его.
			if(typeof(document.quickviewPreload) == 'undefined') {
				document.quickviewPreload = [];
			}
			var href = link.attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			// Если контент по данной ссылке ещё не загружен
			if(typeof(document.quickviewPreload[href]) == 'undefined') {
				// Ставим отметку о том, что мы начали загрузку страницы товара
				document.quickviewPreload[href] = 1;
				// Делаем запрос на загрузку страницы товара
				$.get(href, function(content) {
					// Сохраняем контент, необходимый для быстрого просмотра в специально созданный для этого массив
					document.quickviewPreload[href] = $(content).getColumnContent();
				})
				// Если загрузить страницу не удалось, удаляем отметку о том, что мы подгрузили эту страницу
				.fail(function() {
					delete document.quickviewPreload[href];
				});
			}
		});
		// Действие при нажатии на кнопку быстрого просмотра.
		$(document).on('click', '.add-mod', function() {
			var href = $(this).attr('href');
			href += (false !== href.indexOf('?') ? '&' : '?') + 'only_body=1';
			quickViewShowMod(href);
			preload();
			return false;
		});
	});
}

// Быстрый просмотр модификаций
function quickViewShowMod(href, atempt) {
	// Если данные по быстрому просмотру уже подгружены
	if(typeof(document.quickviewPreload[href]) != 'undefined') {
		// Если мы в режиме загрузки страницы и ждём результата от другой функции, то тоже подождём, когда тот контент загрузится и будет доступен в этом массиве.
		if(1 == document.quickviewPreload[href]) {
			// Если попытки ещё не указывались, ставим 0 - первая попытка
			if(typeof(atempt) == 'undefined') {
				atempt = 0;
				// Иначе прибавляем счётчик попыток
			} else {
				atempt += 1;
				// Если больше 500 попыток, то уже прошло 25 секунд и похоже, что быстрый просмотр не подгрузится, отменяем информацию о том, что контент загружен
				if(atempt > 500) {
					delete document.quickviewPreload[href];
					alert('Не удалось загрузить страницу товара. Пожалуйста, повторите попытку позже.');
					return true;
				}
			}
			// Запустим функцию быстрого просмотра через 5 сотых секунды, вероятно запрошендная страница товара уже подгрузится.
			setTimeout('quickViewShowMod("' + href + '", '+ atempt +')', 50);
			return true;
		} else {
			$.fancybox.close();
			// $.fancybox.open(document.quickviewPreload[href]);
			$.fancybox.open({
				src  : document.quickviewPreload[href],
				type : 'inline',
				transitionEffect: "slide"
			});
			addCart();
			addTo();
			goodsModification($('.fancybox-content.productViewBlock'));
			// newModification($('.fancybox-content.productViewBlock'));
			quantity();
			prodQty($('.fancybox-content.productViewBlock'));
		}
	} else {
		$.get(href, function(content) {
			$.fancybox.close();
			//$.fancybox.open($(content).getColumnContent());
			$.fancybox.open({
				src  : $(content).getColumnContent(),
				type : 'inline',
				transitionEffect: "slide"
			});
			addCart();
			addTo();
			goodsModification($('.fancybox-content.productViewBlock'));
			// newModification($('.fancybox-content.productViewBlock'));
			quantity();
			prodQty($('.fancybox-content.productViewBlock'));
		});
	}
}


///////////////////////////////////////
// Корзина
///////////////////////////////////////
function cartQuantity(){
	$('.qty__cart').change($.debounce(300, function(){
		var quantity = $(this);
		var qVal = $(this).val();
		if(qVal >= '1'){
			var id = $(this).closest('.cart__item').data('id');
			var qty = $(this).val();
			var data = $('.cartForm').serializeArray();
			data.push({name: 'only_body', value: 1});
			$.ajax({
				data: data,
				cache:false,
				success:function(d){
					quantity.val($(d).find('.cart__item[data-id="' + id + '"] .qty__cart').val());
					item = $('.cart__item[data-id="' + id + '"]');
					item.find('.price__now').html($(d).find('.cart__item[data-id="' + id + '"] .price__now').html());
					item.find('.price__old').html($(d).find('.cart__item[data-id="' + id + '"] .price__old').html());
					$('.cartTotal').html($(d).find('.cartTotal').html());
					qtyVal = $(d).find('.cart__item[data-id="' + id + '"] .qty__cart').val();
					// Вызов функции быстрого заказа в корзине
					$('.startOrder').on('click', function() {
						orderStart();
						return false;
					});
					// Вызов функции быстрого заказа в корзине
					cartMinSum();
					if(qty > qtyVal){
						$('.cart__error').remove();
						$('.cartTable').before('<div class="cart__error warning">Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div>');
						$('.cart__error').fadeIn(500).delay(2500).fadeOut(500, function(){$('.cartErr').remove();});
					}
				}
			});
		}else{
			$(this).val('1');
			$(this).trigger('change');
		}
	}));
	quantity();
}

// Удаление товара из корзины
function cartDelete(e){
	var yep = confirm('Вы точно хотите удалить товар из корзины?');
	if(yep == true){
		e.closest('.cart__item').fadeOut();
		url = e.data('href');
		$.ajax({
			url:url,
			cache:false,
			success:function(d){
				$('.page-cartTable').html($(d).find('.page-cartTable').html());
				// Кол-во в корзине
				cartQuantity();
				// Вызов функции быстрого заказа в корзине
				cartMinSum();
				// Запуск функции 
				$('.startOrder').on('click', function() {
					orderStart();
					return false;
				});
			}
		});
	}else{
		return false;
	}
}

// Функция быстрого оформления заказа в корзине
function orderStart(){
	var globalOrder = $('#globalOrder');
	var closeOrder = $('.closeOrder');
	var pageCart = $('.page-cartTable');
	//объект блока куда будет выводиться форма быстрого заказа
	var OrderAjaxBlock = $('#OrderAjaxBlock');
	var urlQuickForm = '/cart/add'; // адрес страницы с формой
	// данные которые отарвятся на сервер чтобы получить только форму быстрого заказа без нижней части и верхней части сайта
	var quickFormData = [
		{name: 'ajax_q', value: 1},
		{name: 'fast_order', value: 1}
	];
	pageCart.addClass('startedOrder');
	$(".qty__cart").attr('readonly', 'readonly');
	globalOrder.show('slow');
	$.ajax({
		type: "POST",
		cache: false,
		url: urlQuickForm,
		data: quickFormData,
		success: function(data) {
			OrderAjaxBlock.html($(data).find('.fastOrderContent').wrap('<div></div>').html()).show('slow');
			$('html, body').delay(400).animate({scrollTop : globalOrder.offset().top}, 800);
			showPass();
			orderScripts();
			orderScriptsSelect();
			coupons();
			preload();

			// Стили для новых селектов
			$(".form__phone").mask("+7 (999) 999-9999");

			// Отменить заказ
			closeOrder.on('click', function() {
				pageCart.removeClass('startedOrder');
				$(".qty__cart").removeAttr('readonly');
				$('.startOrder').removeClass('disabled');
				globalOrder.hide('slow');
				$('html, body').delay(400).animate({scrollTop : jQuery('#main').offset().top}, 800);
				return false;
			});

			// Валидация формы на странице оформления заказа
			$(".total__buttons button").on('click', function(){
				var form = $(".fastOrder__form");
				form.validate({
					errorPlacement: function(error, element) { }
				});
				form.submit();
				return false;
			});

			// Выключение кнопки оформления заказа если не все поля заполнены
			orderValidate();
		}
	});
	return false;
}

// Функция вычисления остатка до минимальной суммы заказа
function cartMinSum(){
	var minPrice = parseInt($('.cartTotal__min-price').data('price'));
	var totalSum = parseInt($('.cartSumTotal').data('value'));
	if(minPrice > totalSum) {
		var diff = minPrice - totalSum
		$('.cartTotal__min-price').find('.num').text(addSpaces(diff))
		$('.cartTotal__min-content').show();
		$(".total__buttons button").attr('disabled', true).addClass('disabled');
	}else{
		$('.cartTotal__min-content').hide();
		$(".total__buttons button").attr('disabled', false).removeClass('disabled');
	}
}

// Функция вычисления скидки в корзине
function cartSaleSum(){
	var arr = [];
	// Находим разницу в цене
	$('.addto__cart .addto__item').each(function(){
		var priceNow = $(this).find('.price__now').attr('data-price')
		var priceOld = $(this).find('.price__old').attr('data-price')
		if(typeof(priceOld) !== 'undefined'){
			if(priceOld > priceNow){
				var diff = priceOld - priceNow;
				// Добавляем разницу в массив
				arr.push(diff);
			}
		}
	});

	// Итоговая сумма скидки
	var sum = 0;
	for (var i=0; i<arr.length; i++){
		sum += arr[i]
	}
	
	// Обновляем сумму скидки
	$('.addto__cart .cartSumOld').find('.num').text(addSpaces(sum)).parent().show();
}


///////////////////////////////////////
/* Скрипты для оформления заказов */
///////////////////////////////////////
// Быстрый заказ
function quickOrder(formSelector) {
	// Находим форму, которую отправляем на сервер, для добавления товара в корзину
	var formBlock = $($(formSelector).get(0));
	// Проверка на существование формы отправки запроса на добавление товара в корзину
	if(1 > formBlock.length || formBlock.get(0).tagName != 'FORM') {
		alert('Не удалось найти форму добавления товара в корзину');
		return false;
	}
	// Получаем данные формы, которые будем отправлять на сервер
	var formData = formBlock.serializeArray();
	// Сообщаем серверу, что мы пришли через ajax запрос
	formData.push({name: 'ajax_q', value: 1});
	// Так же сообщим ему, что нужно сразу отобразить форму быстрого заказа
	formData.push({name: 'fast_order', value: 1});
	// Аяксом добавляем товар в корзину и вызываем форму быстрого заказа товара
	$.ajax({
		type    : "POST",
		cache	  : false,
		url		  : formBlock.attr('action'),
		data		: formData,
		success: function(data) {
			$.fancybox.open(data, {
				keyboard: false,
				baseClass: "fastOrder",
				afterShow: function(){
          showPass();
          orderScripts();
          orderScriptsSelect();
          coupons();
          preload();
					orderValidate();
					// Стили для новых селектов
					$(".form__phone").mask("+7 (999) 999-9999");
				}
			})

		}
	});
	return false;
}

// Валидация формы в оформлении заказа
function orderValidate() {
	// Валидация формы
	$('.fastOrder__form').validate({
		validClass: "valid",
		errorPlacement: function(error, element) {
		}
	});

	// Выключение кнопки оформления заказа если не все поля заполнены
	$(".fastOrder__form [required]").blur(function(){
		if($('.fastOrder__form').valid()) {
			$(".total__buttons button").attr('title', 'Оформить заказ').removeClass('disabled');
		} else {
			$(".total__buttons button").attr('title', 'Заполните все поля').addClass('disabled');
		}
	});

	// Проверка обязательных полей
	if($('.fastOrder__form').valid()) {
		$(".total__buttons button").attr('title', 'Оформить заказ').removeClass('disabled');
	}else{
		$(".fastOrder__form input, .fastOrder__form textarea, .fastOrder__form select").removeClass('error');
	}
}

// Регистрация и выбор доставки
function orderScripts() {
	// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	$("#deliveryConvenientDate").datepicker({
		// Если true, то при активации даты, календарь закроется.
		autoClose: true,
		// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
		minDate: new Date()
	});
	// При оформлении заказа дадим возможность зарегистрироваться пользователю
	$('#form__registration').click(function(){
		if($(this).prop("checked")) {
			$('.form__pass').show();
			$('#sites_client_email').addClass('required');
			$('#sites_client_email').attr("required", true);
			$(this).parent().addClass('active');
			$(this).attr("checked", true);
			$('.form__fields.email label').addClass('required');
		} else {
			$('.form__pass').hide();
			$('#sites_client_email').removeClass('required');
			$('#sites_client_email').attr("required", false);
			$(this).parent().removeClass('active');
			$(this).attr("checked", false);
			$('.form__fields.email label').removeClass('required');
		}
	});
	// Отображение вариантов оплаты
	var ID = $('input[name="form[delivery][id]"]:checked').val();
	$('.order__payment').hide();
	$('.order__payment[rel="' + ID + '"]').show();
	$('.order__payment[rel="' + ID + '"]').find('input:first').click();
	// Действия при выборе варианта доставки на этапе оформления заказа
	$('.delivery__radio').click(function(d){
		// Отображение вариантов оплаты при выборе доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		$('.zone__radio').each(function(){
			$(this).prop('checked',false);
			$(this).parent().removeClass('active');
		});
		var val = $(this).val();
		var fz = $($('.zone__radio[deliveryid='+val+']')[0]);
		$(this).prop('checked',true);
		fz.prop('checked',true);
		$(this).parent().addClass('active');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены при наличии зоны
		var cartSumTotal = $('.cartSumTotal').data('value');
		var zonePrice =  $('.zone__radio:checked').attr('price');
		if(zonePrice > 0){
			priceBlock.text(addSpaces(zonePrice));
			$('.cartSumDelivery .num').text(addSpaces(zonePrice));
		}else{
			priceBlock.text(price);
			$('.cartSumDelivery .num').text(addSpaces(price));
		}
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumDiscount:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		// Скрытие необязательных полей при выборе самовывоза
		if($(this).data('name') == 'Самовывоз'){
			$('.fastOrder__form').addClass('pickup');
			$('.address input, .address textarea').val('Самовывоз');
			$('#deliveryConvenientDate').val('01.01.2220');
			$(".total__buttons button").attr('title', 'Оформить заказ').removeClass('disabled');
		}else{
			$('.fastOrder__form').removeClass('pickup');
			$('.address input, .address textarea').val('');
			$('#deliveryConvenientDate').val('');
		}
	});
	// Действия при выборе зоны внутри варианта доставки на этапе оформления заказа
	$('.zone__radio').click(function(){
		var val = $(this).attr('deliveryid');
		var price = $(this).attr('price');
		var priceBlock = $('.delivery__option[rel='+ val +']').find('.delivery__price').find('.num');
		// Обновление цены
		priceBlock.text(addSpaces(price));
		//
		$('.delivery__radio').each(function(){
			$(this).prop('checked',false);
			if($(this).val() == val){
				$(this).prop('checked',true);
			}else{
				$(this).prop('checked',false);
			}
		});
		// Выбор варианта оплаты при выборе зоны доставки
		var ID = $('input[name="form[delivery][id]"]:checked').val();
		$('.order__payment').hide();
		$('.order__payment[rel="' + ID + '"]').show();
		$('.order__payment[rel="' + ID + '"]').find('input:first').click();
		// Обновление цены с учетом доставки
		var cartSumTotalHide = $('.cartSumTotalHide:eq(0) .num').text().toString().replace(/\s/g, '');
		var newSum = parseInt(cartSumTotalHide) + parseInt(priceBlock.text());
		$('.cartSumTotal .num').text(addSpaces(newSum));
		$('.cartSumDelivery .num').text(addSpaces(price));
	});
}

// Выбор доставки и оплаты
function orderScriptsSelect() {
	// Выбор доставки
	$('.delivery__select select').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html()
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.delivery__desc').html()
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Обновление цены и описания при выборе доставки
	$('.delivery__select select').each(function(){
		var selectedDelId = $(this).find('option:selected').attr('delid');
		$('.delivery__zoneSelect').hide();
		$('.delivery__zoneSelect[del="'+selectedDelId+'"]').show();
		$('.delivery__zoneSelect option').attr('selected',false)
		$('.delivery__zoneSelect[del="'+selectedDelId+'"] option:first-of-type').attr('selected',true);
		$('.delivery__option .delivery__radio[value="'+selectedDelId+'"]').click();
		var WithoutZone = $('div[rel='+ selectedDelId +'] .delivery__radio:checked').attr('pricewithoutzones');
		var WithZone = $('div[rel='+ selectedDelId +'] .zone__radio:checked').attr('price');
		if(WithZone >= 0){
			startprice = WithZone;
		}else{
			startprice = WithoutZone;
		}
		$('.changeprice').text(addSpaces(startprice));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
		$('.order__payment').hide();
		$('.order__payment[rel="'+ selectedDelId +'"]').show();
		var startInputId = $('.delivery__radio:checked').attr('value');
		$('.hiddenRadio .order__payment input').attr('checked',false);
		$('.hiddenRadio .order__payment[rel="'+startInputId+'"] input').each(function(){
			$(this).click();
			return false;
		});
		$('.order__paymentSelect option:first-child').prop('selected', true);
		// Вывод описания доставки
		var DeliveryDescription = $('.delivery__radio:checked').parent().find('.delivery__desc').html();
		$('.delivery__description').html(DeliveryDescription);
		if (DeliveryDescription == undefined ) {
			$('.delivery__description').css("display", "none");
		}else{
			$('.delivery__description').css("display", "block");
		}
		// Вывод описания оплаты
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').each(function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(startprice));
	});

	// Выбор зоны доставки
	$('.delivery__zoneSelect select').on('change', function(){
		var optValue = $(this).find('option:selected').attr('value');
		$('.delivery__zones input[value="'+optValue+'"]').click();
		var WithZone = $('.zone__radio:checked').attr('price');
		$('.changeprice').text(addSpaces(WithZone));
		$('.cartSumDelivery .num').text(addSpaces(WithZone));
	});

	// Выбор оплаты
	$('.paymentSelect').change(function(){
		var selectedDelId = $(this).find('option:selected').attr('value');
		$('.hiddenRadio .paymentRadio[value="'+selectedDelId+'"]').click();
		var PaymentDescription = $('.hiddenRadio .paymentRadio:checked').parent().find('.payment__desc').html();
		$('.payment__description').html(PaymentDescription);
		if (PaymentDescription == undefined ) {
			$('.payment__description').css("display", "none");
		}else{
			$('.payment__description').css("display", "block");
		}
	});

	// Выбор оплаты
	$('.payment__option input').on('click', function (){
		var t = $(this).parent()
		$('.payment__option').removeClass('active')
		t.addClass('active')
	});
	// Проверяем выбранную оплату
	$('.payment__option input').each(function (){
		var t = $(this).parent()
		if($(this).attr('checked')){
			t.addClass('active')
		}
	});
}

$.event.special.inputchange = {
	setup: function() {
			var self = this, val;
			$.data(this, 'timer', window.setInterval(function() {
					val = self.value;
					if ( $.data( self, 'cache') != val ) {
							$.data( self, 'cache', val );
							$( self ).trigger( 'inputchange' );
					}
			}, 20));
	},
	teardown: function() {
			window.clearInterval( $.data(this, 'timer') );
	},
	add: function() {
			$.data(this, 'cache', this.value);
	}
};

// Отправка купона при оформлении заказа
function coupons() {
	var submitBtn = $('.coupon__button');
	var couponInput = $('.coupon__code');
	var couponParent = couponInput.parent();
	var resetBtn = $('.coupon__reset');
	var totalCouponBlock = $('.total__coupons');
	var totalDiscountBlock = $('.total__discount');

	// Отправка формы
	submitBtn.off('click').on('click', function(){
		var url = '/order/stage/confirm';
		var val = couponInput.val();
		var oldVal = couponInput.attr('data-value');
		couponInput.attr('data-value', val);

		// Если ничего не ввели
		if(val == ''){
			couponInput.addClass('error')
			return false;
		}

		// Если купон не изменился
		if(val == oldVal){
			couponInput.removeClass('focus');
			return false;
		}


		// Получаем данные формы, которые будем отправлять на сервер
		var formData = $('#myform').serializeArray();
		formData.push({name: 'ajax_q', value: 1});
		formData.push({name: 'only_body', value: 1});
		formData.push({name: 'form[coupon_code]', value: val});
		$.ajax({
			type: "POST",
			cache: false,
			url: url,
			data: formData,
			success: function(data) {
				// Получаем блок скидки
				var discountBlock = $(data).closest('#myform').find('.carDiscount');
				var discountName = discountBlock.find('.name').text();
				var discountPrice = discountBlock.find('.value').html();
				var discountPercent = discountBlock.find('.percent').html();
				
				// Определяем наличие скидки в % или валюте
				if (discountPrice) {
					discountPrice = discountPrice
				}else if (discountPercent){
					discountPrice = discountPercent
				}else {
					totalCouponBlock.hide();
				}

				// Получаем новую итоговую стоимость заказа
				var totalBlock = $(data).closest('#myform').find('.total');
				var totalSum = totalBlock.find('.cartSumNowWithDiscount').data('price');
				var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
				var newTotalSum = totalSum + deliveryPrice;

				// Записываем название и размер скидки по купону
				totalCouponBlock.find('.cartTotal__label span').html(discountName);
				totalCouponBlock.find('.cartSumCoupons').html(discountPrice);
				totalCouponBlock.show();
				totalDiscountBlock.hide();

				// Проверяем купон
				var cartSumTotal = $('.cartSumTotal:eq(0) .num').text().toString().replace(/\s/g, '')
				if (newTotalSum > cartSumTotal) {
					couponInput.val("").attr("placeholder", "Купон неверен").removeClass('focus');
					couponParent.removeClass('success').addClass('error');
					totalCouponBlock.hide();
					totalDiscountBlock.show();
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
				} else if (newTotalSum == cartSumTotal) {
					if (discountName) {
						couponInput.addClass('focus');
						couponParent.addClass('success');
						totalCouponBlock.show();
					}else{
						couponInput.val("").addClass('error');
						couponParent.addClass('error');
						totalCouponBlock.hide();
					}
				} else {
					couponInput.addClass('focus');
					couponParent.removeClass('error').addClass('success');
					totalCouponBlock.show();
					// Обновляем значение итоговой стоимости
					$('.cartSumTotal').attr('data-value', newTotalSum);
					$('.cartSumTotal .num').text(addSpaces(newTotalSum));
					$('.cartSumCoupons').attr('data-value', newTotalSum);
					$('.cartSumTotalHide').attr('data-value', newTotalSum);
					$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
					$('.cartSumDiscount .num').text(addSpaces(totalSum));
				}

				// Тестирование. Проверка переменных
				// console.log('---', )
				// console.log('discountName', discountName)
				// console.log('discountPrice', discountPrice)
				// console.log('discountPercent', discountPercent)
				// console.log('totalBlock', totalBlock)
				// console.log('totalSum', totalSum)
				// console.log('deliveryPrice', deliveryPrice)
				// console.log('newTotalSum', newTotalSum)
				// console.log('---', )
			},
			error: function(data){
				console.log("Возникла ошибка: Невозможно отправить форму купона.");
			}
		});
	});

	// Сброс
	resetBtn.on('click', function(){
		couponInput.val('').trigger('input');
		setTimeout(function(){
			totalCouponBlock.hide();
			totalDiscountBlock.show();
			var cartSum = $('.cartSumDiscount').data('value');
			var deliveryPrice = parseInt($('.cartSumDelivery:eq(0) .num').text());
			var newTotalSum = cartSum + deliveryPrice;
			// Возвращаем значение по умолчанию итоговой стоимости
			$('.cartSumTotal .num').text(addSpaces(newTotalSum));
			$('.cartSumTotal').attr('data-value', newTotalSum);
			$('.cartSumCoupons').attr('data-value', newTotalSum);
			$('.cartSumTotalHide').attr('data-value', newTotalSum);
			$('.cartSumTotalHide .num').text(addSpaces(newTotalSum));
			couponInput.val("").attr("placeholder", "Введите купон").removeClass('focus').removeClass('error');
			couponParent.removeClass('error').removeClass('success');
		}, 500);
	});

	// Отображение кнопки Сброс
	couponInput.on('input',function(){
		if($(this).val()) {
			resetBtn.addClass('focus')
		} else {
			resetBtn.removeClass('focus')
		}
	});

}


///////////////////////////////////////
// Товар. Карточка товара
///////////////////////////////////////
function pageGoods() {

	// Функция показать больше для Характеристик
	function featuresMore(){
		var content = $('.productView__features');
		var item = $('.features__item');
		var itemVisible = $('.features__item:visible').length;
		var buttons = $('.features__buttons');

		// Если мало характеристик, скрываем кнопки
		if(item.length <= itemVisible){ buttons.hide(); }

		// Действия при нажатии
		buttons.find('.button-more').on('click',function(event){
			event.preventDefault();
			var textActive = $(this).attr('data-text');
			var textDefault = $(this).find('span').text();

			// Обновляем текст кнопки
			$(this).attr('data-text', textDefault).find('span').text(textActive);

			// Если кнопка активна
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				item.removeClass('show');
				$('html, body').animate({scrollTop : content.offset().top - 60}, 600);
			}else{
				$(this).addClass('active');
				item.addClass('show');
			}
		});
	}

	// Функция для Описания в карточке товара
	function descriptionMore(){
		var content = $('.productView__description');
		var item = content.find('.htmlDataBlock');
		var buttons = $('.description__buttons');
		var descHeight = item.height();

		// Если большое описание
		if (descHeight > 100) {
			item.addClass('mask');
			buttons.show();
		}else{
			item.removeClass('mask');
			buttons.hide();
		}

		// Действия при нажатии
		buttons.find('.button-more').on('click',function(event){
			event.preventDefault();
			var textActive = $(this).attr('data-text');
			var textDefault = $(this).find('span').text();

			// Обновляем текст кнопки
			$(this).attr('data-text', textDefault).find('span').text(textActive);

			// Если кнопка активна
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				item.addClass('mask');
				$('html, body').animate({scrollTop : content.offset().top - 60}, 600);
			}else{
				$(this).addClass('active');
				item.removeClass('mask');
			}			
		});
	}

	// Функция показать больше для Отзывов
	function opinionMore(){
		var content = $('.productView__opinion');
		var item = content.find('.opinion__item');
		var itemVisible = content.find('.opinion__item:visible').length;
		var buttons = content.find('.opinion__buttons');

		// Если мало Отзывов, скрываем кнопки
		if(item.length <= itemVisible){ buttons.hide(); }

		// Если кнопка активна
		buttons.find('.button-more').on('click',function(event){
			event.preventDefault();
			var textActive = $(this).attr('data-text');
			var textDefault = $(this).find('span').text();
			
			// Обновляем текст кнопки
			$(this).attr('data-text', textDefault).find('span').text(textActive);
			
			// Если кнопка активна
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				item.removeClass('show');
				$('html, body').animate({scrollTop : content.offset().top - 60}, 600);
			}else{
				$(this).addClass('active');
				item.addClass('show');
			}
		});
	}

	// Задержка перед включением функции
	setTimeout(function () {
		opinionMore();
		featuresMore();
		descriptionMore();
	}, 100);

	// Все фото
	if ($('.thumblist__item').length > 5){
		$('.productView__image-more').show()
		// Открываем галлерею
		$('.productView__image-more').on('click', function(event){
			event.preventDefault();
			$('.thumblist__item:nth-child(5) .thumblist__image').click();
		});
		$('.productView__image-count').text($('.thumblist__item').length + 1);
	}

	// Переключение для Положительный и Отрицательный отзыв
	$('.generally label').on('click', function(event){
		event.preventDefault();
		$('.generally label').removeClass('active');
		$('.generally input').attr('checked', false);
		$(this).addClass('active');
		$(this).next('input').attr('checked', true);
	});
	
	// Переключение для Положительный и Отрицательный отзыв
	$('.opinion__nav a').on('click', function(){
    if($(this).hasClass('goodOpinions')){
      $('.good').removeClass('hide');
      $('.bad').removeClass('show');
      $('.good').addClass('show');
      $('.bad').addClass('hide');
			$('.opinion__buttons').hide();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    } else if($(this).hasClass('badOpinions')){
      $('.good').removeClass('show');
      $('.bad').removeClass('hide');
      $('.good').addClass('hide');
      $('.bad').addClass('show');
			$('.opinion__buttons').hide();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    } else {
      $('.good, .bad').removeClass('show');
      $('.good, .bad').removeClass('hide');
			$('.opinion__buttons').show();
			$('.opinion__nav a').removeClass('active')
			$(this).addClass('active')
    }
  });

	// Добавление отзыва о товаре. Рейтинг
	if($('.goodsOpinionRating').length){
		$('.goodsOpinionRating').rating();
	}

	// Ссылка на отображение формы для добавление отзыва о товаре
	$('.opinion__add').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			// $(this).removeClass('active');
			$('.opinion__addForm').slideUp(600);
		}else{
			// $(this).addClass('active');
			$('.opinion__addForm').slideDown(600);
			$('html, body').animate({scrollTop : jQuery('.opinion__addForm').offset().top}, 500);
		}
	});

	// Валидация формы на странице оформления заказа, а так же формы на страницы связи с администрацией
	$(".opinion__form button").on('click', function(){
		var form = $(".opinion__form");
		form.validate({
			errorPlacement: function(error, element) { }
		});
		form.submit();
		return false;
	});

	// Иконка для обновления изображение капчи
	$('.captcha__refresh').on('click', function(){
		RefreshImageAction(this,1,1);
		$('.captcha__image').attr('src',$('.captcha__image').attr('src')+'&rand'+Math.random(0,10000));
		return false;
	});

	// Имитация клика для капчи
	$('.captcha__refresh').click();

	// Открытие зон доставки
	$('.zone__open').on('click', function(event){
		event.preventDefault();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.zone__list').slideUp(600);
		}else{
			$(this).addClass('active');
			$('.zone__list').slideDown(600);
		}
	});

	// Первая буква имени в аватаре
	$('.opinion__item').each(function(){
		var avatar = $(this).find('.opinion__avatar span');
		var name = $(this).find('.opinion__name span').text()[0];
		avatar.text(name)
	})

}

// Крутит изображение при обновлении картинки защиты от роботов
function RefreshImageAction(img,num,cnt) {
	if(cnt>13) { return false; }
	$(img).attr('src', $(img).attr('rel') + 'icon/refresh/' + num + '.gif');
	num = (num==6)?0:num;
	setTimeout(function () {
		RefreshImageAction(img, num+1, cnt+1)
	}, 50);
}

// Проверка вводимых значений в количестве товара
function keyPress(oToCheckField, oKeyEvent) {
  return oKeyEvent.charCode === 0 || /\d/.test(String.fromCharCode(oKeyEvent.charCode));
}

// Функция + - для товара
function quantity() {
  //Regulator Up копки + в карточке товара при добавлении в корзину
  $('.qty__plus').off('click').on('click', function(){
    var quantity = $(this).parent().find('input');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal + 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
  //Regulator Down копки - в карточке товара при добавлении в корзину
  $('.qty__minus').off('click').on('click', function(){
    var quantity = $(this).parent().find('input');
    var currentVal = parseInt(quantity.val());
    if (!isNaN(currentVal)){
      quantity.val(currentVal - 1);
      quantity.trigger('keyup');
      quantity.trigger('change');
    }
    return false;
  });
}

// Изменение кол-ва в карточке
function prodQty($container){
	var $goodsModView = $container || $('#main .productViewBlock')
	$goodsModView.find('.quantity').change(function(){
		var t = $(this);
		// Количество
		var val = parseInt(t.val());
		// Если вводят 0 то заменяем на 1
		if(val < 1){
			t.val(1);
			val = 1;
		}
		// Проверка максимальныго остатка
		var max = parseInt(t.attr('max'));
		if(val > max){
			t.val(max);
			val = max;
			new Noty({
				text: '<div class="noty__addto"><div class="noty__message">Внимание! Вы пытаетесь положить в корзину товара больше, чем есть в наличии</div></div>',
				layout:"bottomRight",
				type:"warning",
				easing:"swing",
				animation: {
					open: 'animated fadeInUp',
					close: 'animated fadeOutDown',
					easing: 'swing',
					speed: 400
				},
				timeout:"2000",
				progressBar:true
			}).show();
		}

		// Обновление кол-ва для функций "Добавить"
		$goodsModView.find('.goodsDataMainModificationId').val($(this).val());
		// Цена товара без изменений
		var price = parseInt($goodsModView.find('.price__now').attr('content'));
		var priceOld = parseInt($goodsModView.find('.price__old').attr('content'));
		var newPrice = 0;
		var newPriceOld = 0;

		// Проверяем наличие добавленных товаров вместе с основным
		if ($goodsModView.find('.productView__form [class^="goodsID-"]').length) {
			$goodsModView.find('.productView__form [class^="goodsID-"]').each(function(){
				// Сумма всех добавленных товаров
				newPrice += parseInt($(this).attr('data-price'))
				newPriceOld += parseInt($(this).attr('data-price-old'))
			});
		}

		// Считаем новую сумму товара с учетом добавленных
		var multi = String(val * price + newPrice);
		var multiOld = String(val * priceOld + newPriceOld);

		// Обновляем новую сумму
		$goodsModView.find('.price__now').attr('data-price', multi);
		$goodsModView.find('.price__now').find('.num').text(addSpaces(multi));
		$goodsModView.find('.price__old').attr('data-price-old', multiOld);
		$goodsModView.find('.price__old').find('.num').text(addSpaces(multiOld));
	});
}

// Модификации select
function goodsModification($container) {
	// Функция собирает свойства в строку, для определения модификации товара
	function getSlugFromGoodsDataFormModificationsProperties(obj) {
		var properties = new Array();
		$(obj).each(function(i){
			properties[i] = parseInt($(this).val());
		});
		return properties.sort(function(a,b){
			return a - b
		}).join('_');
	}

	var $parentBlock = $container || $('#main .productViewBlock')

	var
		goodsDataProperties = $parentBlock.find('.goodsModificationsProperty select[name="form[properties][]"]'),  // Запоминаем поля выбора свойств, для ускорения работы со значениями свойств
		goodsDataModifications = $parentBlock.find('.goodsModificationsSlug'); // Запоминаем блоки с информацией по модификациям, для ускорения работы

	// Обновляет возможность выбора свойств модификации, для отключения возможности выбора по характеристикам модификации которой не существует.
	function updateVisibility (y) {
		// Проверяем в каждом соседнем поле выбора модификаций, возможно ли подобрать модификацию для указанных свойств
		goodsDataProperties.each(function(j){
			// Если мы сравниваем значения свойства не с самим собой, а с другим списком значений свойств
			if( j != y ) {
				// Проходим по всем значениям текущего свойства модификации товара
				$(this).find('option').each(function(){
					// Записываем временный массив свойств, которые будем использовать для проверки существования модификации
					var checkProperties = new Array();
					$(goodsDataProperties).each(function(i){
						checkProperties[i] = parseInt($(this).val());
					});
					// Пытаемся найти модификацию соответствующую выбранным значениям свойств
					checkProperties[j] = parseInt($(this).attr('value'));
					// Собираем хэш определяющий модификацию по свойствам
					slug = checkProperties.sort(function(a,b){return a - b}).join('_');
					// Ищем модификацию по всем выбранным значениям свойств товара. Если модификации нет в возможном выборе, отмечаем потенциальное значение выбора как не доступное для выбора, т.к. такой модификации нет.
					if(!goodsDataModifications.filter('[rel="'+slug+'"]').length) {
						$(this).attr('disabled', true);
						// Если выбрав данное значение свойства товара можно подобрать модификацию, то выделяем вариант выбора как доступный.
					} else {
						$(this).attr('disabled', false);
					}
				});
			}
		});
	}
	// Обновляем возможность выбора модификации товара по свойствам. Для тех свойств, выбор по которым не возможен, отключаем такую возможность.
	// Проверяем возможность выбора на всех полях кроме первого, чтобы отключить во всех остальных варианты, которые не возможно выбрать
	updateVisibility (0);
	// Проверяем возможность выбора на всех полях кроме второго, чтобы в первом поле так же отключилась возможность выбора не существующих модификаций
	updateVisibility (1);

	// Изменение цены товара при изменении у товара свойства для модификации
	goodsDataProperties.each(function(y){
		$(this).change(function(){
			var slug = getSlugFromGoodsDataFormModificationsProperties(goodsDataProperties),
					goodsModView                  = $parentBlock.find('.productView'),
					modificationBlock             = goodsModView.find('.goodsModificationsSlug[rel="'+slug+'"]'),
					modificationId                = parseInt(modificationBlock.find('[name="id"]').val()),
					modificationArtNumber         = modificationBlock.find('[name="art_number"]').val(),
					modificationPriceNow          = parseInt(modificationBlock.find('[name="price_now"]').val()),
					modificationPriceNowFormated  = modificationBlock.find('.price_now_formated').html(),
					modificationPriceOld          = parseInt(modificationBlock.find('[name="price_old"]').val()),
					modificationPriceOldFormated  = modificationBlock.find('.price_old_formated').html(),
					modificationRestValue         = parseFloat(modificationBlock.find('[name="rest_value"]').val()),
					modificationDescription       = modificationBlock.find('.description').html(),
					modificationGoodsModImageId   = modificationBlock.find('[name="goods_mod_image_id"]').val(),
					goodsModificationId           = goodsModView.find('.goodsModificationId'),
					goodsPriceNow                 = goodsModView.find('.price__now'),
					goodsPriceOld                 = goodsModView.find('.price__old'),
					goodsAvailableQty             = goodsModView.find('.productView__qty'),
					goodsModQty              			= goodsModView.find('.quantity'),
					goodsArtNumberBlock           = goodsModView.find('.productView__articles'),
					goodsArtNumber                = goodsModView.find('.goodsModArtNumber'),
					goodsModDescriptionBlock      = goodsModView.find('.goodsModDescription'),
					goodsModRestValue             = goodsModView.find('.goodsModRestValue');

			// Изменяем данные товара для выбранных параметров. Если нашлась выбранная модификация
			if(modificationBlock.length) {
				// Цена товара
				goodsPriceNow.html(modificationPriceNowFormated);
				goodsPriceNow.attr('data-price', modificationPriceNow).attr('content', modificationPriceNow);

				// Итоговая цена с сопутствующими товарами
				var relatedPriceNow = $('#related-goods .products__total-price');
				var goodsID = $('[class^="goodsID-"]');
				if(goodsID.length){
					relatedPriceNow.html(modificationPriceNowFormated);
					relatedPriceNow.attr('data-price', modificationPriceNow).attr('content', modificationPriceNow);
				}else{
					relatedPriceNow.find('.num').text('0');
				}

				// Добавление сопутствующих товаров
				$('#related-goods .checkbox__input').each(function(i, checkbox){
					var $checkbox = $(checkbox);
					var checkboxActive = $checkbox.prop('checked');
					if(checkboxActive) {
						changePrice($checkbox, checkboxActive);
					}
				});

				// Старая цена товара
				if(modificationPriceOld>modificationPriceNow) {
					goodsPriceOld.html(modificationPriceOldFormated);
				} else {
					goodsPriceOld.hide();
					goodsPriceOld.html('');
				}

				// Есть ли товар есть в наличии
				if(modificationRestValue > 0) {
					goodsModView.removeClass('productView__empty');
					goodsModRestValue.html('В наличии').attr('data-value', modificationRestValue);
					if (goodsAvailableQty.hasClass('.has-max')) {
						goodsModQty.val("1").attr('max', modificationRestValue);
					} else {
						goodsModQty.val("1").attr('max', 99999);
					}
				// Если товара нет в наличии
				} else {
					goodsModView.addClass('productView__empty');
					goodsModRestValue.html(modificationRestValue).attr('data-value', modificationRestValue);
					goodsModQty.val("1").attr('max', 1);
				}

				// Много Мало Отсутствует
				if(modificationRestValue > 0) {
					goodsModRestValue.html('В наличии мало');
					goodsModRestValue.parent().removeClass('alot').removeClass('zero');
					goodsModRestValue.parent().addClass('few');
				} else if(modificationRestValue > 10) {
					goodsModRestValue.html('В наличии много');
					goodsModRestValue.parent().removeClass('few').removeClass('zero');
					goodsModRestValue.parent().addClass('alot');
				} else {
					goodsModRestValue.html('Нет в наличии');
					goodsModRestValue.parent().removeClass('few').removeClass('zero');
					goodsModRestValue.parent().addClass('zero');
				}

				// Покажем артикул модификации товара, если он указан
				if(modificationArtNumber.length > 0) {
					goodsArtNumberBlock.show();
					goodsArtNumber.html(modificationArtNumber);
				} else {
					goodsArtNumberBlock.hide();
					goodsArtNumber.html('');
				}

				// Описание модификации товара. Покажем если оно есть, спрячем если его у модификации нет
				if(modificationDescription.length > 0) {
					goodsModDescriptionBlock.show().html('<div>' + modificationDescription + '</div>');
				} else {
					goodsModDescriptionBlock.hide().html();
				}

				// Идентификатор товарной модификации
				goodsModificationId.val(modificationId);
				goodsModView.find('.goodsDataMainModificationId').attr('name','form[goods_mod_id][' + modificationId + ']');
				var goodsDataMainImage = goodsModView.find('.productView__images');
				// Меняет главное изображение товара на изображение с идентификатором goods_mod_image_id
				function changePrimaryGoodsImage(goods_mod_image_id) {
					// Если не указан идентификатор модификации товара, значит ничего менять не нужно.
					if(1 > goods_mod_image_id) {
						return true;
					}
					var
						// Блок с изображением выбранной модификации товара
						goodsModImageBlock = goodsDataMainImage.find('[data-id="' + parseInt(goods_mod_image_id) + '"'),
						// Блок, в котором находится главное изображение товара
						MainImageBlock = goodsDataMainImage.find('.productView__image'),
						// Изображение модификации товара, на которое нужно будет изменить главное изображение товара.
						MediumImageUrl = goodsModImageBlock.attr('data-href'),
						// Главное изображение, в которое будем вставлять новое изображение
						MainImage = MainImageBlock.find('img');
					// Если изображение модификации товара найдено - изменяем главное изображение
					MainImage.attr('src', MediumImageUrl).parent().attr('href', MediumImageUrl);
					// Изменяем идентификатор главного изображения
					MainImageBlock.attr("data-id", parseInt(goods_mod_image_id));
					return true;
				}
				// Обновляем изображние модификации товара, если оно указано
				changePrimaryGoodsImage(modificationGoodsModImageId);
			} else {
				// Отправим запись об ошибке на сервер
				sendError('no modification by slug '+slug);
				alert('К сожалению сейчас не получается подобрать модификацию соответствующую выбранным параметрам.');
			}
			// Обновляем возможность выбора другой модификации для текущих значений свойств модификации товара.
			updateVisibility(y);
		});
	});

	$('#related-goods .checkbox__input').on('change', function(){
    var $checkbox = $(this);
    var modId = $checkbox.data('mod-id');
    var checkboxActive = $checkbox.prop('checked');
    if (checkboxActive) {
      // Создаём инпут с доп товаром
      var $input = $('<input class="goodsID-' + modId + '">')
        .attr('type', 'hidden')
        .attr('name', 'form[goods_mod_id][' + modId + ']')
        .attr('data-price', $checkbox.data('mod-price'))
        .val(1);
      $('.productView__form').append($input);
      // Пересчёт цены
      changePrice($checkbox, checkboxActive);
      $(this).parent().addClass('added');
    } else {
      // Удаляем  доп товар
      $('.productView__form').find('input[name="form[goods_mod_id][' + modId + ']"]').remove();
      // Пересчёт цены
      changePrice($checkbox, checkboxActive)
      $(this).parent().removeClass('added');
    }
  });

	function changePrice(currentCheckbox, checkboxActive){
		var $checkbox = currentCheckbox;
		var checkboxPrice = $checkbox.data('mod-price');
		var priceNowBlock = $('.productView__price .price__now');
		var priceNowTotal = $('.products__total-price');
		var nowPrice = priceNowBlock.attr('data-price');
		var nowPriceTotal = priceNowTotal.attr('data-price');
		var newPrice = 0;
		var newPriceTotal = 0;
		if (checkboxActive) {
			newPrice = String(parseInt(nowPrice) + parseInt(checkboxPrice));
			priceNowBlock.attr('data-price', parseInt(nowPrice) + parseInt(checkboxPrice))
			newPriceTotal = String(parseInt(nowPriceTotal) + parseInt(checkboxPrice));
			priceNowTotal.attr('data-price', parseInt(nowPriceTotal) + parseInt(checkboxPrice))
		} else {
			newPrice = String(nowPrice - checkboxPrice);
			priceNowBlock.attr('data-price', parseInt(nowPrice) - parseInt(checkboxPrice))
			newPriceTotal = String(nowPriceTotal - checkboxPrice);
			priceNowTotal.attr('data-price', parseInt(nowPriceTotal) - parseInt(checkboxPrice))
		}
		priceNowBlock.find('.num').text(addSpaces(newPrice))
		priceNowTotal.find('.num').text(addSpaces(newPriceTotal))
	}
}

// Функция табов
function tabs() {
	var tab = $('.tabs__nav[data-tab]');
	// Активный класс при клике
	tab.on('click', function(event){
		event.preventDefault();
		var id = $(this).attr('data-tab')
		var content = $('[data-tab-content="'+ id +'"]')
		$('[data-tab="'+ id +'"]').addClass('active');
		$('html, body').animate({scrollTop: content.offset().top - 60}, 600);
	});
	
	// Функция определния позиции
	function scrollTab(){		
		var scrollTop = $(window).scrollTop();
		// Проверяем видимый контент табов
		$('[data-tab-content]:visible').each(function(){
			var id = $(this).attr('data-tab-content')
			if($(this).offset().top - $('.tabs__navs').height() * 2 <= scrollTop){
				$('.tabs__nav').removeClass('active')
				$('.tabs__nav[data-tab="'+ id +'"]').addClass('active');
			}
		});
	}
	scrollTab()

	// Активный класс при скроле
	$(window).on('scroll', function () {
		scrollTab()
	});
}


///////////////////////////////////////
/*** Действия удаления из ... ***/
///////////////////////////////////////
// Удаление товара из корзины без обновлении страницы
function removeFromCart(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из корзины?')){
    var href = elem.attr('href');
    var qty = elem.data('qty');
    var id = elem.data('id');
    var oldCount = $('.count-cart').attr('data-count');
		// Скрываем и удаляем товар из корзины
		elem.parents().find('.addto__item[data-id="'+ id +'"]').fadeOut().remove();
		// Удаляем класс добавленного товара в корзину
		$('.product__item[data-id="'+ id +'"]').removeClass('inCart')
    $.ajax({
      cache  : false,
      url		 : href,
      success: function(data){
        var newCount = oldCount - qty;
        $('.count-cart').attr('data-count', newCount).text(newCount);
        $('.cart__word').html($(data).find('.cart__word').html());
				$('.cartSumNow').attr('data-price', $(data).find('.cartSumNow').attr('data-price')).find('.num').text(addSpaces($(data).find('.cartSumNow').attr('data-price')));
				$('.cartSumOld').attr('data-price', $(data).find('.cartSumOld').attr('data-price')).find('.num').text(addSpaces($(data).find('.cartSumOld').attr('data-price')));
				cartSaleSum();
        var flag = 0;
        if(newCount != 0){
          $('.addto__cart .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.cart').removeClass("has-items");
          $('.count-cart').attr('data-count', '0').text("0");
          $('.cart .addto__item').remove();
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Корзины без обновлении страницы
function removeFromCartAll(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить корзину?')){
    $.ajax({
      cache  : false,
      url		 : elem.attr('href'),
      success: function(data){
        $('.totalSum').html($(data).find('.totalSum').html());
        $('.cart').removeClass("has-items");
        $('.count-cart').attr('data-count', '0').text("0");
        $('.addto__cart .addto__item').remove();
				$('.product__item').each(function(){
					$(this).removeClass('inCart').find('.inCart__count').text('0');
				});
      }
    });
  }
}

// Удаление товара из Сравнения без обновлении страницы
function removeFromCompare(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из сравнения?')){
    var href = elem.attr('href');
    var id = elem.attr('data-id');
    var oldCount = $('.count-compare').attr('data-count');
		// Скрываем и удаляем товар из корзины
		elem.parents().find('.addto__compare .addto__item[data-id="'+ id +'"]').fadeOut().remove();
    $.ajax({
      cache : false,
      url		: href,
      success: function(data){
        var newCount = oldCount - 1;
        $('.count-compare').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__compare .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.compare').removeClass("has-items");
          $('.count-compare').attr('data-count', '0').text('0');
        }
        var obj = $('.add-compare[data-mod-id="' + id + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Сравнения без обновлении страницы
function removeFromCompareAll(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить сравнение?')){
    $.ajax({
      cache  : false,
      url		 : elem.attr('href'),
      success: function(data){
        $('.compare').removeClass("has-items");
        $('.count-compare').attr('data-count', '0').text("0");
        $('.addto__compare .addto__item').remove();
        $('.add-compare').removeAttr("title").removeClass("added");
      }
    });
  }
}

// Удаление товара из Избранного без обновлении страницы
function removeFromFavorites(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите удалить товар из Избранного?')){
    var href = elem.attr('href');
    var id = elem.attr('data-id');
    var oldCount = $('.count-favorites').attr('data-count');
		// Скрываем и удаляем товар из корзины
		elem.parents().find('.addto__favorites .addto__item[data-id="'+ id +'"]').fadeOut().remove();
    $.ajax({
      cache : false,
      url		: href,
      success: function(data){
        var newCount = oldCount - 1;
        $('.count-favorites').attr('data-count', newCount).text(newCount);
        var flag = 0;
        if(newCount != 0){
          $('.addto__favorites .addto__item').each(function(){
            if(flag == 0){
              if($(this).css('display') == 'none'){
                $(this).css('display', 'flex');
                flag++;
              }
            }
          });
        }else{
          $('.favorites').removeClass("has-items");
          $('.count-favorites').attr('data-count', '0').text('0');
        }
        var obj = $('.add-favorites[data-mod-id="' + id + '"]');
        if(obj.length) {
          obj.attr("data-action-is-add", "1")
          .removeAttr("title")
          .removeClass("added")
          .attr("href", obj.attr("href")
          .replace(obj.attr('data-action-delete-url'), obj.attr('data-action-add-url')));
        }
      }
    });
  }
}

// Удаление ВСЕХ товаров из Избранного без обновлении страницы
function removeFromFavoritesAll(elem){
  event.preventDefault();
  if(confirm('Вы точно хотите очистить Избранное?')){
    $.ajax({
      cache  : false,
      url		 : elem.attr('href'),
      success: function(d){
        $('.favorites').removeClass("has-items");
        $('.count-favorites').attr('data-count', '0').text("0");
        $('.addto__favorites .addto__item').remove();
        $('.add-favorites').removeAttr("title").removeClass("added");
      }
    });
  }
}



///////////////////////////////////////
// Функция показать все на главной
///////////////////////////////////////
function pdtVisible(id){
	var item = $(id).find('.product__item');
	var visible = $(id).find('.product__item:visible').length;

	// Кнопка показать все
	var button = $(id).find('.products__buttons a');
	
	// Скрываем кнопку показать все если мало товаров
	if (item.length > visible){
		button.parent().show()
	}else{
		button.parent().hide()
	}

	// Функция открытия скрытых товаров
	button.on('click', function (event){
		event.preventDefault();
		var t = $(this);
		var btnText = t.find('span');
		if(t.hasClass('active')){
			t.removeClass('active')
			$(id).removeClass('active')
			item.removeClass('show')
			btnText.text('Посмотреть всё')
			$('html, body').animate({scrollTop : $(id).offset().top}, 600);
		}else{
			t.addClass('active')
			$(id).addClass('active')
			item.addClass('show')
			btnText.text('Скрыть')
		}
	});
}


///////////////////////////////////////
// Отсчет даты до окончания акции
///////////////////////////////////////
function counterDate() {
	var id = $('.counter');
	// Если не найдет счетчик прекращаем работу функции
	if(!id.length){
		return false;
	}
	// Перебираем каждый счетчик
	id.each(function(){
		var t = $(this);
		// Устанавливаем дату обратного отсчета ММ-ДД-ГГ
		var expired = t.attr('data-expired');
		var countDownDate = new Date(expired).getTime();
		// Обновление счетчика каждую секунду
		var x = setInterval(function() {
			var now = new Date().getTime();
			var distance = countDownDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			// Вывод
			t.find('.days span').text(days);
			t.find('.hours span').text(hours);
			t.find('.minutes span').text(minutes);
			t.find('.seconds span').text(seconds);
			// Счетчик завершен
			if (distance < 0) {
				clearInterval(x);
				t.hide();
			}else{
				t.css({'display':'flex'});
				t.prev().hide();
			}
		}, 1000);
	})
}


///////////////////////////////////////
/* Скрипты для Товары, Категории */
///////////////////////////////////////
function catalog() {
	// Фильтры по товарам. При нажании на какую либо характеристику или свойство товара происходит фильтрация товаров
	$('.filter__item input').on('click', function(){
		$(this)[0].form.submit();
	});

	// Открытие/Скрытие фильтров в сайдбаре
	$('.collapsible__click').on('click', function(event){
		event.preventDefault();
		var item = $(this).closest('.collapsible');
		var content = $(this).parent().find('.collapsible__content');
		if (item.hasClass('active')) {
			content.slideDown(600);
			item.removeClass('active');
		} else {
			content.slideUp(600);
			item.addClass('active');
		}
	});

	// Сборосить категорию фильтра
	$('.filter__clear').on('click', function(event){
		event.preventDefault();
		var parent = $(this).closest('.filter__list');
		var checkboxes = parent.find('[type="checkbox"]')
		checkboxes.prop('checked', false).attr('checked', false);
		$('.form__filters')[0].submit();
	});
	
	// Фильтры открыть
	$('.filters__icon').on('click', function (event) {
		event.preventDefault();
		if($('#filters').hasClass('opened')){
			$(this).removeClass('opened');
			$('#filters').removeClass('opened');
			$('.products').removeClass('opened');
			$('.filters__icon').removeClass('opened');
		}else{
			$(this).addClass('opened');
			$('#filters').addClass('opened');
			$('.products').addClass('opened');
			$('.filters__icon').addClass('opened');
		}
	});

	// Фильтры поиск
	$('.filter__search').on('input', function() {
		var $items = $(this).next('.filter__items').children()
		var $checkboxes = $items.find('label');
		var itemsArray = $checkboxes.map(function () {return $(this).data('name').toLowerCase()}).toArray();
		var str = $(this).val();
		// Создаем массив результатов поиска
		var resultArray = itemsArray.map(function(item, i){ if(item.indexOf(str) >= 0){ return i }else{ return -1; } }).filter(function(item){ return item >= 0; });
		// Фильтруем результаты поиска
		$items.hide().filter(function(item) {
			var t = $(this);
			return resultArray.some(function(el){ return el === t.index() })
		}).show();
		// Стрелочные функции не работают в ИЕ
		// Создаем массив результатов поиска
		// var resultArray = itemsArray.map((item, i) => item.indexOf(str) >= 0 ? i : -1).filter(item => item >= 0);
		// Фильтруем результаты поиска
		// $items.hide().filter(function () {
		// 	return resultArray.some(el => el === $(this).index())
		// }).show();
	});

	// Фильтр по ценам
	function priceFilter() {
		var
			priceFilterMinAvailable = parseInt($('.goodsFilterPriceRangePointers .min').text()),  // Минимальное значение цены для фильтра
			priceFilterMaxAvailable = parseInt($('.goodsFilterPriceRangePointers .max').text()),  // Максимальное значение цены для фильтра
			priceSliderBlock = $('#goods-filter-price-slider'), // Максимальное значение цены для фильтра
			priceInputMin = $("#goods-filter-min-price"), // Поле ввода текущего значения цены "От"
			priceInputMax = $("#goods-filter-max-price"), // Поле ввода текущего значения цены "До"
			priceSubmitButtonBlock = $(".goodsFilterPriceSubmit");  // Блок с кнопкой, которую есть смысл нажимать только тогда, когда изменялся диапазон цен.
	
		// Слайдер, который используется для удобства выбора цены
		priceSliderBlock.slider({
			range: true,
			min: priceFilterMinAvailable,
			max: priceFilterMaxAvailable,
			values: [
				parseInt($('#goods-filter-min-price').val())
				,parseInt($('#goods-filter-max-price').val())
			],
			slide: function( event, ui ) {
				priceInputMin.val( ui.values[ 0 ] );
				priceInputMax.val( ui.values[ 1 ] );
				priceSubmitButtonBlock.css('display', 'flex');
			}
		});
		// При изменении минимального значения цены
		priceInputMin.keyup(function(){
			var newVal = parseInt($(this).val());
			if(newVal < priceFilterMinAvailable) {
				newVal = priceFilterMinAvailable;
			}
			priceSliderBlock.slider("values", 0, newVal);
			priceSubmitButtonBlock.css('display', 'flex');
		});
		// При изменении максимального значения цены
		priceInputMax.keyup(function(){
			var newVal = parseInt($(this).val());
			if(newVal > priceFilterMaxAvailable) {
				newVal = priceFilterMaxAvailable;
			}
			priceSliderBlock.slider("values", 1, newVal);
			priceSubmitButtonBlock.css('display', 'flex');
		});
	
		// Активный фильтр цены
		// if (priceInputMin.val() > priceFilterMinAvailable || priceInputMax.val() < priceFilterMaxAvailable) {
		// 	$('.filters-price').addClass('has-filters');
		// 	$('.toolbar').addClass('has-filters');
		// 	$('#filters').addClass('has-filters');
		// }else{
		// 	$('.filters-price').removeClass('has-filters');
		// 	$('.toolbar').removeClass('has-filters');
		// 	$('#filters').removeClass('has-filters');
		// }
	
	}

	priceFilter();

}


///////////////////////////////////////
// Открытие Контактов, Меню, Сравнения, Избранного
///////////////////////////////////////
function openMenu() {
	// Открытие каталога с сохранением вложенности
  $('.catalog__open').on('click', function(event){
    event.preventDefault();
    var parent = $(this).closest('.parent');
    var sub = $(this).parent().next('.catalog__sub');
    var open = $(this).closest('.catalog__open');
    if (parent.hasClass('opened')) {
      sub.slideUp(600);
      parent.removeClass('opened');
      open.removeClass('opened');
    } else {
      sub.slideDown(600);
      parent.addClass('opened');
      open.addClass('opened');
    }
  });

	// Закрытие всего при нажатии на темную часть
	$('#overlay').on('click', function(event){
		event.preventDefault();
		if($(this).hasClass('opened')){
			closeAll();
		}
	});

	// Открытие элементов
  $('[data-open]').on('click', function(event){
    event.preventDefault();
    var value = $(this).data('open');
    if ($('[data-content="'+ value +'"]').hasClass('opened')){
			$('[data-open]').removeClass('opened active')
			$('[data-content]').removeClass('opened')
    }else{
      $(this).addClass('opened active').parent().addClass('opened');
      $('[data-content="'+ value +'"]').addClass('opened').slideDown('slow');
    }
  });

	// Открытие Меню
  $('.header__menu, .fixed-sidebar__item.menu').on('click', function (event){
    event.preventDefault();
		$(this).toggleClass('opened');
		$('.popup').addClass('opened');
		$('.search').addClass('fadeOut');
		$('.mobmenu').removeClass('fadeOut');
  });

	// Открыть поиск
	$('.header__search').on('click', function(event){
		event.preventDefault();
		$('.popup').addClass('opened');
		$('.search').addClass('opened');
		$('.search').removeClass('fadeOut');
		$('.mobmenu').addClass('fadeOut');
	});

	// Открыть фиксированное меню
	$('.fixed-sidebar__icon').on('click', function(event){
		event.preventDefault();
		console.log(this)
		if($(this).hasClass('fixed-sidebar__icon--active')){
			$(this).removeClass('fixed-sidebar__icon--active')
			$(this).parent().removeClass('fixed-sidebar--active')
		}else{
			$(this).addClass('fixed-sidebar__icon--active')
			$(this).parent().addClass('fixed-sidebar--active')
		}
	});

}

// Сворачивание меню в мобильной версии
function mobmenu(){
	if(getClientWidth() < 1024){
		$('.mobmenu__title').off('click').on('click', function(event){
			event.preventDefault();
			$(this).next().slideToggle();
			$(this).parent().toggleClass('active');
		});
	}else{
		$('.mobmenu__content').attr('style', '')
		$('.mobmenu__title').off('click')
	}
}

// Функция удаления классов всех активных элементов
function closeAll() {
	$('div, a, form, span, nav, ul, li').removeClass('opened');
	$('.overflowMenu').removeClass('active');
	$('.search__reset').click();
	$('#overlay').click();
	setTimeout(function () {
		$('#overlay').removeClass('transparent');
		$('.search__reset').click();
		$('.search__input').blur(); 
		$('#overlay').click();
	},100)
}

// Переименование названий Месяца
function monthNames() {
	if ($('.month').length){
		$('.month').each(function (){
			if ($(this).text() === 'Jan') {
				$(this).text('Января')
			}else if ($(this).text() === 'Feb') {
				$(this).text('Февраля')
			}else if ($(this).text() === 'Mar') {
				$(this).text('Марта')
			}else if ($(this).text() === 'Apr') {
				$(this).text('Апреля')
			}else if ($(this).text() === 'May') {
				$(this).text('Мая')
			}else if ($(this).text() === 'Jun') {
				$(this).text('Июня')
			}else if ($(this).text() === 'Jul') {
				$(this).text('Июля')
			}else if ($(this).text() === 'Aug') {
				$(this).text('Августа')
			}else if ($(this).text() === 'Sep') {
				$(this).text('Сентября')
			}else if ($(this).text() === 'Oct') {
				$(this).text('Октября')
			}else if ($(this).text() === 'Nov') {
				$(this).text('Ноября')
			}else if ($(this).text() === 'Dec') {
				$(this).text('Декабря')
			}
		});
	}
}


///////////////////////////////////////
/* Валидаторы */
///////////////////////////////////////
// Валидаторы для Имени
function validName(id){
  var name = $(id).find('.form__person');
  if(name.val() != ''){
    name.removeClass('error');
    name.parent().removeClass('error');
    name.attr('placeholder','Введите Имя');
    return true;
  }else{
		setTimeout(function () {
			name.addClass('error');
			name.parent().addClass('error');
			name.attr('placeholder','Вы не ввели Имя');
		}, 2000);
    return false;
  }
}

// Валидаторы для телефона
function validPhone(id){
  var phone = $(id).find('.form__phone');
  var check = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{5,10}$/.test(phone.val());
  if(check == true && check != ''){
    phone.removeClass('error');
    phone.parent().removeClass('error');
    phone.attr('placeholder','Введите номер');
    return true;
  }
  else{
		setTimeout(function () {
			phone.addClass('error');
			phone.parent().addClass('error');
			phone.attr('placeholder','Вы не ввели номер');
		}, 2000);
		return false;
  }
}

// Валидаторы для почты
function validEmail(id){
  var email = $(id).find('.form__email');
  var check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.val());
  if(check == true && check != ''){
    email.removeClass('error');
    email.parent().removeClass('error');
    email.attr('placeholder','Введите Email');
    return true;
  }else{
		setTimeout(function () {
			email.addClass('error');
			email.parent().addClass('error');
			email.val('');
			email.attr('placeholder','Вы ввели неверный Email');
		}, 2000);
		return false;
  }
}


///////////////////////////////////////
/* Аякс Отправка формы без обновления страницы */
///////////////////////////////////////
function ajaxForms(id,flag,successMessage,errorMessage,subMessage){
	var flag = false;
  // console.log('ajaxForms loaded ', id)
  var form = $(id).find('.form__callback');
  form.on('submit',function(event){
    event.preventDefault();
		t = $(this);		
		if(!flag && validForm()){
			if(t.find('button').hasClass('disabled')){
				return false;
			}else{
				var url = t.prop('action');
				var formData = t.serializeArray();
				formData.push({name: 'ajax_q', value: 1});
				formData.push({name: 'only_body', value: 1});
				$.ajax({
					method: 'POST',
					cache: false,
					url: url,
					data: formData,
					success: function(d){
						var serverCall = JSON.parse(d).status;
						if(serverCall == "ok"){
							$.fancybox.close();
							var content = '<div class="modal success"><div class="block__title block__title-separator"><h2 class="title">'+ successMessage +'</h2><div class="subtitle">'+ subMessage +'</div></div></div>'
							$.fancybox.open(content);
							// Отмечаем успешную отправку
							flag = true;
							// Убираем флаг чтобы можно было еще раз отправить форму
							setTimeout(function () {
								$.fancybox.close();
							},3000);
							setTimeout(function () {
								flag = false;
							},8000);

						}else{
							// Ошибка статуса с сервера
							fromError(t)
						}
					},
					error: function(){
						// Ошибка отправки аякса
						fromError(t)
					}
				});
			}
		}else{
			// Ошибка флага
			fromError(t);
		}
  });

	// Функция ошибки
	function fromError(t){
		// Блокируем кнопку
		t.find('button').addClass('disabled')
		var text = t.find('button span').text()
		t.find('button span').text('Подождите')
		// Включаем кнопку отправки
		setTimeout(function () {
			t.find('button').removeClass('disabled')
			t.find('button span').text(text)
		},9000);
		
		// Уведомление
		new Noty({
			text: '<div class="noty__addto"><div class="noty__message">' + errorMessage + '</div></div>',
			layout:"center",
			type:"error",
			easing:"swing",
			animation: {
				open: 'animated fadeInUp',
				close: 'animated fadeOutDown',
				easing: 'swing',
				speed: 400
			},
			timeout:"4000",
			progressBar:true
		}).show();
	}

  // Валидация при клике
  function validForm(){
		if(validName(form) || validPhone(form) || validEmail(form)){
			return true
		}    
  }
}

// "Обратный звонок".
// ajaxForms('#callback','callbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.','Наш специалист свяжется с вами в ближайшее время')
// "Обратный звонок" в модальном окне.
ajaxForms('#fancybox__callback','fancyCallbackFlag','Запрос звонка успешно отправлен','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.','Наш специалист свяжется с вами в ближайшее время')
// "Обратная связь" в модальном окне.
ajaxForms('#fancybox__feedback','fancyFeedbackFlag','Запрос связи успешно отправлен','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')
// "Обратная связь".
ajaxForms('.form__feedback','feedbackFlag','Спасибо за обращение!','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')
// "Подписаться".
ajaxForms('.subscribe','subscribeFlag','Подписка успешно оформлена!','Вы уже отправляли запрос. Пожалуйста ожидайте.','Вы подписались на наши уведомления')
// "Уведомить" в модальном окне.
ajaxForms('#fancybox__notify','notifyFlag','Вы будете уведомлены о поступлении товара','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')
// "Обратный звонок".
ajaxForms('.page-сallback','pageCallbackFlag','Спасибо за обращение! Мы перезвоним вам в ближайшее время','Вы уже отправляли запрос. Пожалуйста ожидайте звонка.','Наш специалист свяжется с вами в ближайшее время')
// "Бронирование".
ajaxForms('#fancybox__book','bookFlag','Ваша заявка успешно отправлена!','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')
// "Слайдер".
ajaxForms('.slider__form','sliderFlag','Ваша заявка успешно отправлена!','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')
// "Забронировать в карточке товара".
ajaxForms('.productView','productViewFlag','Ваша заявка успешно отправлена!','Вы уже отправляли запрос. Пожалуйста ожидайте.','Наш специалист свяжется с вами в ближайшее время')


// Каталог на главной
function indexCatalog(){
  // Если каталог на главной
  if(catalog_full){
    var promises = $.map(catalog_full, function(el){
      return $.ajax(el.href + '?only_body=1&goods_view_type=2&per_page=20')
        .then(function(data){
          var container = $('.products__container.' + el.id);
          var parentContainer = container.find('.products__list .swiper-wrapper');
          var $data = $(data);
          var $newProducts = $data.find('.product__item').parent().html();
					var $desc = $data.filter('.htmlDataBlock');
					var name = $data.find('.product__item .product__name');
					name.each(function(){
						container.find('.products__nav-names .swiper-wrapper').append($(this).removeClass('product__name product__margin').addClass('swiper-slide products__nav-name'));
					})
					
          // Вывод товаров
          if(!parentContainer.find('.products__list').length){
            parentContainer.append($newProducts);
						container.find('.block__subtitle').html($desc)
          }

					// Добавляем класс для слайдера
					$('#pdt__cat .product__item').each(function(){
						$(this).addClass('swiper-slide')
					});
					
          // Загрузка скриптов
          addTo();
          addCart();
          quantity();
					swiperImage();
        });
    });
    $.when.apply(this, promises)
      .then(function(){
        // catalog_full = null;
        // $('.products-container').show();
      })
  }
}

// Слайдер на главной
function swiperShow(){
	var id = '#slideshow'
	var swiperPagination = new Swiper(id + ' .swiper-container', {
		slidesPerView: 'auto',
		watchSlidesVisibility: true,
		breakpoints: {
			0: {
				spaceBetween: 0,
				slidesPerView: '1',
			},
			320: {
				spaceBetween: 16,
				slidesPerView: '2',
			},
			480: {
				spaceBetween: 16,
				slidesPerView: '2',
			},
			640: {
				spaceBetween: 16,
				slidesPerView: '3',
			},
			768: {
				spaceBetween: 32,
				slidesPerView: '4',
			}
		}
	});

	var swiper = new Swiper(id + ' .swiper', {
		loop: true,
		preloadImages: false,
		watchSlidesVisibility: true,
		watchOverflow: true,
		hashNavigation: false,
		autoplay: {
			delay: 5000,
		},
		speed: 400,
		thumbs: {
			autoScrollOffset: 0,
			swiper: swiperPagination,
		},
		lazy: {
			enabled: false,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
	});
}

// Слайдер Медиа
function swiperMedia(){
	function updateMedia(t){
		var src = $(t.slides[t.realIndex].innerHTML).find('img').attr('src');
		var href = $(t.slides[t.realIndex].innerHTML).find('img').attr('data-href');
		$('.swiperMedia__images').find('img').attr('src', src)
		$('.swiperMedia__images').find('a').attr('href', href)
		$('.swiperMedia__count b').text(t.realIndex + 1);
		$('.swiperMedia__count span').text(t.slides.length / 3)
	}

	var swiperContent = new Swiper('.swiperMedia__content-container', {
		slidesPerView: '1',
		spaceBetween: 16,
		loop: true,
		allowTouchMove: false,
		autoHeight: true,
		navigation: {
			prevEl: '.swiperMedia__nav-prev',
			nextEl: '.swiperMedia__nav-next',
		},
	});

	var swiper = new Swiper('.swiperMedia__swiper-container', {
		slidesPerView: 'auto',
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		loop: true,
		autoplay: false,
		spaceBetween: 16,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadPrevNextAmount: '4',
			loadOnTransitionStart: true,
		},
		navigation: false,
		slideToClickedSlide: true,
		navigation: {
			prevEl: '.swiperMedia__nav-prev',
			nextEl: '.swiperMedia__nav-next',
		},
		on: {
			init: function(){
				updateMedia(this)
			},
			slideChangeTransitionStart: function(){
				$('.swiperMedia__images').removeClass('swiperMedia__images--load');
				swiperContent.slideToLoop(this.realIndex);
				updateMedia(this)
			},
			slideChange: function(){
				updateMedia(this)
			},
			slideChangeTransitionEnd: function(){
				$('.swiperMedia__images').addClass('swiperMedia__images--load');				
			},
		}
	});

}

// Слайдер Фотогаллерея
function swiperGallery(){
	var swiperGalleryOne = new Swiper("#gallery .gallery__swiper-one", {
		loop: true,
		autoplay: {
			deleay: 2000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		spaceBetween: 16,
		watchSlidesVisibility: true,
		breakpoints: {
			320: {
				slidesOffsetBefore: 20,
				slidesOffsetAfter: 20,
				centeredSlides: true,
			},
			480: {
			},
			640: {
				slidesOffsetBefore: 30,
				slidesOffsetAfter: 30,
			},
			768: {
			},
			1024: {
				slidesOffsetBefore: 60,
				slidesOffsetAfter: 60,
			},
			1200: {
				centeredSlides: false,
			}
		}
	});

	var swiperGalleryTwo = new Swiper("#gallery .gallery__swiper-two", {
		loop: true,
		autoplay: {
			deleay: 4000,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		spaceBetween: 16,
		watchSlidesVisibility: true,
		breakpoints: {
			320: {
				slidesOffsetBefore: 30,
				slidesOffsetAfter: 30,
				centeredSlides: true,
			},
			480: {
			},
			640: {
			},
			768: {
			},
			1024: {
				slidesOffsetBefore: 60,
				slidesOffsetAfter: 60,
			},
			1200: {
				centeredSlides: false,
			}
		}
	});
}

// Распродажа
function swiperSales() {
	var id = '#pdt__sales'
	function updateMedia(t){
		var newCount = t.snapGrid.length;
		var newIndex = t.realIndex + 1;
		var total = $(id).find('.swiper-pagination-total');
		var current = $(id).find('.swiper-pagination-current');

		if (newCount > 9){
			total.text(newCount);
		}else{
			total.text('0' + newCount);
		}

		if (newIndex > 9){
			current.text(newIndex);
		}else{
			current.text('0' + newIndex);
		}
		
		// Скрываем навигацию если слайдер заблокирован
		$(id).find('.swiper-pagination-lock').parent().addClass('swiper-pagination-lock')
	}

	var swiper = new Swiper(id + ' .products__list', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		slidesPerView: 1,
		spaceBetween: 16,
		simulateTouch: true,
		grabCursor: true,
		navigation: {
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		pagination: {
			el: id + ' .swiper-progressbar',
    	type: 'progressbar',
		},
		on: {
			init: function(){
				updateMedia(this)
			},
			slideChangeTransitionStart: function(){
				updateMedia(this)
			},
			slideChange: function(){
				updateMedia(this)
			},
		}
	});
}

// Новости
function swiperNews() {
	var id = '#news'
	function updateMedia(t){
		var newCount = t.snapGrid.length;
		var newIndex = t.realIndex + 1;
		var total = $(id).find('.swiper-pagination-total');
		var current = $(id).find('.swiper-pagination-current');

		if (newCount > 9){
			total.text(newCount);
		}else{
			total.text('0' + newCount);
		}

		if (newIndex > 9){
			current.text(newIndex);
		}else{
			current.text('0' + newIndex);
		}

		// Скрываем навигацию если слайдер заблокирован
		$(id).find('.swiper-pagination-lock').parent().addClass('swiper-pagination-lock')
	}

	var swiper = new Swiper("#news .swiper__container", {
		loop: false,
		autoplay: {
			deleay: 6000,
			pauseOnMouseEnter: true,
		},
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '2',
		spaceBetween: 16,
		preloadImages: false,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: '.swiper-progressbar',
    	type: 'progressbar',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '3',
			},
			768: {
				slidesPerView: '3',
			},
			1024: {
				slidesPerView: '3',
			},
			1200: {
				slidesPerView: '2',
			}
		},
		on: {
			init: function(){
				updateMedia(this)
			},
			slideChangeTransitionStart: function(){
				updateMedia(this)
			},
			slideChange: function(){
				updateMedia(this)
			},
		}
	});
}

// Услуги
function swiperServices() {
	var id = '#services'
	function updateMedia(t){
		var newCount = t.snapGrid.length;
		var newIndex = t.realIndex + 1;
		var total = $(id).find('.swiper-pagination-total');
		var current = $(id).find('.swiper-pagination-current');

		if (newCount > 9){
			total.text(newCount);
		}else{
			total.text('0' + newCount);
		}

		if (newIndex > 9){
			current.text(newIndex);
		}else{
			current.text('0' + newIndex);
		}
		
		// Скрываем навигацию если слайдер заблокирован
		$(id).find('.swiper-pagination-lock').parent().addClass('swiper-pagination-lock')
	}

	var swiper = new Swiper(id + ' .swiper__container', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '4',
		spaceBetween: 16,
		navigation: {
			nextEl: id + ' .swiper-button-next',
			prevEl: id + ' .swiper-button-prev',
		},
		pagination: {
			el: id + ' .swiper-progressbar',
    	type: 'progressbar',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '2',
			},
			768: {
				slidesPerView: '3',
			},
			1024: {
				slidesPerView: '4',
			},
			1200: {
				slidesPerView: '4',
			}
		},
		on: {
			init: function(){
				updateMedia(this)
			},
			slideChangeTransitionStart: function(){
				updateMedia(this)
			},
			slideChange: function(){
				updateMedia(this)
			},
		}
	});
}

// Слайдер товаров из категории на главной
function swiperCat(){
	// Включаем функцию для каждой категории
	$('.products__container[data-id]').each(function(){
		var id = $(this).attr('data-id');
		swiperCatSlider('.pdt__cat-' + id,'swiper' + id,'swiperDots' + id)
	})

	// Функция слайдера
	function swiperCatSlider(id,swiper,swiperDots){

		// Навигация товаров
		var swiperDots = new Swiper(id +' .products__nav-names', {
			loop: true,
			autoplay: false,
			watchSlidesVisibility: true,
			simulateTouch: true,
			grabCursor: true,
			slideToClickedSlide: true,
			slidesPerView: 'auto',
			spaceBetween: 48,
			preventClicks: true,
			watchOverflow: true,
			on: {
				init: function(){
					// Отключаем переход на товар по клику
					this.$el.find('.swiper-slide').on('click', function(e){
						e.preventDefault()
					})
				}
			}
		});

		// Основной товар
		var swiper = new Swiper(id +' .products__list', {
			loop: true,
			autoplay: false,
			watchSlidesVisibility: true,
			simulateTouch: true,
			grabCursor: true,
			slideToClickedSlide: true,
			slidesPerView: 1.1,
			spaceBetween: 16,
			preventClicks: true,
			watchOverflow: true,
			navigation: {
				nextEl: id +' .products__nav-next',
				prevEl: id +' .products__nav-prev',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 1.3,
				},
				480: {
					slidesPerView: 1.2,
				},
				640: {
					slidesPerView: 1.1,
				},
			},
			on: {
				init: function(){
					// Если 1 товар в слайдере
					if(this.slides.length < 4){
						$(id +' .products__nav').parent().addClass('swiper-one')
						this.loopDestroy();
						swiperDots.loopDestroy();
					}
				}
			}
		});

		// Совместная смена слайдов
		swiper.on('slideChange', function(){
			swiperDots.slideToLoop(this.realIndex);
		});
		swiperDots.on('slideChange', function(){
			swiper.slideToLoop(this.realIndex);
		});
	}
	
}

// Функция слайдера в изображениях у товаров
function swiperImage(){
	// Включаем функцию для каждого товара
	$('.product__item').each(function(){
		var id = $(this).attr('data-id');
		swiperImageSlider('.product__image-' + id,'swiper' + id)
	})

	// Функция слайдера
	function swiperImageSlider(id,swiper){
		// Основной слайдер
		var swiper = new Swiper(id, {
			loop: false,
			autoplay: false,
			watchSlidesVisibility: true,
			simulateTouch: true,
			grabCursor: true,
			slideToClickedSlide: true,
			slidesPerView: '1',
			spaceBetween: 0,
			preventClicks: true,
			watchOverflow: true,
			preloadImages: false,
			nested: true,
			lazy: {
				enabled: true,
				loadPrevNext: true,
				loadOnTransitionStart: true,
			},
			pagination: {
				el: id +' .swiper-pagination',
				type: 'bullets',
				dynamicBullets: true,
				clickable: true,
			},
			navigation: {
				nextEl: id +' .swiper-button-next',
				prevEl: id +' .swiper-button-prev',
			},
		});
	}

}

// Функции стандартного слайдера
function swiperSlider(id){
	// Обновление данных
	function updateMedia(t){
		var newCount = t.snapGrid.length;
		var newIndex = t.realIndex + 1;
		var total = $(id).find('.swiper-pagination-total');
		var current = $(id).find('.swiper-pagination-current');

		if (newCount > 9){
			total.text(newCount);
		}else{
			total.text('0' + newCount);
		}

		if (newIndex > 9){
			current.text(newIndex);
		}else{
			current.text('0' + newIndex);
		}

		// Скрываем навигацию если слайдер заблокирован
		$(id).find('.swiper-pagination-lock').parent().addClass('swiper-pagination-lock')
	}

	// Слайдер товаров
	var swiper = new Swiper(id + ' .products__grid', {
		loop: false,
		autoplay: false,
		watchSlidesVisibility: true,
		simulateTouch: true,
		grabCursor: true,
		slidesPerView: '4',
		spaceBetween: 16,
		nested: true,
		preloadImages: false,
		lazy: {
			enabled: true,
			loadPrevNext: true,
			loadOnTransitionStart: true,
		},
		navigation: {
			nextEl: id + ' .swiper-navigate .swiper-button-next',
			prevEl: id + ' .swiper-navigate .swiper-button-prev',
		},
		pagination: {
			el: id + ' .swiper-navigate .swiper-progressbar',
    	type: 'progressbar',
		},
		breakpoints: {
			0: {
				slidesPerView: '1',
			},
			320: {
				slidesPerView: '1',
			},
			480: {
				slidesPerView: '2',
			},
			640: {
				slidesPerView: '2',
			},
			768: {
				slidesPerView: '2',
			},
			1024: {
				slidesPerView: '3',
			},
			1200: {
				slidesPerView: '4',
			}
		},
		on: {
			init: function(){
				updateMedia(this)
			},
			slideChangeTransitionStart: function(){
				updateMedia(this)
			},
			slideChange: function(){
				updateMedia(this)
			},
		}
	});

}


///////////////////////////////////////
// Загрузка основных функций шаблона
///////////////////////////////////////
$(document).ready(function(){
	userAgent();
	showPass();
	openMenu();
	addTo();
	addCart();
	// quickViewMod();
	toTop();
	cartSaleSum();
	swiperNews();
	swiperImage()
	mobmenu()
  mainnav('header .mainnav', '1', 991);
	setTimeout(function () {
		swiperCat();
		priceDiff('.product__item', 'percent');
	}, 2000);
	// Удаление классов загрузки для элементов страницы
	$('.loading').addClass('loaded');
	$('div, section, ul').removeClass('loading');

	// Добавление товара в корзину
	// $('.add-cart').on('click', function() {
	// 	var form = $(this).closest('form');
	// 	if ($(this).hasClass('quick')) {
	// 		form.attr('rel', 'quick');
	// 	} else {
	// 		var rel = form.attr('rel');
	// 		if (rel) {
	// 			form.attr('rel', rel.replace('quick', ''));
	// 		}
	// 	}
	// 	form.trigger('submit');
	// 	return false;
	// });

	// Уведомить при отсутствии товара
	$('.add-notify').on('click', function(){
		var formBlock = $(this).closest('.product__form');
    var goodsMod = formBlock.find('[name="form[goods_mod_id]"]').val();
    $('#fancy-notify-goods-mod').val(goodsMod)
	});

	// Отправка формы по Ctrl+Enter
  $('form').bind('keypress', function(e){
    if((e.ctrlKey) && ((e.which==10)||(e.which==13))) {$(this).submit();}
    // Отправка данных формы по нажатию на Enter в случае если курсор находится в input полях (В некоторых браузерах при нажатии по enter срабатывает клик по первому submit полю, которое является кнопкой назад. Для этого написан этот фикс)
  }).find('input').bind('keypress', function(e){
    if(((e.which==10)||(e.which==13))) { try{$(this.form).submit();} catch(e){} return false; }
  });

  // Маска ввода телефона
  $(".form__phone").mask("+7 (999) 999-9999");

  // Возврашаем пользователя на страницу с которой был сделан обратный звонок
  $('.callbackredirect').val(document.location.href);
	
	// Выбор даты доставки. Документация к плагину //t1m0n.name/air-datepicker/docs/index-ru.html
	$(".form__date").datepicker({
		// Если true, то при активации даты, календарь закроется.
		autoClose: true,
		// Можно выбрать только даты, идущие за сегодняшним днем, включая сегодня
		minDate: new Date(),
		// Выбор даты от и до
		range: true,
		toggleSelected: false,
		multipleDatesSeparator: ' - '
	});

});
 
// Запуск функций при изменении экрана
$(window).resize(function(){
	mobmenu()
  if(getClientWidth() > 481 && window.outerHeight < 630){
    $('body').addClass('landscape');
  }else{
    $('body').removeClass('landscape');
  }
  mainnav('header .mainnav', '1', 991);
});
