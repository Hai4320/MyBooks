export const checkDate = (day)=>{
    var cmtday = new Date(day);
    return (cmtday.getDate()+1) +'/'+ (cmtday.getMonth()+1)+'/'+cmtday.getFullYear()

}