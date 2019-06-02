export function strMapToObj<T>(strMap: Map<String, T>): Object {
    let obj: Object = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k.toString()] = v;
    }
    return obj;
}
export function objToStrMap<T>(obj: Object): Map<String, T> {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
export function strMapToJson<T>(strMap: Map<String, T>): String {
    return JSON.stringify(strMapToObj(strMap));
}
export function jsonToStrMap<T>(jsonStr: String): Map<String, T> {
    return objToStrMap(JSON.parse(jsonStr.toString()));
}