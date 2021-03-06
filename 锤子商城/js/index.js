// 下载APP
let topNav = document.getElementById('top_nav')
topNav.children[topNav.children.length-1].onmouseover = function() {
  document.getElementById('download').style.display = 'block'
}
topNav.children[topNav.children.length-1].onmouseout = function() {
  document.getElementById('download').style.display = 'none'
}

// search
document.getElementById('search').onfocus = function() {
  this.placeholder = '请输入搜索的商品'
  document.getElementById('items').style.display = 'none'
}
document.getElementById('search').onblur = function() {
  this.placeholder = ''
  document.getElementById('items').style.display = 'block'
}

// 下拉菜单
let lis = document.querySelectorAll('.header .list ul li')
let boxs = document.querySelectorAll('.header .list .show-box div')

for (let index = 0; index < lis.length; index++) {
  lis[index].onmouseenter = function(){
    for (let i = 0; i < boxs.length; i++) {
      boxs[i].style.display = 'none'
    }
    boxs[index].style.display = 'block'
  }
}

// 轮播图
navItems = document.querySelectorAll('.nav-items img')
let i = 0
let prev = 0
// 动画效果
function animationOpacity() {
  clearInterval(navItems[i].timer)
  navItems[i].style.display = 'block'
  navItems[i].timer = setInterval(function(){
    let currentOpacity = getCurrentOpacity(navItems[i])
    if (currentOpacity == 1) {
      clearInterval(navItems[i].timer)
      for (let index = 0; index < navItems.length; index++) {
        if (index !== i) {
          navItems[index].style.display = 'none'
          navItems[index].style.opacity = 0
          spans[index].classList.remove('active')
        } else {
          spans[index].classList.add('active')
        }
      }
      return;
    }
    navItems[i].style['opacity'] = (currentOpacity * 100 + 1)/100
    navItems[prev].style['opacity'] = 1 - (currentOpacity * 100 + 1)/100
  },5)
}
// 循环
function loop() {
  i++
  if (i > 4) {
    i = 0
    prev = 4
  } else {
    prev = i - 1
  }
  animationOpacity()
}
function getCurrentOpacity(obj) {
  if (obj.currentStyle) {
    return obj.currentStyle.opacity
  } else {
    return getComputedStyle(obj, null).opacity
  }
}
// 启动轮播
let timer = setInterval(loop, 2000)
document.getElementById('nav_items').onmouseover = function() {
  clearInterval(timer)
}
document.getElementById('nav_items').onmouseout = function() {
  timer = setInterval(loop, 2000)
}
// 按钮（向左/向右）
document.getElementById('lt').onclick = function() {
  i--
  if (i < 0) {
    i = 4
    prev = 0
  } else {
    prev = i + 1
  }
  animationOpacity()
}
document.getElementById('lt').onmouseover = function() {
  clearInterval(timer)
}
document.getElementById('lt').onmouseout = function() {
  timer = setInterval(loop, 2000)
}
document.getElementById('gt').onclick = function() {
  i++
  if (i > 4) {
    i = 0
    prev = 4
  } else {
    prev = i - 1
  }
  animationOpacity()
}
document.getElementById('gt').onmouseover = function() {
  clearInterval(timer)
}
document.getElementById('gt').onmouseout = function() {
  clearInterval(timer)
  timer = setInterval(loop, 2000)
}
// 轮播图的index
const spans = document.querySelectorAll('.nav-items>.index>span')
for (let index = 0; index < spans.length; index++) {
  spans[index].onclick = function(){
    i = index
    for (let index = 0; index < navItems.length; index++) {
      if (index !== i) {
        navItems[index].style.display = 'none'
        navItems[index].style.opacity = 0
        spans[index].classList.remove('active')
      } else {
        navItems[index].style.display = 'block'
        navItems[index].style.opacity = 1
        spans[index].classList.add('active')
      }
    }
  }
}


window.onscroll = function(){
  if (document.documentElement.scrollTop > 45) {
    document.querySelector('.header .list').style.position = 'fixed'
    document.querySelector('.header .list').style.top = 0
    document.querySelector('.header .list').style.zIndex = 999
  } else {
    document.querySelector('.header .list').style.position = 'static'
    document.querySelector('.header .list').style.top = '0'
    document.querySelector('.header .list').style.zIndex = 'auto'
  }
}