class TwoWayMap {
    map: Map<any, any>;
    reverseMap: Map<any, any>;

    constructor(entries: Iterable<[any, any]> = []) {
        this.map = new Map(entries);
        this.reverseMap = new Map();

        for (const [key, value] of entries) {
            this.reverseMap.set(value, key);
        }
    }

    get(key: any) {
        return this.map.get(key);
    }

    revGet(key: any) {
        return this.reverseMap.get(key);
    }

    set(key: any, value: any) {
        this.map.set(key, value);
        this.reverseMap.set(value, key);
    }

    revSet(key: any, value: any) {
        this.reverseMap.set(key, value);
        this.map.set(value, key);
    }

    delete(key: any) {
        const value = this.map.get(key);
        this.map.delete(key);
        this.reverseMap.delete(value);
    }

    revDelete(key: any) {
        const value = this.reverseMap.get(key);
        this.reverseMap.delete(key);
        this.map.delete(value);
    }

    has(key: any) {
        return this.map.has(key);
    }

    revHas(key: any) {
        return this.reverseMap.has(key);
    }

    keys() {
        return [...this.map.keys()];
    }

    revKeys() {
        return [...this.reverseMap.keys()];
    }

    values() {
        return [...this.map.values()];
    }

    revValues() {
        return [...this.reverseMap.values()];
    }

    entries() {
        return [...this.map.entries()];
    }

    revEntries() {
        return [...this.reverseMap.entries()];
    }

    clear() {
        this.map.clear();
        this.reverseMap.clear();
    }
}

export default TwoWayMap;
