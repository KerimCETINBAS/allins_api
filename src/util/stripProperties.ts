export const stripProperties = (
    obj: { [key: string]: unknown },
    properties: string[],
) => {
    properties.forEach((p) => delete obj[p]);

    return obj;
};
