function aa() {
    function add() {
        console.log('master冲突函数')
    }
    add()
    return function () {
        console.log('新加dev匿名函数111')
        console.log('新加dev匿名tianjia函数')
            (function () {
                console.log('我是div1');
                setTimeout(() => {
                    console.warn('div1')
                }, 1000)
            }())
    }
}
function loop(){
    alert('添加的函数')
    console.log('loop')
}