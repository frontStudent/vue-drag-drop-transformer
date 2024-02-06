export default (rawVal, minVal, maxVal) => {
    return Math.min(Math.max(rawVal, minVal), maxVal);
}