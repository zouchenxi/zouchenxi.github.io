var num = parseInt(prompt('请输入一个数字(当输入0时求他们的和)'));
var sum = 0;
while (num !== 0) {
    sum += num;
    num = parseInt(prompt('请输入一个数字'));
}
alert('全部求和值为' + sum);