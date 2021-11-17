export const checkDate = (day)=>{
    var now = new Date();
    var cmtday = new Date(day);
    if (now.getFullYear() !== cmtday.getFullYear()||now.getMonth() !== cmtday.getMonth() || now.getDate() !== cmtday.getDate())
    { return (cmtday.getDate()+1) +'/'+ (cmtday.getMonth()+1)+'/'+cmtday.getFullYear()}
    if (now.getHours!== cmtday.getHours)
    {return (now.getHours() - cmtday.getHours()) + ' h';}
    return (now.getMinutes() - cmtday.getMinutes()) +' m'
}