export {}

export const returnBase64FileSize = (avatarBase64:string) => {
    if(avatarBase64){
        const EndOfBase64String = avatarBase64[avatarBase64.length-1] === '==' ? 2 : 1;
        return (avatarBase64.length * (3/4)) - EndOfBase64String;
    } else return 1
}
export const returnFileSize = (n: number) => {
    if (n < 1024) {
        return n + 'bytes';
    } else if (n > 1024 && n < 1048576) {
        return (n / 1024).toFixed(2) + 'KB';
    } else if (n > 1048576) {
        return (n / 1048576).toFixed(2) + 'MB';
    }
};