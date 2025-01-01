const localStorageSet = {
    getItem: (key) => {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    },
    setItem: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
    removeItem: (key) => localStorage.removeItem(key),
};

export default localStorageSet;
