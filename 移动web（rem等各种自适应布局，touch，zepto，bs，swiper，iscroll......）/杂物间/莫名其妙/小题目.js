function Foo(){
  getName = function(){
    console.log(1);
  };
  console.log(this)
  return this;
}
Foo.getName = function(){
  console.log(2);
};
Foo.prototype.getName = function(){
  console.log(3);
};
var getName = function(){
  console.log(4);
};
function getName(){
  console.log(5);
};


Foo.getName();
// 调用Foo上的getName。                                                      输出2
getName();
// 因为用function声明函数会声明赋值提前，所以会被后面的字面量形式声明函数覆盖。      输出4
Foo().getName();
// 虽然.的优先级高，但是()不能用.来执行，所以先执行Foo()，返回的是this（此时的this指向了调用Foo的window）。       输出1
getName();
// 前面这条语句执行完后改变了全局的getName函数。                                  输出1
new Foo.getName();
// .的优先级高，所以是以Foo.getName为构造函数。                                 输出2
new Foo().getName();
// 先执行new Foo()返回实例,调用用实例上的getName。                             输出3
new new Foo().getName();
// 先执行new Foo(), 然后以返回的实例的getName为构造函数。                      输出3