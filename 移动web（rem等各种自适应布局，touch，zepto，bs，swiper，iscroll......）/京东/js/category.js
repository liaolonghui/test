// rem    简单划分为16份
document.documentElement.style.fontSize = document.documentElement.clientWidth / 16;
document.body.fontSize = '16px';
window.onresize = function(){
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 16;
};