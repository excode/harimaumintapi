const pool = require("../db");
    const VCache = require('../../lib/cache');
    const funcs =  require("../../common/functions/funcs");
    const {queryFormatter,queryBuilder_string,
        queryBuilder_number,
        queryBuilder_date} = require("../../common/functions/queryutilPostgre")
    var sql = require('yesql').pg
    
    
      exports.findById = (id,extraFields) => {
        return new Promise((resolve, reject) => {
        ;(async () => {
            let vals= {'id':id}; 
       
            const extra = queryFormatter(extraFields)
            let searchConditions=""
            if(extra.cols.length>0){
                vals={...vals,...extra.vals};
                searchConditions=" AND " + extra.cols.join(" AND ")
            }
            const client = await pool.connect()
            try {
             
                const queryText = 'SELECT * from accounts where id=:id '+searchConditions+' LIMIT 1'
                const list = await client.query(sql(queryText)(vals))
                VCache.setCache("offer_list_"+id,list.rows[0]);
                resolve(list.rows[0]);
               
            } catch (e) {
              
                reject(e);
                
            } finally {
                client.release()
            }
            })().catch(e =>  reject(e.stack))
        });
        
      };
      exports.findOne = (querys) => {
        const {cols,vals} = queryFormatter(querys)
        var condition=cols.length>0?" WHERE "+cols.join(" AND ") :""
        return new Promise((resolve, reject) => {
        ;(async () => {
           
            const client = await pool.connect()
            try {
                const queryText = 'SELECT * from accounts '+condition+' LIMIT 1'
                const list = await client.query(sql(queryText)(vals))
                resolve(list.rows[0]);
            } catch (e) {
              
                reject(e);
                
            } finally {
                client.release()
            }
            })().catch(e =>  reject(e.stack))
        });
        
      };

      exports.createAccounts = (body) => {
          
    var cols=[];
    var param=[];
    var vals = {};
    
                         
if(body.createby!=undefined){
    cols.push("createby");
    param.push(":createby");
    vals['createby'] = body.createby ; 
}
                         
if(body.createat!=undefined){
    cols.push("createat");
    param.push(":createat");
    vals['createat'] = body.createat ; 
}
                         
if(body.updateby!=undefined){
    cols.push("updateby");
    param.push(":updateby");
    vals['updateby'] = body.updateby ; 
}
                         
if(body.updateat!=undefined){
    cols.push("updateat");
    param.push(":updateat");
    vals['updateat'] = body.updateat ; 
}
                         
if(body.accounttype!=undefined){
    cols.push("accounttype");
    param.push(":accounttype");
    vals['accounttype'] = body.accounttype ; 
}

if(body.quantity!=undefined){
    cols.push("quantity");
    param.push(":quantity");
    vals['quantity'] = parseFloat(body.quantity) ;  
}

if(body.unitprice!=undefined){
    cols.push("unitprice");
    param.push(":unitprice");
    vals['unitprice'] = parseFloat(body.unitprice) ;  
}

if(body.total!=undefined){
    cols.push("total");
    param.push(":total");
    vals['total'] = parseFloat(body.total) ;  
}
                         
if(body.maturedate!=undefined){
    cols.push("maturedate");
    param.push(":maturedate");
    vals['maturedate'] = body.maturedate ; 
}
                      
if(body.termscount!=undefined){
    cols.push("termscount");
    param.push(":termscount");
    vals['termscount'] = parseInt(body.termscount) ;
}
                      
if(body.monthcount!=undefined){
    cols.push("monthcount");
    param.push(":monthcount");
    vals['monthcount'] = parseInt(body.monthcount) ;
}
                         
if(body.status!=undefined){
    cols.push("status");
    param.push(":status");
    vals['status'] = body.status ; 
}
                         
if(body.block!=undefined){
    cols.push("block");
    param.push(":block");
    vals['block'] = body.block ; 
}
                         
if(body.owner!=undefined){
    cols.push("owner");
    param.push(":owner");
    vals['owner'] = body.owner ; 
}
    
          var column = cols.join(',');
          var params = param.join(',');
          return new Promise((resolve, reject) => {
          ;(async () => {
            
            const client = await pool.connect()
            try {
                
                await client.query('BEGIN');
                const queryText = 'INSERT INTO accounts('+column+') VALUES('+params+') RETURNING id ';
                const add = await client.query(sql(queryText)(vals));
                await client.query('COMMIT');
                if(add.rowCount>0){
                    resolve(add.rows[0]);
                }else{
                    reject("DATA NOT SAVED");
                }
                
            } catch (e) {
                await client.query('ROLLBACK')
                console.log(e);
                reject(e);
            } finally {
                client.release()
            }
            })().catch(e =>  reject(e))
        });
      };
      
      exports.list = (perPage, page , req ) => {
            
            const query = req;
            let sortBy='id';
            let sortDirection='ASC';
            let offset = perPage* page;
             
    var cols=[];
    var vals = {};
    

    
    query.createby_mode = "equals"
    if(query.createby){
        let createby_ = queryBuilder_string(query,"createby","createby")
        cols.push(createby_);
        vals['createby'] = query.createby;
       
    }
    if(query.createby_array){
        if(Array.isArray(query.createby_array) && query.createby_array.length>1){
            cols.push(" createby = ANY(:createby) ");
            const createbyString = query.createby_array.map((data) => data);
            vals['createby'] = createbyString;
        }
    }


        if(query.createat){
            let createat_ = queryBuilder_date(query,"createat","createat")
            cols.push(createat_);
            vals['createat'] = query.createat;   
        }
        if(query.createat_array){
            if(Array.isArray(query.createat_array) && query.createat_array.length==2){
                cols.push(" createat BETWEEN :createat_1 AND  :createat_2 ");
                vals['createat_1'] = new Date(query.createat_array[0])
                vals['createat_2'] = new Date(query.createat_array[1])
            }else if(Array.isArray(query.createat_array) && query.createat_array.length>2){
                cols.push(" createat = ANY(:createat::date[]) ");
                const createatString = query.createat_array.map((date) => date);
                vals['createat'] = createatString;
            }
        }
    

    
    query.updateby_mode = "equals"
    if(query.updateby){
        let updateby_ = queryBuilder_string(query,"updateby","updateby")
        cols.push(updateby_);
        vals['updateby'] = query.updateby;
       
    }
    if(query.updateby_array){
        if(Array.isArray(query.updateby_array) && query.updateby_array.length>1){
            cols.push(" updateby = ANY(:updateby) ");
            const updatebyString = query.updateby_array.map((data) => data);
            vals['updateby'] = updatebyString;
        }
    }


        if(query.updateat){
            let updateat_ = queryBuilder_date(query,"updateat","updateat")
            cols.push(updateat_);
            vals['updateat'] = query.updateat;   
        }
        if(query.updateat_array){
            if(Array.isArray(query.updateat_array) && query.updateat_array.length==2){
                cols.push(" updateat BETWEEN :updateat_1 AND  :updateat_2 ");
                vals['updateat_1'] = new Date(query.updateat_array[0])
                vals['updateat_2'] = new Date(query.updateat_array[1])
            }else if(Array.isArray(query.updateat_array) && query.updateat_array.length>2){
                cols.push(" updateat = ANY(:updateat::date[]) ");
                const updateatString = query.updateat_array.map((date) => date);
                vals['updateat'] = updateatString;
            }
        }
    

    
    if(query.accounttype){
        let accounttype_ = queryBuilder_string(query,"accounttype","accounttype")
        cols.push(accounttype_);
        vals['accounttype'] = query.accounttype;
       
    }
    if(query.accounttype_array){
        if(Array.isArray(query.accounttype_array) && query.accounttype_array.length>1){
            cols.push(" accounttype = ANY(:accounttype) ");
            const accounttypeString = query.accounttype_array.map((data) => data);
            vals['accounttype'] = accounttypeString;
        }
    }


    if(query.quantity!=null ){
      if(!isNaN(query.quantity)){
        let quantity_ = queryBuilder_number(query,"quantity","quantity")
        cols.push(quantity_);
        vals['quantity'] = query.quantity;
      }
    }
    if(query.quantity_array){
        if(Array.isArray(query.quantity_array) && query.quantity_array.length==2){
            cols.push(" quantity BETWEEN :quantity_1 AND  :quantity_2 ");
            vals['quantity_1'] = query.quantity_array[0]
            vals['quantity_2'] = query.quantity_array[1]
        }else if(Array.isArray(query.quantity_array) && query.quantity_array.length>2){
            cols.push(" quantity = ANY(:quantity) ");
            const quantityString = query.quantity_array.map((num) => num);
            vals['quantity'] = quantityString;
        }
    }


    if(query.unitprice!=null ){
      if(!isNaN(query.unitprice)){
        let unitprice_ = queryBuilder_number(query,"unitprice","unitprice")
        cols.push(unitprice_);
        vals['unitprice'] = query.unitprice;
      }
    }
    if(query.unitprice_array){
        if(Array.isArray(query.unitprice_array) && query.unitprice_array.length==2){
            cols.push(" unitprice BETWEEN :unitprice_1 AND  :unitprice_2 ");
            vals['unitprice_1'] = query.unitprice_array[0]
            vals['unitprice_2'] = query.unitprice_array[1]
        }else if(Array.isArray(query.unitprice_array) && query.unitprice_array.length>2){
            cols.push(" unitprice = ANY(:unitprice) ");
            const unitpriceString = query.unitprice_array.map((num) => num);
            vals['unitprice'] = unitpriceString;
        }
    }


    if(query.total!=null ){
      if(!isNaN(query.total)){
        let total_ = queryBuilder_number(query,"total","total")
        cols.push(total_);
        vals['total'] = query.total;
      }
    }
    if(query.total_array){
        if(Array.isArray(query.total_array) && query.total_array.length==2){
            cols.push(" total BETWEEN :total_1 AND  :total_2 ");
            vals['total_1'] = query.total_array[0]
            vals['total_2'] = query.total_array[1]
        }else if(Array.isArray(query.total_array) && query.total_array.length>2){
            cols.push(" total = ANY(:total) ");
            const totalString = query.total_array.map((num) => num);
            vals['total'] = totalString;
        }
    }


        if(query.maturedate){
            let maturedate_ = queryBuilder_date(query,"maturedate","maturedate")
            cols.push(maturedate_);
            vals['maturedate'] = query.maturedate;   
        }
        if(query.maturedate_array){
            if(Array.isArray(query.maturedate_array) && query.maturedate_array.length==2){
                cols.push(" maturedate BETWEEN :maturedate_1 AND  :maturedate_2 ");
                vals['maturedate_1'] = new Date(query.maturedate_array[0])
                vals['maturedate_2'] = new Date(query.maturedate_array[1])
            }else if(Array.isArray(query.maturedate_array) && query.maturedate_array.length>2){
                cols.push(" maturedate = ANY(:maturedate::date[]) ");
                const maturedateString = query.maturedate_array.map((date) => date);
                vals['maturedate'] = maturedateString;
            }
        }
    

    if(query.termscount!=null ){
      if(!isNaN(query.termscount)){
        let termscount_ = queryBuilder_number(query,"termscount","termscount")
        cols.push(termscount_);
        vals['termscount'] = query.termscount;
      }
    }
    if(query.termscount_array){
        if(Array.isArray(query.termscount_array) && query.termscount_array.length==2){
            cols.push(" termscount BETWEEN :termscount_1 AND  :termscount_2 ");
            vals['termscount_1'] = query.termscount_array[0]
            vals['termscount_2'] = query.termscount_array[1]
        }else if(Array.isArray(query.termscount_array) && query.termscount_array.length>2){
            cols.push(" termscount = ANY(:termscount) ");
            const termscountString = query.termscount_array.map((num) => num);
            vals['termscount'] = termscountString;
        }
    }


    if(query.monthcount!=null ){
      if(!isNaN(query.monthcount)){
        let monthcount_ = queryBuilder_number(query,"monthcount","monthcount")
        cols.push(monthcount_);
        vals['monthcount'] = query.monthcount;
      }
    }
    if(query.monthcount_array){
        if(Array.isArray(query.monthcount_array) && query.monthcount_array.length==2){
            cols.push(" monthcount BETWEEN :monthcount_1 AND  :monthcount_2 ");
            vals['monthcount_1'] = query.monthcount_array[0]
            vals['monthcount_2'] = query.monthcount_array[1]
        }else if(Array.isArray(query.monthcount_array) && query.monthcount_array.length>2){
            cols.push(" monthcount = ANY(:monthcount) ");
            const monthcountString = query.monthcount_array.map((num) => num);
            vals['monthcount'] = monthcountString;
        }
    }


    
    if(query.status){
        let status_ = queryBuilder_string(query,"status","status")
        cols.push(status_);
        vals['status'] = query.status;
       
    }
    if(query.status_array){
        if(Array.isArray(query.status_array) && query.status_array.length>1){
            cols.push(" status = ANY(:status) ");
            const statusString = query.status_array.map((data) => data);
            vals['status'] = statusString;
        }
    }


    if(query.block!=null){
        cols.push("block =  :block  ");
        vals['block'] = query.block;
    }
            

    
    if(query.owner){
        let owner_ = queryBuilder_string(query,"owner","owner")
        cols.push(owner_);
        vals['owner'] = query.owner;
       
    }
    if(query.owner_array){
        if(Array.isArray(query.owner_array) && query.owner_array.length>1){
            cols.push(" owner = ANY(:owner) ");
            const ownerString = query.owner_array.map((data) => data);
            vals['owner'] = ownerString;
        }
    }

             let searchConditions =' WHERE 1=1 ';
             if(cols.length>0){
                searchConditions +=' AND ' + cols.join(' AND ' );
             }
            if(query.sortBy){
                sortBy = query.sortBy;
            }
            if(query.sortDirection){
    
                sortDirection = query.sortDirection =="1"?"ASC":"DESC";
            }
            return new Promise((resolve, reject) => {
            ;(async () => {
           
                const client = await pool.connect()
                try {
                 
                    const queryText = 'SELECT * from accounts' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage+' OFFSET '+offset;
                    const list = await client.query(sql(queryText)(vals));
                    const queryTextCount = 'SELECT COUNT(*) as total from accounts' +searchConditions
                    //console.log(sql(queryText)(vals))
                    const total = await client.query(sql(queryTextCount)(vals));
                    //VCache.setCache("offer_list",list.rows);
                   resolve( { docs:list.rows, count: total.rows[0].total ,perpage:perPage,page:page });
                   
                } catch (e) {
                  
                   // throw e
                    reject(e);
                } finally {
                    client.release()
                }
                })().catch(e =>  reject(e.stack))
            });
           
      };
      exports.listAll = (querys={} ) => {
        const perPage =300;//LIMIT
        
        const {cols,vals} = queryFormatter(querys)
        var searchConditions=cols.length>0?" WHERE "+cols.join(" AND ") :"" 
        return new Promise((resolve, reject) => {
        ;(async () => {
       
            const client = await pool.connect()
            try {
             
                const queryText = 'SELECT * from accounts' +searchConditions+'  LIMIT '+perPage;
                const list = await client.query(sql(queryText)(vals));
                
               resolve( list.rows);
               
            } catch (e) {
              
               // throw e
                reject(e);
            } finally {
                client.release()
            }
            })().catch(e =>  reject(e.stack))
        });
       
  };
  exports.listSuggestions = (query) => {
    const { search, ...queryWithoutSearch } = query  
    var querys=queryWithoutSearch
    const perPage =50;//LIMIT
    let sortBy='id';
    let sortDirection='ASC';
    let keyConditions =` WHERE  (accounttype LIKe '%' || :search || '%' 
 OR status LIKe '%' || :search || '%' 
 OR owner LIKe '%' || :search || '%' )`;
    // If you want restrict the data for any specific group/user/organization like user='ucode' 
    // use can supply 
    // querys={user:'ucode'}
    //or exclude a group {user:{ne:'ucode'}}  
    const extra = queryFormatter(querys)
    var vals={search:search};
    let searchConditions=keyConditions
    if(extra.cols.length>0){
        vals={search:search,...extra.vals};
        searchConditions=+ extra.cols.join(" AND ")
    }
    return new Promise((resolve, reject) => {
    ;(async () => {
   
        const client = await pool.connect()
        try {
         
            const queryText = 'SELECT * from accounts' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage;
            const list = await client.query(sql(queryText)(vals));
           resolve( list.rows);
           
        } catch (e) {
          
           // throw e
            reject(e);
        } finally {
            client.release()
        }
        })().catch(e =>  reject(e.stack))
    });
   
};
      exports.patchAccounts = (id, reqData,extraFields={}) => {
        var body = reqData;
        
    var cols=[];
    var vals = {};
    
                             
if(body.createby!=undefined){
    cols.push("createby = :createby");
    vals['createby'] = body.createby ;  
}
                             
if(body.createat!=undefined){
    cols.push("createat = :createat");
    vals['createat'] = body.createat ;  
}
                             
if(body.updateby!=undefined){
    cols.push("updateby = :updateby");
    vals['updateby'] = body.updateby ;  
}
                             
if(body.updateat!=undefined){
    cols.push("updateat = :updateat");
    vals['updateat'] = body.updateat ;  
}
                             
if(body.accounttype!=undefined){
    cols.push("accounttype = :accounttype");
    vals['accounttype'] = body.accounttype ;  
}

if(body.quantity!=undefined){
    cols.push("quantity = :quantity");
    vals['quantity'] = parseFloat(body.quantity) ;    
}

if(body.unitprice!=undefined){
    cols.push("unitprice = :unitprice");
    vals['unitprice'] = parseFloat(body.unitprice) ;    
}

if(body.total!=undefined){
    cols.push("total = :total");
    vals['total'] = parseFloat(body.total) ;    
}
                             
if(body.maturedate!=undefined){
    cols.push("maturedate = :maturedate");
    vals['maturedate'] = body.maturedate ;  
}
                             
if(body.termscount!=undefined){
    cols.push("termscount = :termscount");
    vals['termscount'] = parseInt(body.termscount) ; 
}
                             
if(body.monthcount!=undefined){
    cols.push("monthcount = :monthcount");
    vals['monthcount'] = parseInt(body.monthcount) ; 
}
                             
if(body.status!=undefined){
    cols.push("status = :status");
    vals['status'] = body.status ;  
}
                             
if(body.block!=undefined){
    cols.push("block = :block");
    vals['block'] = body.block ;  
}
                             
if(body.owner!=undefined){
    cols.push("owner = :owner");
    vals['owner'] = body.owner ;  
}
        vals= {...vals,id:id}; 
        var column = cols.join(',');
        const extra = queryFormatter(extraFields)
        let searchConditions=""
        if(extra.cols.length>0){
            vals={...vals,...extra.vals};
            searchConditions=" AND " + extra.cols.join(" AND ")
        }
        return new Promise((resolve, reject) => {
        ;(async () => {
          
          const client = await pool.connect()
          try {
             
              await client.query('BEGIN');
              const queryText = 'UPDATE accounts SET '+column+'  WHERE id =:id'+searchConditions
              const updated = await client.query(sql(queryText)(vals));
              //console.log(sql(queryText)(vals))
              await client.query('COMMIT');
              //VCache.resetCache("accounts_list");
              resolve(updated);
          } catch (e) {
              await client.query('ROLLBACK')
              console.log(e);
              reject(e);
          } finally {
              client.release()
          }
          })().catch(e =>  reject(e))
      });
      
      };
      
      exports.removeById = (accountsId,extraFields={}) => {
          return new Promise((resolve, reject) => {
            ;(async () => {
                const extra = queryFormatter(extraFields)
                let vals= {id:accountsId};
                let searchConditions=""
                if(extra.cols.length>0){
                    vals={...vals,...extra.vals};
                    searchConditions=" AND " + extra.cols.join(" AND ")
                }
                const client = await pool.connect()
                try {
                    await client.query('BEGIN')
                    const queryText = 'DELETE FROM accounts  WHERE  id=:id '+searchConditions
                    const deleted = await client.query(sql(queryText)(vals))
                   
                    await client.query('COMMIT')
                    resolve(deleted);
                } catch (e) {
                    await client.query('ROLLBACK')
                    reject(e);
                } finally {
                    client.release()
                }
                })().catch(e => reject(e.stack))
          });
      };
      
  