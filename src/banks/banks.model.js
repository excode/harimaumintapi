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
             
                const queryText = 'SELECT * from banks where id=:id '+searchConditions+' LIMIT 1'
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
                const queryText = 'SELECT * from banks '+condition+' LIMIT 1'
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

      exports.createBanks = (body) => {
          
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
                         
if(body.bankname!=undefined){
    cols.push("bankname");
    param.push(":bankname");
    vals['bankname'] = body.bankname ; 
}
                         
if(body.swiftcode!=undefined){
    cols.push("swiftcode");
    param.push(":swiftcode");
    vals['swiftcode'] = body.swiftcode ; 
}
                         
if(body.bankaddress!=undefined){
    cols.push("bankaddress");
    param.push(":bankaddress");
    vals['bankaddress'] = body.bankaddress ; 
}
                         
if(body.city!=undefined){
    cols.push("city");
    param.push(":city");
    vals['city'] = body.city ; 
}
                         
if(body.state!=undefined){
    cols.push("state");
    param.push(":state");
    vals['state'] = body.state ; 
}
                         
if(body.postcode!=undefined){
    cols.push("postcode");
    param.push(":postcode");
    vals['postcode'] = body.postcode ; 
}
                         
if(body.accountname!=undefined){
    cols.push("accountname");
    param.push(":accountname");
    vals['accountname'] = body.accountname ; 
}
                         
if(body.accountnumber!=undefined){
    cols.push("accountnumber");
    param.push(":accountnumber");
    vals['accountnumber'] = body.accountnumber ; 
}
                         
if(body.document!=undefined){
    cols.push("document");
    param.push(":document");
    vals['document'] = body.document ; 
}
                         
if(body.active!=undefined){
    cols.push("active");
    param.push(":active");
    vals['active'] = body.active ; 
}
    
          var column = cols.join(',');
          var params = param.join(',');
          return new Promise((resolve, reject) => {
          ;(async () => {
            
            const client = await pool.connect()
            try {
                
                await client.query('BEGIN');
                const queryText = 'INSERT INTO banks('+column+') VALUES('+params+') RETURNING id ';
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
    

    
    if(query.bankname){
        let bankname_ = queryBuilder_string(query,"bankname","bankname")
        cols.push(bankname_);
        vals['bankname'] = query.bankname;
       
    }
    if(query.bankname_array){
        if(Array.isArray(query.bankname_array) && query.bankname_array.length>1){
            cols.push(" bankname = ANY(:bankname) ");
            const banknameString = query.bankname_array.map((data) => data);
            vals['bankname'] = banknameString;
        }
    }


    
    if(query.swiftcode){
        let swiftcode_ = queryBuilder_string(query,"swiftcode","swiftcode")
        cols.push(swiftcode_);
        vals['swiftcode'] = query.swiftcode;
       
    }
    if(query.swiftcode_array){
        if(Array.isArray(query.swiftcode_array) && query.swiftcode_array.length>1){
            cols.push(" swiftcode = ANY(:swiftcode) ");
            const swiftcodeString = query.swiftcode_array.map((data) => data);
            vals['swiftcode'] = swiftcodeString;
        }
    }


    
    if(query.bankaddress){
        let bankaddress_ = queryBuilder_string(query,"bankaddress","bankaddress")
        cols.push(bankaddress_);
        vals['bankaddress'] = query.bankaddress;
       
    }
    if(query.bankaddress_array){
        if(Array.isArray(query.bankaddress_array) && query.bankaddress_array.length>1){
            cols.push(" bankaddress = ANY(:bankaddress) ");
            const bankaddressString = query.bankaddress_array.map((data) => data);
            vals['bankaddress'] = bankaddressString;
        }
    }


    
    if(query.city){
        let city_ = queryBuilder_string(query,"city","city")
        cols.push(city_);
        vals['city'] = query.city;
       
    }
    if(query.city_array){
        if(Array.isArray(query.city_array) && query.city_array.length>1){
            cols.push(" city = ANY(:city) ");
            const cityString = query.city_array.map((data) => data);
            vals['city'] = cityString;
        }
    }


    
    if(query.state){
        let state_ = queryBuilder_string(query,"state","state")
        cols.push(state_);
        vals['state'] = query.state;
       
    }
    if(query.state_array){
        if(Array.isArray(query.state_array) && query.state_array.length>1){
            cols.push(" state = ANY(:state) ");
            const stateString = query.state_array.map((data) => data);
            vals['state'] = stateString;
        }
    }


    
    if(query.postcode){
        let postcode_ = queryBuilder_string(query,"postcode","postcode")
        cols.push(postcode_);
        vals['postcode'] = query.postcode;
       
    }
    if(query.postcode_array){
        if(Array.isArray(query.postcode_array) && query.postcode_array.length>1){
            cols.push(" postcode = ANY(:postcode) ");
            const postcodeString = query.postcode_array.map((data) => data);
            vals['postcode'] = postcodeString;
        }
    }


    
    if(query.accountname){
        let accountname_ = queryBuilder_string(query,"accountname","accountname")
        cols.push(accountname_);
        vals['accountname'] = query.accountname;
       
    }
    if(query.accountname_array){
        if(Array.isArray(query.accountname_array) && query.accountname_array.length>1){
            cols.push(" accountname = ANY(:accountname) ");
            const accountnameString = query.accountname_array.map((data) => data);
            vals['accountname'] = accountnameString;
        }
    }


    
    if(query.accountnumber){
        let accountnumber_ = queryBuilder_string(query,"accountnumber","accountnumber")
        cols.push(accountnumber_);
        vals['accountnumber'] = query.accountnumber;
       
    }
    if(query.accountnumber_array){
        if(Array.isArray(query.accountnumber_array) && query.accountnumber_array.length>1){
            cols.push(" accountnumber = ANY(:accountnumber) ");
            const accountnumberString = query.accountnumber_array.map((data) => data);
            vals['accountnumber'] = accountnumberString;
        }
    }


    if(query.active!=null){
        cols.push("active =  :active  ");
        vals['active'] = query.active;
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
                 
                    const queryText = 'SELECT * from banks' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage+' OFFSET '+offset;
                    const list = await client.query(sql(queryText)(vals));
                    const queryTextCount = 'SELECT COUNT(*) as total from banks' +searchConditions
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
             
                const queryText = 'SELECT * from banks' +searchConditions+'  LIMIT '+perPage;
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
    let keyConditions =` WHERE  (bankname LIKe '%' || :search || '%' 
 OR swiftcode LIKe '%' || :search || '%' 
 OR bankaddress LIKe '%' || :search || '%' 
 OR city LIKe '%' || :search || '%' 
 OR state LIKe '%' || :search || '%' 
 OR postcode LIKe '%' || :search || '%' 
 OR accountname LIKe '%' || :search || '%' 
 OR accountnumber LIKe '%' || :search || '%' )`;
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
         
            const queryText = 'SELECT * from banks' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage;
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
      exports.patchBanks = (id, reqData,extraFields={}) => {
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
                             
if(body.bankname!=undefined){
    cols.push("bankname = :bankname");
    vals['bankname'] = body.bankname ;  
}
                             
if(body.swiftcode!=undefined){
    cols.push("swiftcode = :swiftcode");
    vals['swiftcode'] = body.swiftcode ;  
}
                             
if(body.bankaddress!=undefined){
    cols.push("bankaddress = :bankaddress");
    vals['bankaddress'] = body.bankaddress ;  
}
                             
if(body.city!=undefined){
    cols.push("city = :city");
    vals['city'] = body.city ;  
}
                             
if(body.state!=undefined){
    cols.push("state = :state");
    vals['state'] = body.state ;  
}
                             
if(body.postcode!=undefined){
    cols.push("postcode = :postcode");
    vals['postcode'] = body.postcode ;  
}
                             
if(body.accountname!=undefined){
    cols.push("accountname = :accountname");
    vals['accountname'] = body.accountname ;  
}
                             
if(body.accountnumber!=undefined){
    cols.push("accountnumber = :accountnumber");
    vals['accountnumber'] = body.accountnumber ;  
}
                             
if(body.document!=undefined){
    cols.push("document = :document");
    vals['document'] = body.document ;  
}
                             
if(body.active!=undefined){
    cols.push("active = :active");
    vals['active'] = body.active ;  
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
              const queryText = 'UPDATE banks SET '+column+'  WHERE id =:id'+searchConditions
              const updated = await client.query(sql(queryText)(vals));
              //console.log(sql(queryText)(vals))
              await client.query('COMMIT');
              //VCache.resetCache("banks_list");
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
      
      exports.removeById = (banksId,extraFields={}) => {
          return new Promise((resolve, reject) => {
            ;(async () => {
                const extra = queryFormatter(extraFields)
                let vals= {id:banksId};
                let searchConditions=""
                if(extra.cols.length>0){
                    vals={...vals,...extra.vals};
                    searchConditions=" AND " + extra.cols.join(" AND ")
                }
                const client = await pool.connect()
                try {
                    await client.query('BEGIN')
                    const queryText = 'DELETE FROM banks  WHERE  id=:id '+searchConditions
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
      
    exports.uploadFile = (req) => {
        return new Promise(async(resolve, reject) => {
            if(req.file.size>1*1024*1024){ // you can chnage the file upload limit
                reject('file_size_too_big');
            }
            let colName = req.params.columnName.toLowerCase()
            let rowId = req.params.rowId
            let uploadedFileName =req.file.filename;
            ;(async () => {
           
                const client = await pool.connect()
                try {
              await client.query('BEGIN');
              const queryText = 'UPDATE banks SET '+colName+'=:0  where id =:1';
              const updated = await client.query(sql(queryText)([uploadedFileName,rowId]));
              //console.log(sql(queryText)(vals))
              await client.query('COMMIT');
              //VCache.resetCache("banks_list");
              resolve(uploadedFileName)
            } catch (e) {
              
                reject(e);
                
            } finally {
                client.release()
            }
            })().catch(e =>  reject(e.stack))
        });
        };
        
  