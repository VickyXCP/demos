/*
* 如何判断元素是否在可视区域内
* 方法一：
* 通过document.documentElement.clientHeight获取可视窗口高度
* 通过document.documentElement.scrollTop获取浏览器窗口顶部与文档顶部之间的距离（滚动条滚动距离）
* 通过element.offsetTop获取元素相当于文档顶部的距离
* 第三步减去第二补的值如果大于第一步的值就在窗口内部
* 方法二：
* 通过getBoundingClientRect()方法来获取元素的大小以及位置
* The Element.getBoundingClientRect() method returns the size of an element and its
* position relative to the viewport.（详见MDN）（所有的返回值都是相当于文档左上角而言，而非边距）
* */

const divs = document.getElementsByTagName('img')
console.log(divs)
const arr = toArray(divs)
console.log(arr)

function toArray (s) {
	try {
		return Array.prototype.slice.call(s);
	} catch (e) {
		let arr = [];
		for (let i = 0, len = s.length; i < len; i++) {
			//arr.push(s[i]);
			arr[i] = s[i];     //据说这样比push快
		}
		return arr;
	}
}
