const convertToUnix = (date) => {
    return date.getTime();
}

const formatDate = (dateString) => {
    if(dateString === undefined){
        let date = new Date();
        return date;
    }else if (!dateString.includes("-")){
        dateString = parseInt(dateString);
    }
    try{
        let date = new Date(dateString);
        return date;
    }catch(invalidDate){
        return null;
    }
}

module.exports = {
    convertToUnix : convertToUnix,
    formatDate: formatDate
}