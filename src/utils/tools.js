export const objFilter = (data, item) => {
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        if (obj.id === item) {
            return obj.name;
        }
    }
};
