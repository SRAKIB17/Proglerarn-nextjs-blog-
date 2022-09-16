const timeSince = (date) => {
    const parse = Date.now() - Date.parse(date)
    const seconds = Math.floor(parse / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
// var aDay = 24 * 60 * 60 * 1000;
// const dat = 'Mon Aug 01 2022 01:15:06 GMT+0600 (Bangladesh Standard Time)'
// const d = new Date("July 21, 1983 01:15:00:526");
// console.log(Date.now() - d)
// console.log(Date.parse(d))
// console.log(new Date(427576500000))
// console.log(timeSince(new Date() - dat))
// console.log(new Date(1231723837502))
// const getDate = (new Date(Date.now() - d))
// // console.log(getDate.getFullYear())
// const parse = Date.now() - Date.parse("oct 10, 2021")
// console.log(timeSince(parse))

export default timeSince;