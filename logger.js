const Terminalcolors = {
    Reset: "\x1b[0m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    BgRed: "\x1b[41m",
}

function error(string, object) {
    console.error('\n', Terminalcolors.FgYellow, string, Terminalcolors.Reset, Terminalcolors.BgRed, object, Terminalcolors.Reset);
}

function success(string) {
    console.log(Terminalcolors.FgGreen, string, Terminalcolors.Reset, '\n')
}

module.exports = {
    error,
    success,
}