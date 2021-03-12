module.exports = function check(str, bracketsConfig) {
str = str.replace(/7/g, '|')

    for (let i = 0, j = 0; i < str.length; i++) {
        if ((str[i] == '8') && (j % 2 == 0)) {
            str = str.replace('8', '(');
            j++;
        } else if ((str[i] == '8') && (j % 2 == 1)) {
            str = str.replace('8', ')');
            j++;
        }
    }

    for (let i = 0, j = 0; i < str.length; i++) {
        if ((str[i] == '|') && (j % 2 == 0)) {
            str = str.replace('|', '<');
            j++;
        } else if ((str[i] == '|') && (j % 2 == 1)) {
            str = str.replace('|', '>');
            j++;
        }
    }

    let o = bracketsConfig.reduce((acc, [open, close]) => ({ ...acc, [close]: open }), {});

    if (o['|'] || o['7']) o['>'] = '<';
    if (o['8']) o[')'] = '('


    const stack = []
    for (let s of str) {
        if (!o[s]) {
            stack.push(s)
        } else if (stack.pop() !== o[s]) return false
    }
    return stack.length === 0
}
