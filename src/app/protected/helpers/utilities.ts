

class Utilities {

    constructor(){}

    public waitUnTill() {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log('...')
          }, 1200);
        });
      }

      public formatDate(date:any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    

}

const utilities:Utilities = new Utilities();

export default utilities;

