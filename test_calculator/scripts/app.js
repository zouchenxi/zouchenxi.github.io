(function () {

    const RESULT_CONTENT_MAXWIDTH_PERCENTAGE = 1 - 0.07 * 2;

    // 获取网页各类元素
    let $result = document.querySelector('.calculator-result');                 //获取显示框元素
    let $expr = document.querySelector('.expr');                                //获取输入栏元素
    let $formula = document.querySelector('.formula');                          //获取计算公式元素
    let $numbers = document.querySelectorAll('.calculator-keybutton.number');   //获取所有数字按钮元素
    let $plus = document.querySelector('.calculator-keybutton.plus');           //获取“加号”按钮元素
    let $minus = document.querySelector('.calculator-keybutton.minus');         //获取“减号”按钮元素
    let $multiply = document.querySelector('.calculator-keybutton.multiply');   //获取“乘号”按钮元素
    let $divide = document.querySelector('.calculator-keybutton.divide');       //获取“除号”按钮元素
    let $dot = document.querySelector('.calculator-keybutton.dot');             //获取“小数点”按钮元素
    let $clear = document.querySelector('.calculator-keybutton.clear');         //获取“清除”按钮元素



    let expr = '0';
    let formula = '356';

    function setExpr(value) {
        expr = String(value);
        $expr.innerText = expr;
        resize();
    }

    function setFormula(value) {
        formula = String(value);
        $formula.innerText = formula;
    }

    // 检查输入数字是否超过显示范围，是则缩放
    function resize() {
        let maxWidth = $result.clientWidth * RESULT_CONTENT_MAXWIDTH_PERCENTAGE;
        if ($expr.scrollWidth > maxWidth) {
            $expr.style.transform = `scale(${1 / ($expr.scrollWidth / maxWidth)})`;
            $expr.style.transformOrigin = 'right center';
        } else {
            $expr.style.transform = 'scale(1)';
        }
    }

    setExpr(expr);
    setFormula(formula);

    // 给每个数字按钮添加 click 事件监听器
    for (let i = 0; i < $numbers.length; i++) {
        $numbers[i].addEventListener('click', function (event) {
            let number = event.currentTarget.getAttribute('data-number');
            if (expr === '0') {
                setExpr(number);
            } else {
                setExpr(expr + number);
            }
        });
    }

})()