const ShortPassword =  () => {
    let password = "";
    const a = ["A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T", "U", "V"
        , "W", "X", "Y", "Z", "a", "b", "c", "d",
        "e", "f", "g", "h", "i", "j", "k", "l",
        "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z", "0", "1",
        "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var i = 0; i < 6; i++) {
        password += a[Math.floor(Math.random() * a.length)];
    }
    return password;
};

const getOtp = () => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let otp = "";
    for (var i = 0; i < 4; i++) otp += a[Math.floor(Math.random() * a.length)];
    return otp;
};
module.exports = {ShortPassword,getOtp};