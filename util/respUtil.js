function writeResult(state, msg, data) {
    return JSON.stringify({
        state: state,
        msg: msg,
        data: data
    })
}

module.exports.writeResult = writeResult;