export const msToMin = (ms: number): string => {
    let m = Math.ceil(ms / 1000) / 60;
    let mins = Math.floor(m);
    let secs = Math.floor((m - mins) * 60);
    return `${mins}:${secs<10?'0':''}${secs}`;
}