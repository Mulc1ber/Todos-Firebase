export const filteredObjects = (object, value) => {
    const filteredResult = {};

    Object.keys(object)
        .filter((key) => object[key].title.toLowerCase().includes(value.toLowerCase()))
        .forEach((key) => {
            filteredResult[key] = object[key];
        });

    return filteredResult;
};
