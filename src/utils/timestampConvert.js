export const timestampConvert = (timestamp) => {
    return `${timestamp[8]}${timestamp[9]}-${timestamp[5]}${timestamp[6]}-${timestamp.slice(0, 4)}`;
}
