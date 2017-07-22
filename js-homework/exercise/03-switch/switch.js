var num = prompt('请输入一段文字');
var int = parseInt(num);
if (num == int) {
    if (int % 2 === 0) {
        alert('这是一个偶数');
    } else {
        alert('这是一个奇数');
    }
} else {
    alert('这不是一个整数');
}