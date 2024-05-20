export function splitStringOnce(str: string, on: string): [string, string | null] {
    const [first, ...rest] = str.split(on);
    return [first, rest.length > 0 ? rest.join(on) : null];
}

export function getAllNumbersFromString(str: string): string {
    let matches = str.match(/\d+/g);
    if (!matches) {
        return "";
    }
    return matches.join("");
}
