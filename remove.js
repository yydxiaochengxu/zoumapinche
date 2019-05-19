function aa(){
    function add(){
        console.log('master冲突函数')
    }
    add()
    return function(){
        console.log('新加dev匿名函数')
        console.log('新加dev匿名函数')
    }
}