import shallowEqualExternal from 'shallowequal';

export const mapEnumToCatalog = enumObj => {
    return Object.keys(enumObj).map(k => ({ id: k, name: enumObj[k] }));
}

export const trimTrailingSlashes = str => {
    return str && str.replace(/\/+$/, '');
}

export const deepClone = obj => {
    return JSON.parse(JSON.stringify(obj));
}

export const importToArray = module => {
    const keys = Object.getOwnPropertyNames(module);
    return keys.filter(k => !k.startsWith('__')).map(key => module[key]);
}

export const shallowEqual = (first, second) => {
    return shallowEqualExternal(first, second);
}

export const indexArray = (array, keyField = 'id') => {
    return array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});
}

export const getFileExtension = fileName => {
    if (fileName.includes('.')) {
        return fileName.split('.').pop(); 
    }
}

export const getFileSize = sizeInBytes => {
    let size = sizeInBytes / 1024;
    if (size < 1000) {
        return `${size.toFixed(2)} Kb`;
    }

    size = size / 1024;
    if (size < 1000) {
        return `${size.toFixed(2)} Mb`;
    }

    size = size / 1024;
    return `${size.toFixed(2)} Gb`;
}

export const sleep = timeoutInMs => {
    return new Promise(resolve => setTimeout(resolve, timeoutInMs));
}

export const trim = (str, strToTrim) => {
    return trimEnd(trimStart(str, strToTrim), strToTrim);
}

export const trimStart = (str, strToTrim) => {
    if (!str) {
        return str;
    }

    if (strToTrim == null) strToTrim = ' ';

    let result = str;
    while (result.startsWith(strToTrim)) {
        result = result.slice(strToTrim.length);
    }

    return result;
}

export const trimEnd = (str, strToTrim) => {
    if (!str) {
        return str;
    }

    if (strToTrim == null) strToTrim = ' ';

    let result = str;
    while (result.endsWith(strToTrim)) {
        result = result.slice(0, result.length - strToTrim.length);
    }

    return result;
}

//https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd#answer-7091965
export const getAge = birthDate => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//https://gist.github.com/paulvales/113b08bdf3d4fc3beb2a5e0045d9729d
export const declineAge = age => {
    let txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'лет';
    } else {
        count = count % 10;
        if (count === 1) {
            txt = 'год';
        } else if (count >= 2 && count <= 4) {
            txt = 'года';
        } else {
            txt = 'лет';
        }
    }
    return age + ' ' + txt;
}

export const getFullBirthDate = birthDate => {
    if (!birthDate) {
        return null;
    }

    return `${birthDate.toLocaleDateString()} (${declineAge(getAge(birthDate))})`;
}

export const now = () => {
    return new Date();
}