export const parseJSON = <T>(str: string, defaultValue: T): T => {
    try {
        return JSON.parse(str) as T;
    } catch (error) {
        return defaultValue;
    }
};
export const isBase64Image = (str: string) => {
    if (str === '' || str === undefined || str === null) {
        return false;
    }

    if (str.indexOf('data:image/') == 0) {
        return true;
    } else {
        return false;
    }
};
