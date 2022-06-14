export const formatText = (string) => {
    const removeDash = string.replace(/-/g, " ")
    return removeDash; 
}