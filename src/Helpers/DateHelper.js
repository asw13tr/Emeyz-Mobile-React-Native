const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

export const mysqlToDate = function (dateString){
    let parts = dateString.split(" ");
    let pDate = parts[0].split("-");
    let pTime = parts[1].split(":");
    return {
        day:    pDate[2],
        month:  pDate[1],
        monthName:  monthNames[pDate[1]-1],
        year:   pDate[0],

        hour:   pTime[0],
        minute: pTime[1],
        second: pTime[2],

    };
}
