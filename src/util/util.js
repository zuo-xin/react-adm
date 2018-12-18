import {message} from 'antd'
import store from '../store'
const util = {
	ajaxSubmit: function (param) {
		var xhr = new XMLHttpRequest(),
			type = param.type || 'post',
			url = param.url
		if (type === 'get' && param.data) {
			var strArr = []
			for (var key in param.data) {
				if (param.data.hasOwnProperty(key)) {
					strArr.push(key + '=' + param.data[key])
				}
			}
			url = url + '?' + strArr.join('&')
		}
		xhr.open(type, url, true);
		if (!param.data) {
			param.data = {};
		}
		xhr.onreadystatechange = function () {
			var s;
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					try {
						s = JSON.parse(xhr.responseText);
					} catch (e) {}
					if (s) {
						if (s.ret == 200) {
							if (typeof param.success === 'function') {
								param.success(s)
							}
						} else {
							if (typeof param.error === 'function') {
								param.error(s);
							} else if (!param.silent) {
								message.error(s.msg, 'error');
							}
						}
					} else {
						if (typeof param.error === 'function') {
							param.error(xhr, 'parse_error');
						} else if (!param.silent) {
							message.error('数据解析失败: ' + xhr.responseText, 'error');
						}
					}
				} else {
					if (typeof param.error === 'function') {
						param.error(xhr, 'network_error');
					} else if (!param.silent) {
						message.error('网络或服务器错误: ' + xhr.status, 'error');
					}
				}
				if (typeof param.complete === 'function') {
					param.complete(xhr);
				}
				if (!param.silent) {
					//kernel.hideLoading();
				}
			}
		};
		if (param.data instanceof FormData) {
			//xhr.setRequestHeader('Content-Type', 'multipart/form-data');
			xhr.send(param.data);
		} else {
			xhr.setRequestHeader('content-type', 'application/json');
			xhr.send(JSON.stringify(param.data));
		}
		if (!param.silent) {
			//kernel.showLoading();
		}
	},
	moneyFormat: function (money, refix, precision, n) {
		var prefix;
		if (isFinite(money)) {
			money = parseFloat(money);
		} else {
			money = 0;
		}
		if (money < 0) {
			money = money * -1;
			prefix = '-';
		}
		if (refix) {
			if (money >= 10000 * 10000) {
				money = toFloat(money / (10000 * 10000), precision) + '亿';
			} else if (money >= 10000) {
				money = toFloat(money / 10000, precision) + '万';
			} else {
				money = toFloat(money, precision);
			}
		} else {
			money = splitMoney(toFloat(money, precision), isFinite(n) ? n : 3);
		}
		if (prefix && parseFloat(money) > 0) {
			money = prefix + money;
		}
		return money;

		function splitMoney(money, n) {
			var i, tmp = money.split('.');
			n = parseInt(n);
			if (tmp.length > 1) {
				money = '.' + tmp[1];
			} else {
				money = '';
			}
			for (i = 0; i < tmp[0].length; i += n) {
				if (i < tmp[0].length - n) {
					money = ',' + tmp[0].substr(-n - i, n) + money;
				} else {
					money = tmp[0].substr(0, tmp[0].length - i) + money;
				}
			}
			return money;
		}

		function toFloat(money, precision) {
			if (!isFinite(precision)) {
				if (money % 1) {
					precision = 2;
				} else {
					precision = 0;
				}
			}
			var i, p = Math.pow(10, precision);
			money = (Math.round(money * p) / p).toString();
			if (precision > 0) {
				i = money.split('.')[1];
				for (i = i ? i.length : 0; i < precision; i++) {
					if (i === 0) {
						money += '.';
					}
					money += '0';
				}
			}
			return money;
		}
	},
	formatDate: function (time) {
		if (time <= 0) return '';
		var t, y, m, d, h, i, s;
		t = new Date(time * 1000);
		y = t.getFullYear();
		m = t.getMonth() + 1;
		if (m < 10) m = '0' + m;
		d = t.getDate();
		if (d < 10) d = '0' + d;
		return y + '-' + m + '-' + d;
	},
	formatTime: function (time) {
		if (time <= 0) return '--';
		var t, y, m, d, h, i, s;
		t = new Date(time * 1000);
		y = t.getFullYear();
		m = t.getMonth() + 1;
		if (m < 10) m = '0' + m;
		d = t.getDate();
		if (d < 10) d = '0' + d;
		h = t.getHours();
		if (h < 10) h = '0' + h;
		i = t.getMinutes();
		if (i < 10) i = '0' + i;
		s = t.getSeconds();
		if (s < 10) s = '0' + s;
		return y ? y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s : '--';
	},
	
	formatTimeDiff: function (time, min) {
		var i, a, u,
			s = [Math.floor(time / (3600 * 24)), Math.floor(time / 3600) % 24, Math.floor(time / 60) % 60, Math.floor(time) % 60];
		if (min) {
			u = ['天', '小时', '分钟', '秒'];
			for (i = 0; i < s.length; i++) {
				if (s[i] > 0) {
					return s[i] + u[i];
				}
			}
			return '刚才';
		} else {
			u = ['天', '时', '分', '秒'];
			a = false;
			for (i = 0; i < s.length; i++) {
				if (!a) {
					if (s[i] > 0) {
						s[i] = s[i] + u[i];
						a = true;
					} else {
						s[i] = '';
					}
				} else {
					s[i] += u[i];
				}
			}
			return s.join('');
		}
	},
	
	isNullObj: function (obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				return false;
			}
		}
		return true;
	},
	
	setCookie: function (c_name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + '; path=/' + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	},
	getCookie: function (c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	},
	
	paging: function (dom, currentpage, listnum, pagenum) {
		var total, first, last, previous, next, i, k, j, item;
		if (listnum > pagenum) {
			dom.find('.item').remove();
			dom.find('a').off('click');
			total = Math.ceil(listnum / pagenum);
			first = dom.find('.first');
			last = dom.find('.last');
			previous = dom.find('.previous');
			next = dom.find('.next');
			dom.find('.listnum').text(listnum);
			dom.find('.total').text(total);
			dom.find('.select_pagelist').off('change')
			dom.find('.select_pagelist').val(pagenum).on('change', function () {
				var $this = $(this)
				var loc = util.clone(kernel.location)
				delete loc.args.p
				location.assign(kernel.buildHash(loc))
				util.setCookie('pagenum', $this.val())
				kernel.reloadPage()
			})
			if (currentpage == 1) {
				first.addClass('disabled');
				previous.addClass('disabled');
			} else {
				first.removeClass('disabled');
				first.on('click', function () {
					var loc = util.clone(kernel.location);
					loc.args.p = 1;
					location.assign(kernel.buildHash(loc));
				});
				previous.removeClass('disabled');
				previous.on('click', function () {
					var loc = util.clone(kernel.location);
					loc.args.p = currentpage - 1;
					location.assign(kernel.buildHash(loc));
				});
			}
			if (currentpage == total) {
				last.addClass('disabled');
				next.addClass('disabled');
			} else {
				last.removeClass('disabled');
				last.on('click', function () {
					var loc = util.clone(kernel.location);
					loc.args.p = total;
					location.assign(kernel.buildHash(loc));
				});
				next.removeClass('disabled');
				next.on('click', function () {
					var loc = util.clone(kernel.location);
					loc.args.p = currentpage + 1;
					location.assign(kernel.buildHash(loc));
				});
			}
			j = Math.max(currentpage - 5, 1);
			k = Math.min(currentpage + 4, total);
			while (k - j < 9 && (j > 1 || k < total)) {
				if (j > 1) {
					j--;
				} else {
					k++;
				}
			}
			for (i = j; i <= k; i++) {
				item = $('<a href="javascript:;" class="item">' + i + '</a>');
				if (i == currentpage) {
					item.addClass('active');
				}
				item.on('click', pageItemClick);
				next.before(item);
			}
			dom.css('display', '');
		} else {
			dom.css('display', 'none');
		}
	},
	isNullObj(obj){
		for(var attr in obj){
			return true
		}
		return false
	}
};


export default util