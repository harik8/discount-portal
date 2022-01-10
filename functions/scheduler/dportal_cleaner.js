exports = function() {
  
    /*
      This function runs every day to clean up expired discounts.
    */
    
    var today = new Date();
    
    var date = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    
    var col = context.services.get("discount-portal").db("dportal").collection("discounts");
    var todayString = date + '-' + month + '-' + year;
    
    console.log("Today is - ",todayString);
    /*
        If today's date matches the expired date, the discount document will be deleted.
    */
    doc = col.deleteMany({ expired_date : { "$eq": todayString }});
    
    console.log("Expired Docs - ", doc);
    
    return doc;
  };
  