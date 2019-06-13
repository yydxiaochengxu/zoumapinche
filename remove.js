function aa(){
    function add(){
        console.log('master冲突函数')
    }
    add()
    return function(){
        console.log('新加dev匿名函数')
        console.log('新加dev匿名函数')
        (function(){
            console.log('我是div1');
            setTimeout(()=>{
                alert('div1')
            },1000)
        }())
    }
}