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
             
                const queryText = 'SELECT * from users where id=:id '+searchConditions+' LIMIT 1'
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
                const queryText = 'SELECT * from users '+condition+' LIMIT 1'
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

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
    ;(async () => {
        
        const client = await pool.connect()
        try {
            
            const queryText = 'SELECT * from users where email=:email LIMIT 1'
            const list = await client.query(sql(queryText)({email:email}))
            resolve(list.rows[0]);
            
        } catch (e) {
            
            reject(e);
            
        } finally {
            client.release()
        }
        })().catch(e =>  reject(e.stack))
    });
    
    };
        

exports.findByMobile = (mobile) => {
    return new Promise((resolve, reject) => {
    ;(async () => {
        
        const client = await pool.connect()
        try {
            
            const queryText = 'SELECT * from users where mobile=:mobile LIMIT 1'
            const list = await client.query(sql(queryText)({mobile:mobile}))
            resolve(list.rows[0]);
            
        } catch (e) {
            
            reject(e);
            
        } finally {
            client.release()
        }
        })().catch(e =>  reject(e.stack))
    });
    
    };
        
      exports.createUsers = async(body) => {
          
    var cols=[];
    var param=[];
    var vals = {};
    
                      
if(body.usertype!=undefined){
    cols.push("usertype");
    param.push(":usertype");
    vals['usertype'] = parseInt(body.usertype) ;
}
                         
if(body.lastname!=undefined){
    cols.push("lastname");
    param.push(":lastname");
    vals['lastname'] = body.lastname ; 
}
                         
if(body.emailotp!=undefined){
    cols.push("emailotp");
    param.push(":emailotp");
    vals['emailotp'] = body.emailotp ; 
}
                         
if(body.firstname!=undefined){
    cols.push("firstname");
    param.push(":firstname");
    vals['firstname'] = body.firstname ; 
}
                         
if(body.password!=undefined){
    cols.push("password");
    param.push(":password");
    vals['password'] = body.password ; 
}
                         
if(body.email!=undefined){
    cols.push("email");
    param.push(":email");
    vals['email'] = body.email ; 
}
                         
if(body.mobile!=undefined){
    cols.push("mobile");
    param.push(":mobile");
    vals['mobile'] = body.mobile ; 
}
                      
if(body.emailotpexpires!=undefined){
    cols.push("emailotpexpires");
    param.push(":emailotpexpires");
    vals['emailotpexpires'] = parseInt(body.emailotpexpires) ;
}
                         
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
                         
if(body.referral!=undefined){
    cols.push("referral");
    param.push(":referral");
    vals['referral'] = body.referral ; 
}
    
          var column = cols.join(',');
          var params = param.join(',');
          return new Promise((resolve, reject) => {
          ;(async () => {
            
            const client = await pool.connect()
            try {
                
        let   emailCHeck =await this.findOne({"email":body.email})
          if(emailCHeck ) {
            reject("email exists");
            return;
          }
        
        let   mobileCHeck =await this.findOne({"mobile":body.mobile})
          if(mobileCHeck ) {
            reject("mobile exists");
            return;
          }
        
                await client.query('BEGIN');
                const queryText = 'INSERT INTO users('+column+') VALUES('+params+') RETURNING id ';
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
    

    if(query.usertype!=null ){
      if(!isNaN(query.usertype)){
        let usertype_ = queryBuilder_number(query,"usertype","usertype")
        cols.push(usertype_);
        vals['usertype'] = query.usertype;
      }
    }
    if(query.usertype_array){
        if(Array.isArray(query.usertype_array) && query.usertype_array.length==2){
            cols.push(" usertype BETWEEN :usertype_1 AND  :usertype_2 ");
            vals['usertype_1'] = query.usertype_array[0]
            vals['usertype_2'] = query.usertype_array[1]
        }else if(Array.isArray(query.usertype_array) && query.usertype_array.length>2){
            cols.push(" usertype = ANY(:usertype) ");
            const usertypeString = query.usertype_array.map((num) => num);
            vals['usertype'] = usertypeString;
        }
    }


    
    if(query.lastname){
        let lastname_ = queryBuilder_string(query,"lastname","lastname")
        cols.push(lastname_);
        vals['lastname'] = query.lastname;
       
    }
    if(query.lastname_array){
        if(Array.isArray(query.lastname_array) && query.lastname_array.length>1){
            cols.push(" lastname = ANY(:lastname) ");
            const lastnameString = query.lastname_array.map((data) => data);
            vals['lastname'] = lastnameString;
        }
    }


    
    query.emailotp_mode = "equals"
    if(query.emailotp){
        let emailotp_ = queryBuilder_string(query,"emailotp","emailotp")
        cols.push(emailotp_);
        vals['emailotp'] = query.emailotp;
       
    }
    if(query.emailotp_array){
        if(Array.isArray(query.emailotp_array) && query.emailotp_array.length>1){
            cols.push(" emailotp = ANY(:emailotp) ");
            const emailotpString = query.emailotp_array.map((data) => data);
            vals['emailotp'] = emailotpString;
        }
    }


    
    if(query.firstname){
        let firstname_ = queryBuilder_string(query,"firstname","firstname")
        cols.push(firstname_);
        vals['firstname'] = query.firstname;
       
    }
    if(query.firstname_array){
        if(Array.isArray(query.firstname_array) && query.firstname_array.length>1){
            cols.push(" firstname = ANY(:firstname) ");
            const firstnameString = query.firstname_array.map((data) => data);
            vals['firstname'] = firstnameString;
        }
    }


    
    if(query.email){
        let email_ = queryBuilder_string(query,"email","email")
        cols.push(email_);
        vals['email'] = query.email;
       
    }
    if(query.email_array){
        if(Array.isArray(query.email_array) && query.email_array.length>1){
            cols.push(" email = ANY(:email) ");
            const emailString = query.email_array.map((data) => data);
            vals['email'] = emailString;
        }
    }


    
    if(query.mobile){
        let mobile_ = queryBuilder_string(query,"mobile","mobile")
        cols.push(mobile_);
        vals['mobile'] = query.mobile;
       
    }
    if(query.mobile_array){
        if(Array.isArray(query.mobile_array) && query.mobile_array.length>1){
            cols.push(" mobile = ANY(:mobile) ");
            const mobileString = query.mobile_array.map((data) => data);
            vals['mobile'] = mobileString;
        }
    }


    if(query.emailotpexpires!=null ){
      if(!isNaN(query.emailotpexpires)){
        let emailotpexpires_ = queryBuilder_number(query,"emailotpexpires","emailotpexpires")
        cols.push(emailotpexpires_);
        vals['emailotpexpires'] = query.emailotpexpires;
      }
    }
    if(query.emailotpexpires_array){
        if(Array.isArray(query.emailotpexpires_array) && query.emailotpexpires_array.length==2){
            cols.push(" emailotpexpires BETWEEN :emailotpexpires_1 AND  :emailotpexpires_2 ");
            vals['emailotpexpires_1'] = query.emailotpexpires_array[0]
            vals['emailotpexpires_2'] = query.emailotpexpires_array[1]
        }else if(Array.isArray(query.emailotpexpires_array) && query.emailotpexpires_array.length>2){
            cols.push(" emailotpexpires = ANY(:emailotpexpires) ");
            const emailotpexpiresString = query.emailotpexpires_array.map((num) => num);
            vals['emailotpexpires'] = emailotpexpiresString;
        }
    }


    
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
    

    
    if(query.referral){
        let referral_ = queryBuilder_string(query,"referral","referral")
        cols.push(referral_);
        vals['referral'] = query.referral;
       
    }
    if(query.referral_array){
        if(Array.isArray(query.referral_array) && query.referral_array.length>1){
            cols.push(" referral = ANY(:referral) ");
            const referralString = query.referral_array.map((data) => data);
            vals['referral'] = referralString;
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
                 
                    const queryText = 'SELECT * from users' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage+' OFFSET '+offset;
                    const list = await client.query(sql(queryText)(vals));
                    const queryTextCount = 'SELECT COUNT(*) as total from users' +searchConditions
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
             
                const queryText = 'SELECT * from users' +searchConditions+'  LIMIT '+perPage;
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
    let keyConditions =` WHERE  (lastname LIKe '%' || :search || '%' 
 OR firstname LIKe '%' || :search || '%' 
 OR email LIKe '%' || :search || '%' 
 OR mobile LIKe '%' || :search || '%' 
 OR referral LIKe '%' || :search || '%' )`;
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
         
            const queryText = 'SELECT * from users' +searchConditions+' order by '+sortBy+' '+sortDirection+' LIMIT '+perPage;
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
      exports.patchUsers = async(id, reqData,extraFields={}) => {
        var body = reqData;
        
    var cols=[];
    var vals = {};
    
                             
if(body.usertype!=undefined){
    cols.push("usertype = :usertype");
    vals['usertype'] = parseInt(body.usertype) ; 
}
                             
if(body.lastname!=undefined){
    cols.push("lastname = :lastname");
    vals['lastname'] = body.lastname ;  
}
                             
if(body.emailotp!=undefined){
    cols.push("emailotp = :emailotp");
    vals['emailotp'] = body.emailotp ;  
}
                             
if(body.firstname!=undefined){
    cols.push("firstname = :firstname");
    vals['firstname'] = body.firstname ;  
}
                             
if(body.password!=undefined){
    cols.push("password = :password");
    vals['password'] = body.password ;  
}
                             
if(body.email!=undefined){
    cols.push("email = :email");
    vals['email'] = body.email ;  
}
                             
if(body.mobile!=undefined){
    cols.push("mobile = :mobile");
    vals['mobile'] = body.mobile ;  
}
                             
if(body.emailotpexpires!=undefined){
    cols.push("emailotpexpires = :emailotpexpires");
    vals['emailotpexpires'] = parseInt(body.emailotpexpires) ; 
}
                             
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
                             
if(body.referral!=undefined){
    cols.push("referral = :referral");
    vals['referral'] = body.referral ;  
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
             
        if(body.email!=undefined){
        let   emailCHeck =await this.findOne({id:{ne:id},"email":body.email})
          if(emailCHeck ) {
            reject("email exists");
            return;
          }
        }
        
        if(body.mobile!=undefined){
        let   mobileCHeck =await this.findOne({id:{ne:id},"mobile":body.mobile})
          if(mobileCHeck ) {
            reject("mobile exists");
            return;
          }
        }
        
              await client.query('BEGIN');
              const queryText = 'UPDATE users SET '+column+'  WHERE id =:id'+searchConditions
              const updated = await client.query(sql(queryText)(vals));
              //console.log(sql(queryText)(vals))
              await client.query('COMMIT');
              //VCache.resetCache("users_list");
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
      
      exports.removeById = (usersId,extraFields={}) => {
          return new Promise((resolve, reject) => {
            ;(async () => {
                const extra = queryFormatter(extraFields)
                let vals= {id:usersId};
                let searchConditions=""
                if(extra.cols.length>0){
                    vals={...vals,...extra.vals};
                    searchConditions=" AND " + extra.cols.join(" AND ")
                }
                const client = await pool.connect()
                try {
                    await client.query('BEGIN')
                    const queryText = 'DELETE FROM users  WHERE  id=:id '+searchConditions
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
      
  