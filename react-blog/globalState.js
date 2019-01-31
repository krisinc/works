const callbacks = []

let globalState = {
    
}

function notifyAll() {
    for (let i=0; i<callbacks.length; i++) {
        callbacks[i](globalState)
    }
}

export const subscribe = cb => {
    callbacks.push(cb)
}

export const setGlobalState = state => {
    globalState = state
}