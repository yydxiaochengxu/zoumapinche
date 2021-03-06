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