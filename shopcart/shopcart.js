window.onload = function () {
	function Cart () {
		this.allBtn = document.querySelectorAll ('.btn')
		this.number = document.querySelector ('.number')
		this.price = document.querySelector('.price')
		this.expensive = document.querySelector ('.expensive')
		this.total = 0
	}

//	小计
	Cart.prototype.getSubTotal = function (goodsNum, unitPrice) {
		return parseInt (goodsNum) * parseFloat (unitPrice)
	}
//	总计
	Cart.prototype.getTotal = function () {
		var subTotals = document.querySelectorAll ('.sub-total')
		var res = 0
		for (let i = 0, len = subTotals.length; i < len; i ++) {
			res += parseFloat (subTotals[i].textContent)
		}
		return res
	}
//	寻找购物车中已选中产品的最大单价
	Cart.prototype.findMax = function () {
		var allNum = document.querySelectorAll ('.num')
		var allUnit = document.querySelectorAll ('.unit')
		var temp = 0
		for (let i = 0, len = allNum.length;i<len; i ++) {
			if (allNum[i].textContent != 0) {
				if (temp < parseFloat (allUnit[i].textContent)) {
					temp = parseFloat (allUnit[i].textContent)
				}
			}
		}
		return temp
	}

//	点击+ 号
	Cart.prototype.plus = function (btn) {
		var num = btn.parentNode.querySelector ('.num')
		var n = parseInt (num.textContent)
		num.textContent = ++ n
		this.total ++
		var unit = btn.parentNode.parentNode.parentNode.querySelector ('.unit')
		var subTotal = btn.parentNode.parentNode.parentNode.querySelector ('.sub-total')
		subTotal.textContent = this.getSubTotal (num.textContent, unit.textContent)
		this.number.textContent = this.total
		this.price.textContent = this.getTotal ()
		this.expensive.textContent = this.findMax ()
	}
	
//	获取已买产品的总数
	Cart.prototype.getNumber = function () {
		var allNum = document.querySelectorAll ('.num')
		var number = 0
		for (let i = 0; i < allNum.length; i ++) {
			if (allNum[i] > 0) {
				number += parseInt(allNum[i].value)
			}
		}
		return number
	}
	//	点击- 号
	Cart.prototype.minus = function (btn) {
		var num = btn.parentNode.querySelector ('.num')
		if (parseInt (num.textContent) > 0) {
			var n = parseInt (num.textContent)
			num.textContent = -- n
			this.total --
			var unit = btn.parentNode.parentNode.parentNode.querySelector ('.unit')
			var subTotal = btn.parentNode.parentNode.parentNode.querySelector ('.sub-total')
			subTotal.textContent = this.getSubTotal (num.textContent, unit.textContent)
			this.number.textContent = this.total
			
			this.price.textContent = this.getTotal ()
			this.expensive.textContent = this.findMax ()
		}
	}
	
//	删除
	Cart.prototype.del = function(btn){
		var del = btn.parentNode.parentNode
		var parent = del.parentNode
		parent.removeChild(del)
		this.number.textContent = this.total
		
		this.price.textContent = this.getTotal ()
		this.expensive.textContent = this.findMax ()
		this.sort()
	}
	
//	排序
	Cart.prototype.sort = function(){
		var sort = document.querySelectorAll('.sort')
		for(let i =0, len = sort.length;i<len;i++){
			sort[i].textContent = i+1
		}
	}
	
//	绑定事件
	Cart.prototype.bind = function(){
		var that = this
		for(var i=0;i<this.allBtn.length;i++){
			if(i%2!=0){
				this.allBtn[i].onclick=function () {
					that.plus(this)
				}
			}else{
				this.allBtn[i].onclick = function(){
					that.minus(this)
				}
			}
		}
		var delBtn = document.querySelectorAll('.del')
		for(var i=0;i<delBtn.length;i++){
			delBtn[i].onclick =function () {
				that.del(this)
			}
		}
	}
	
	var cart = new Cart()
	cart.bind()
}