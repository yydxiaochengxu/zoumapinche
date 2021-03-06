function createStore(reducer) {
    let store, observer = {};
    let gerState = () => store;
    let dispatch = (action) => {
        store = reducer(store, action);
        if (Array.isArray(observer[action.type])) {
            observer[action.type].forEach(cb => cb())
        }
    }
    let subscribe = (subCbObj) => {
        let { type, cb } = subCbObj;
        if (Array.isArray(observer[type])) {
            observer[type].push(cb)
        } else {
            observer[type] = [cb]
        }
        return () => {
            observer[type] = observer[type].filter(item => item !== cb)
        }
    }
    return {
        gerState, dispatch, subscribe
    }
}
let reducer = (state = {}, action) => {
    let { type, data } = action
    switch (type) {
        case 'add': {
            return Object.assign({}, state, data)
        }
        default:
            return state
    }
}
let store = createStore(reducer)
module.exports = {
    store
}



// 本地：
function aa() {
    function add(arg) {
        console.log('添加一句，减少一句')
        console.log(arg)
    }
    return function () {
        alert('修改匿名函数111');
        console.log('新加dev匿名tianjia函数');
        (function () {
            console.log('我是div1');
            setTimeout(() => {
                console.log('div1')
            }, 1000)
        }())
    }
}
function createStore(reducer) {
    let store, observer = {};
    let gerState = () => store;
    let dispatch = (action) => {
        store = reducer(store, action);
        if (Array.isArray(observer[action.type])) {
            observer[action.type].forEach(cb => cb())
        }
    }
    let subscribe = (subCbObj) => {
        let { type, cb } = subCbObj;
        if (Array.isArray(observer[type])) {
            observer[type].push(cb)
        } else {
            observer[type] = [cb]
        }
        return () => {
            observer[type] = observer[type].filter(item => item !== cb)
        }
    }
    return {
        gerState, dispatch, subscribe
    }
}
let reducer = (state = {}, action) => {
    let { type, data } = action
    switch (type) {
        case 'add': {
            return Object.assign({}, state, data)
        }
        default:
            return state
    }
}
let store = createStore(reducer)
module.exports = {
    store
}






// 本地：
function aalocation() {
    return function () {
        alert('新加dev匿名函数');
        console.log('新加dev匿名tianjia函数');
        (function () {
            alert('添加含描述')
            setTimeout(() => {
                console.log('div1')
            }, 1000)
        }())
    }
}
// 远程：
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
function loop() {
    console.log('loop')
}