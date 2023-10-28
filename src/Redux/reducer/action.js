export function fetching(){
    return {
        type: 'START_FETCHING',
    }
}

export function berhasil(data){
    return {
        type: 'SUCCESS_GET_TODO',
        payload: data
    }
}

export function delet(id){
    return {
        type: 'DELETE',
        payload:id
    }
}

export function edit (id) {
    return {
        type: 'EDIT',
        payload: id
    }
}

export function togle (id) {
    return {
        type: 'TOGGLE',
        payload: id
    }
}