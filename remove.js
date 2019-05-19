function aa(){
    (function(){
        console.log('fenzhi1分支冲突函数')
    }())
    return function(){
        console.log('新加dev匿名函数')
        console.log('新加dev匿名函数')
    }
}