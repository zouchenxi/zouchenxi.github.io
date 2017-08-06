(function () {

    const RESULT_CONTENT_MAXWIDTH_PERCENTAGE = 1 - 0.08 * 2;

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
    let $equal = document.querySelector('.calculator-keybutton-equal');         //获取“等号”按钮元素

    let expr = '0';                         //记录当前输入数字
    let formula = '';                       //记录当前的计算表达式
    let judgment = 0;                       //判断默认值
    let operators = ['+', '-', '*', '/'];   //运算符

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
            $expr.style.transform = `scale(${maxWidth / $expr.scrollWidth})`;
            $expr.style.transformOrigin = 'right center';
        } else {
            $expr.style.transform = 'scale(1)';
        }
    }

    setExpr(expr);           //初始化计算器显示结果
    setFormula(formula);     //初始化计算器表达式结果

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

    // 给'+'按钮添加 click 事件监听器
    $plus.addEventListener('click', function () {
        if (operators.indexOf(expr[expr.length - 1]) > -1) {
            setExpr(expr.slice(0, expr.length - 1) + '+');
        } else {
            setExpr(expr + '+');
        }
    });

    // 给'-'按钮添加 click 事件监听器
    $minus.addEventListener('click', function () {
        if (operators.indexOf(expr[expr.length - 1]) > -1) {
            setExpr(expr.slice(0, expr.length - 1) + '-');
        } else {
            setExpr(expr + '-');
        }
    });

    // 给'×'按钮添加 click 事件监听器
    $multiply.addEventListener('click', function () {
        if (operators.indexOf(expr[expr.length - 1]) > -1) {
            setExpr(expr.slice(0, expr.length - 1) + '*');
        } else {
            setExpr(expr + '*');
        }
    });

    // 给'÷'按钮添加 click 事件监听器
    $divide.addEventListener('click', function () {
        if (operators.indexOf(expr[expr.length - 1]) > -1) {
            setExpr(expr.slice(0, expr.length - 1) + '/');
        } else {
            setExpr(expr + '/');
        }
    });

    // 给'.'按钮添加 click 事件监听器
    $dot.addEventListener('click', function () {
        if (expr.endsWith('.')) return;
        if (operators.indexOf(expr[expr.length - 1]) > -1) return;
        if (expr.indexOf('.') === -1) return setExpr(expr + '.');
        let rest = expr.slice(expr.lastIndexOf('.') + 1);
        if (
            operators
                .map(function (operator) { return rest.indexOf(operator) > -1; })
                .every(function (result) { return result === false; })
        ) return;
        setExpr(expr + '.');
    });

    // 给'C'按钮添加 click 事件监听器
    $clear.addEventListener('click', function () {
        setExpr(0);
        setFormula('');
    })

    // 给'='按钮添加 click 事件监听器
    $equal.addEventListener('click', function () {
        if (operators.indexOf(expr[expr.length - 1]) > -1) {
            setFormula(expr.slice(0, expr.length - 1));
            setExpr(eval(expr.slice(0, expr.length - 1)));
        } else {
            setFormula(expr + '');
            setExpr(eval(expr));
        }
    });

})()