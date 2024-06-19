document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};



// Tableau de substitution personnalisée
const substitutionTable = {
    'a': '$H~', 'b': '%dh', 'c': '#R!', 'd': '@V$', 'e': '^Y&', 'f': '*K(', 'g': '(L)', 'h': '-P_',
    'i': '=M+', 'j': '`Q`', 'k': '~X~', 'l': '|Z|', 'm': '[O]', 'n': '{S}', 'o': '}U{', 'p': ':T;',
    'q': '"W"', 'r': '<N>', 's': '>J<', 't': '.I.', 'u': '?B?', 'v': ',C,', 'w': ';E;', 'x': "'A'",
    'y': '/F/', 'z': '\`G\`',
    'A': '1$h', 'B': '2%e', 'C': '3#i', 'D': '4@o', 'E': '5^u', 'F': '6*y', 'G': '7(l', 'H': '8-p',
    'I': '9=m', 'J': '0`q', 'K': '!~x', 'L': '@|z', 'M': '#[o', 'N': '$]s', 'O': '%}u', 'P': '^:t',
    'Q': '&"w', 'R': '*<n', 'S': '(>j', 'T': ')i.', 'U': '_?b', 'V': '+,c', 'W': '`;e', 'X': '~\'a',
    'Y': '|/f', 'Z': '[`g',
    '0': '{~s', '1': '}\\d', '2': '|:f', '3': '{a', '4': 'a,;', '5': '<\\z', '6': '>[w', '7': '`|b',
    '8': '~;l', '9': '|\'o', ' ': '_&_'
};

// Tableau inverse pour le déchiffrement
const reverseSubstitutionTable = {};
for (let key in substitutionTable) {
    reverseSubstitutionTable[substitutionTable[key]] = key;
}

function customHash(message) {
    let hashed = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (substitutionTable[char]) {
            hashed += substitutionTable[char];
        } else {
            hashed += char; // Si le caractère n'est pas dans la table, conserver tel quel
        }
    }
    return hashed;
}

function customDehash(hash) {
    let original = '';
    let i = 0;
    while (i < hash.length) {
        let found = false;
        for (let length = 3; length >= 1; length--) {
            let substring = hash.substr(i, length);
            if (reverseSubstitutionTable[substring]) {
                original += reverseSubstitutionTable[substring];
                i += length;
                found = true;
                break;
            }
        }
        if (!found) {
            original += hash[i]; // Si aucune séquence n'est trouvée, conserver tel quel
            i++;
        }
    }
    return original;
}

function hashMessage() {
    let message = document.getElementById("message").value;
    let hashedResult = customHash(message);
    document.getElementById("hashedResult").value = hashedResult;
}

function dehashMessage() {
    let hash = document.getElementById("message").value;
    let originalMessage = customDehash(hash);
    document.getElementById("hashedResult").value = originalMessage;
}
