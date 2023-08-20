
const Pool = require("pg").Pool;
const  env  = process.env;
// PLEASE CREATE THE DATABSE harimaumint and add new user
const pool = new Pool({
  user: env.DB_USER || 'doadmin',
  password: env.DB_PASSWORD || "AVNS_EHbKeqd03ft-2cIK8eD" ,
  host: env.DB_HOST || "private-db-postgresql-sgp1-06768-do-user-8847043-0.b.db.ondigitalocean.com",
  port: env.DB_PORT || "25060",
  database: env.DB_NAME || "defaultdb" 
});
//console.log(pool);

module.exports = pool;
async function createTableIfNotExists() {
    let  client = await pool.connect()
    const ext=`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
    // REMOVE THIS FROM PRODUCTION
    const createDBSQL="SELECT 'CREATE DATABASE harimaumint' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'harimaumint')"
    const extResult = await client.query(createDBSQL);
    const extDBResult = await client.query(ext);
    
    try {
        // Check if the table[users] exists
        const tableusersExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')";
        const tableusersExistsResult = await client.query(tableusersExistsQuery);
        const tableusersExists = tableusersExistsResult.rows[0].exists;
    
        if (!tableusersExists) {
          const createusersTableScript =`
          CREATE TABLE IF NOT EXISTS  users(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					usertype INTEGER NOT NULL DEFAULT 0,
					lastname VARCHAR(50) NOT NULL  DEFAULT '',
					emailotp VARCHAR(100)  NULL,
					firstname VARCHAR(100)  NULL,
					password VARCHAR(255) NOT NULL  DEFAULT '',
					email VARCHAR(100) NOT NULL   UNIQUE,
					mobile VARCHAR(20) NOT NULL   UNIQUE,
					emailotpexpires INTEGER  NULL,
					createby VARCHAR(100)  NULL,
					createat  DATE NOT NULL  ,
					updateby VARCHAR(100)  NULL,
					updateat DATE  NULL,
					referral VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createusersTableScript);
          //console.log('Table users created successfully!');
        } else {
         const usersCols= [
            {name:"usertype",type:" INTEGER   NULL"},
{name:"lastname",type:" VARCHAR(50)  NULL"},
{name:"emailotp",type:" VARCHAR(100)  NULL"},
{name:"firstname",type:" VARCHAR(100)  NULL"},
{name:"password",type:" VARCHAR(255)  NULL"},
{name:"email",type:" VARCHAR(100)  NULL"},
{name:"mobile",type:" VARCHAR(20)  NULL"},
{name:"emailotpexpires",type:" INTEGER   NULL"},
{name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" DATE  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" DATE  NULL"},
{name:"referral",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<usersCols.length;c++){
         let colObj= usersCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'users'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE users ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table users already exists.');
        }
      } catch (error) {
        console.log("ERROR: users")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[ewallets] exists
        const tableewalletsExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ewallets')";
        const tableewalletsExistsResult = await client.query(tableewalletsExistsQuery);
        const tableewalletsExists = tableewalletsExistsResult.rows[0].exists;
    
        if (!tableewalletsExists) {
          const createewalletsTableScript =`
          CREATE TABLE IF NOT EXISTS  ewallets(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					hold NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					status BOOLEAN ,
					blocked BOOLEAN ,
					name VARCHAR(25) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createewalletsTableScript);
          //console.log('Table ewallets created successfully!');
        } else {
         const ewalletsCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"balance",type:" NUMERIC(10, 2)   NULL"},
{name:"hold",type:" NUMERIC(10, 2)   NULL"},
{name:"status",type:" BOOLEAN   NULL"},
{name:"blocked",type:" BOOLEAN   NULL"},
{name:"name",type:" VARCHAR(25)  NULL"}
         ]
         for(var c=0;c<ewalletsCols.length;c++){
         let colObj= ewalletsCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'ewallets'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE ewallets ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table ewallets already exists.');
        }
      } catch (error) {
        console.log("ERROR: ewallets")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[walletType] exists
        const tablewalletTypeExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'walletType')";
        const tablewalletTypeExistsResult = await client.query(tablewalletTypeExistsQuery);
        const tablewalletTypeExists = tablewalletTypeExistsResult.rows[0].exists;
    
        if (!tablewalletTypeExists) {
          const createwalletTypeTableScript =`
          CREATE TABLE IF NOT EXISTS  wallettype(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					name VARCHAR(20) NOT NULL  DEFAULT '',
					code VARCHAR(5) NOT NULL  DEFAULT '',
					decimalposition INTEGER NOT NULL DEFAULT 0,
					maxtransfer NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					active BOOLEAN 
					);
          `
          await client.query(createwalletTypeTableScript);
          //console.log('Table walletType created successfully!');
        } else {
         const walletTypeCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"name",type:" VARCHAR(20)  NULL"},
{name:"code",type:" VARCHAR(5)  NULL"},
{name:"decimalposition",type:" INTEGER   NULL"},
{name:"maxtransfer",type:" NUMERIC(10, 2)   NULL"},
{name:"active",type:" BOOLEAN   NULL"}
         ]
         for(var c=0;c<walletTypeCols.length;c++){
         let colObj= walletTypeCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'walletType'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE walletType ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table walletType already exists.');
        }
      } catch (error) {
        console.log("ERROR: walletType")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[banks] exists
        const tablebanksExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'banks')";
        const tablebanksExistsResult = await client.query(tablebanksExistsQuery);
        const tablebanksExists = tablebanksExistsResult.rows[0].exists;
    
        if (!tablebanksExists) {
          const createbanksTableScript =`
          CREATE TABLE IF NOT EXISTS  banks(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					bankname VARCHAR(3) NOT NULL  DEFAULT '',
					swiftcode VARCHAR(20) NOT NULL  DEFAULT '',
					bankaddress TEXT ,
					city VARCHAR(50) NOT NULL  DEFAULT '',
					state VARCHAR(20) NOT NULL  DEFAULT '',
					postcode VARCHAR(20) NOT NULL  DEFAULT '',
					accountname VARCHAR(100) NOT NULL  DEFAULT '',
					accountnumber VARCHAR(30) NOT NULL  DEFAULT '',
					document VARCHAR(100) NOT NULL  DEFAULT '',
					active BOOLEAN 
					);
          `
          await client.query(createbanksTableScript);
          //console.log('Table banks created successfully!');
        } else {
         const banksCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"bankname",type:" VARCHAR(3)  NULL"},
{name:"swiftcode",type:" VARCHAR(20)  NULL"},
{name:"bankaddress",type:" TEXT  NULL"},
{name:"city",type:" VARCHAR(50)  NULL"},
{name:"state",type:" VARCHAR(20)  NULL"},
{name:"postcode",type:" VARCHAR(20)  NULL"},
{name:"accountname",type:" VARCHAR(100)  NULL"},
{name:"accountnumber",type:" VARCHAR(30)  NULL"},
{name:"document",type:" VARCHAR(100)  NULL"},
{name:"active",type:" BOOLEAN   NULL"}
         ]
         for(var c=0;c<banksCols.length;c++){
         let colObj= banksCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'banks'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE banks ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table banks already exists.');
        }
      } catch (error) {
        console.log("ERROR: banks")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[userDetails] exists
        const tableuserDetailsExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'userDetails')";
        const tableuserDetailsExistsResult = await client.query(tableuserDetailsExistsQuery);
        const tableuserDetailsExists = tableuserDetailsExistsResult.rows[0].exists;
    
        if (!tableuserDetailsExists) {
          const createuserDetailsTableScript =`
          CREATE TABLE IF NOT EXISTS  userdetails(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					address TEXT ,
					icpassport VARCHAR(25) NOT NULL   UNIQUE,
					photo VARCHAR(100) NOT NULL  DEFAULT '',
					icdocument VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createuserDetailsTableScript);
          //console.log('Table userDetails created successfully!');
        } else {
         const userDetailsCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"address",type:" TEXT  NULL"},
{name:"icpassport",type:" VARCHAR(25)  NULL"},
{name:"photo",type:" VARCHAR(100)  NULL"},
{name:"icdocument",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<userDetailsCols.length;c++){
         let colObj= userDetailsCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'userDetails'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE userDetails ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table userDetails already exists.');
        }
      } catch (error) {
        console.log("ERROR: userDetails")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[kyc] exists
        const tablekycExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'kyc')";
        const tablekycExistsResult = await client.query(tablekycExistsQuery);
        const tablekycExists = tablekycExistsResult.rows[0].exists;
    
        if (!tablekycExists) {
          const createkycTableScript =`
          CREATE TABLE IF NOT EXISTS  kyc(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL
					);
          `
          await client.query(createkycTableScript);
          //console.log('Table kyc created successfully!');
        } else {
         const kycCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"}
         ]
         for(var c=0;c<kycCols.length;c++){
         let colObj= kycCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'kyc'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE kyc ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table kyc already exists.');
        }
      } catch (error) {
        console.log("ERROR: kyc")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[transaction] exists
        const tabletransactionExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'transaction')";
        const tabletransactionExistsResult = await client.query(tabletransactionExistsQuery);
        const tabletransactionExists = tabletransactionExistsResult.rows[0].exists;
    
        if (!tabletransactionExists) {
          const createtransactionTableScript =`
          CREATE TABLE IF NOT EXISTS  transaction(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					walletid VARCHAR(100) NOT NULL  DEFAULT '',
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00
					);
          `
          await client.query(createtransactionTableScript);
          //console.log('Table transaction created successfully!');
        } else {
         const transactionCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"walletid",type:" VARCHAR(100)  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"balance",type:" NUMERIC(10, 2)   NULL"}
         ]
         for(var c=0;c<transactionCols.length;c++){
         let colObj= transactionCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'transaction'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE transaction ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table transaction already exists.');
        }
      } catch (error) {
        console.log("ERROR: transaction")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[accounts] exists
        const tableaccountsExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'accounts')";
        const tableaccountsExistsResult = await client.query(tableaccountsExistsQuery);
        const tableaccountsExists = tableaccountsExistsResult.rows[0].exists;
    
        if (!tableaccountsExists) {
          const createaccountsTableScript =`
          CREATE TABLE IF NOT EXISTS  accounts(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					accounttype VARCHAR(100) NOT NULL  DEFAULT '',
					quantity NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					unitprice NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					total NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					maturedate  DATE NOT NULL  ,
					termscount INTEGER NOT NULL DEFAULT 0,
					monthcount INTEGER NOT NULL DEFAULT 0,
					status VARCHAR(100) NOT NULL  DEFAULT '',
					block BOOLEAN ,
					owner VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createaccountsTableScript);
          //console.log('Table accounts created successfully!');
        } else {
         const accountsCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"accounttype",type:" VARCHAR(100)  NULL"},
{name:"quantity",type:" NUMERIC(10, 2)   NULL"},
{name:"unitprice",type:" NUMERIC(10, 2)   NULL"},
{name:"total",type:" NUMERIC(10, 2)   NULL"},
{name:"maturedate",type:" DATE  NULL"},
{name:"termscount",type:" INTEGER   NULL"},
{name:"monthcount",type:" INTEGER   NULL"},
{name:"status",type:" VARCHAR(100)  NULL"},
{name:"block",type:" BOOLEAN   NULL"},
{name:"owner",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<accountsCols.length;c++){
         let colObj= accountsCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'accounts'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE accounts ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table accounts already exists.');
        }
      } catch (error) {
        console.log("ERROR: accounts")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[deposit] exists
        const tabledepositExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'deposit')";
        const tabledepositExistsResult = await client.query(tabledepositExistsQuery);
        const tabledepositExists = tabledepositExistsResult.rows[0].exists;
    
        if (!tabledepositExists) {
          const createdepositTableScript =`
          CREATE TABLE IF NOT EXISTS  deposit(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					wallet VARCHAR(100) NOT NULL  DEFAULT '',
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					document VARCHAR(100) NOT NULL  DEFAULT '',
					method VARCHAR(100) NOT NULL  DEFAULT '',
					comments TEXT ,
					status VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createdepositTableScript);
          //console.log('Table deposit created successfully!');
        } else {
         const depositCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"wallet",type:" VARCHAR(100)  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"document",type:" VARCHAR(100)  NULL"},
{name:"method",type:" VARCHAR(100)  NULL"},
{name:"comments",type:" TEXT  NULL"},
{name:"status",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<depositCols.length;c++){
         let colObj= depositCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'deposit'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE deposit ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table deposit already exists.');
        }
      } catch (error) {
        console.log("ERROR: deposit")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[transfer] exists
        const tabletransferExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'transfer')";
        const tabletransferExistsResult = await client.query(tabletransferExistsQuery);
        const tabletransferExists = tabletransferExistsResult.rows[0].exists;
    
        if (!tabletransferExists) {
          const createtransferTableScript =`
          CREATE TABLE IF NOT EXISTS  transfer(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					wallet VARCHAR(100) NOT NULL  DEFAULT '',
					sourcewallet VARCHAR(100) NOT NULL  DEFAULT '',
					status VARCHAR(100) NOT NULL  DEFAULT '',
					comments TEXT 
					);
          `
          await client.query(createtransferTableScript);
          //console.log('Table transfer created successfully!');
        } else {
         const transferCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"wallet",type:" VARCHAR(100)  NULL"},
{name:"sourcewallet",type:" VARCHAR(100)  NULL"},
{name:"status",type:" VARCHAR(100)  NULL"},
{name:"comments",type:" TEXT  NULL"}
         ]
         for(var c=0;c<transferCols.length;c++){
         let colObj= transferCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'transfer'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE transfer ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table transfer already exists.');
        }
      } catch (error) {
        console.log("ERROR: transfer")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[exchange] exists
        const tableexchangeExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'exchange')";
        const tableexchangeExistsResult = await client.query(tableexchangeExistsQuery);
        const tableexchangeExists = tableexchangeExistsResult.rows[0].exists;
    
        if (!tableexchangeExists) {
          const createexchangeTableScript =`
          CREATE TABLE IF NOT EXISTS  exchange(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					sourcewallet VARCHAR(100) NOT NULL  DEFAULT '',
					wallet VARCHAR(100) NOT NULL  DEFAULT '',
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					comments TEXT ,
					sourcewallettype VARCHAR(100) NOT NULL  DEFAULT '',
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					status VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createexchangeTableScript);
          //console.log('Table exchange created successfully!');
        } else {
         const exchangeCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"sourcewallet",type:" VARCHAR(100)  NULL"},
{name:"wallet",type:" VARCHAR(100)  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"comments",type:" TEXT  NULL"},
{name:"sourcewallettype",type:" VARCHAR(100)  NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"status",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<exchangeCols.length;c++){
         let colObj= exchangeCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'exchange'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE exchange ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table exchange already exists.');
        }
      } catch (error) {
        console.log("ERROR: exchange")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[withdraw] exists
        const tablewithdrawExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'withdraw')";
        const tablewithdrawExistsResult = await client.query(tablewithdrawExistsQuery);
        const tablewithdrawExists = tablewithdrawExistsResult.rows[0].exists;
    
        if (!tablewithdrawExists) {
          const createwithdrawTableScript =`
          CREATE TABLE IF NOT EXISTS  withdraw(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					wallettype VARCHAR(100) NOT NULL  DEFAULT '',
					wallet VARCHAR(100) NOT NULL  DEFAULT '',
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					status VARCHAR(100) NOT NULL  DEFAULT '',
					comment TEXT 
					);
          `
          await client.query(createwithdrawTableScript);
          //console.log('Table withdraw created successfully!');
        } else {
         const withdrawCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"wallettype",type:" VARCHAR(100)  NULL"},
{name:"wallet",type:" VARCHAR(100)  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"status",type:" VARCHAR(100)  NULL"},
{name:"comment",type:" TEXT  NULL"}
         ]
         for(var c=0;c<withdrawCols.length;c++){
         let colObj= withdrawCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'withdraw'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE withdraw ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table withdraw already exists.');
        }
      } catch (error) {
        console.log("ERROR: withdraw")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[referral] exists
        const tablereferralExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'referral')";
        const tablereferralExistsResult = await client.query(tablereferralExistsQuery);
        const tablereferralExists = tablereferralExistsResult.rows[0].exists;
    
        if (!tablereferralExists) {
          const createreferralTableScript =`
          CREATE TABLE IF NOT EXISTS  referral(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					email VARCHAR(150) NOT NULL  DEFAULT '',
					amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
					status VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createreferralTableScript);
          //console.log('Table referral created successfully!');
        } else {
         const referralCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"email",type:" VARCHAR(150)  NULL"},
{name:"amount",type:" NUMERIC(10, 2)   NULL"},
{name:"status",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<referralCols.length;c++){
         let colObj= referralCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'referral'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE referral ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table referral already exists.');
        }
      } catch (error) {
        console.log("ERROR: referral")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[profit] exists
        const tableprofitExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profit')";
        const tableprofitExistsResult = await client.query(tableprofitExistsQuery);
        const tableprofitExists = tableprofitExistsResult.rows[0].exists;
    
        if (!tableprofitExists) {
          const createprofitTableScript =`
          CREATE TABLE IF NOT EXISTS  profit(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					account VARCHAR(100) NOT NULL  DEFAULT '',
					level INTEGER NOT NULL DEFAULT 0,
					username VARCHAR(100) NOT NULL  DEFAULT '',
					status VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createprofitTableScript);
          //console.log('Table profit created successfully!');
        } else {
         const profitCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"account",type:" VARCHAR(100)  NULL"},
{name:"level",type:" INTEGER   NULL"},
{name:"username",type:" VARCHAR(100)  NULL"},
{name:"status",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<profitCols.length;c++){
         let colObj= profitCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'profit'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE profit ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table profit already exists.');
        }
      } catch (error) {
        console.log("ERROR: profit")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[history] exists
        const tablehistoryExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'history')";
        const tablehistoryExistsResult = await client.query(tablehistoryExistsQuery);
        const tablehistoryExists = tablehistoryExistsResult.rows[0].exists;
    
        if (!tablehistoryExists) {
          const createhistoryTableScript =`
          CREATE TABLE IF NOT EXISTS  history(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					subject VARCHAR(50) NOT NULL  DEFAULT '',
					comments TEXT ,
					status VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createhistoryTableScript);
          //console.log('Table history created successfully!');
        } else {
         const historyCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"subject",type:" VARCHAR(50)  NULL"},
{name:"comments",type:" TEXT  NULL"},
{name:"status",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<historyCols.length;c++){
         let colObj= historyCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'history'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE history ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table history already exists.');
        }
      } catch (error) {
        console.log("ERROR: history")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[helpdesk] exists
        const tablehelpdeskExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'helpdesk')";
        const tablehelpdeskExistsResult = await client.query(tablehelpdeskExistsQuery);
        const tablehelpdeskExists = tablehelpdeskExistsResult.rows[0].exists;
    
        if (!tablehelpdeskExists) {
          const createhelpdeskTableScript =`
          CREATE TABLE IF NOT EXISTS  helpdesk(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					subject VARCHAR(250) NOT NULL  DEFAULT '',
					details TEXT ,
					document VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createhelpdeskTableScript);
          //console.log('Table helpdesk created successfully!');
        } else {
         const helpdeskCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"subject",type:" VARCHAR(250)  NULL"},
{name:"details",type:" TEXT  NULL"},
{name:"document",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<helpdeskCols.length;c++){
         let colObj= helpdeskCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'helpdesk'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE helpdesk ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table helpdesk already exists.');
        }
      } catch (error) {
        console.log("ERROR: helpdesk")
        console.error('Error:', error);
      }
    

    try {
        // Check if the table[helpdesklog] exists
        const tablehelpdesklogExistsQuery = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'helpdesklog')";
        const tablehelpdesklogExistsResult = await client.query(tablehelpdesklogExistsQuery);
        const tablehelpdesklogExists = tablehelpdesklogExistsResult.rows[0].exists;
    
        if (!tablehelpdesklogExists) {
          const createhelpdesklogTableScript =`
          CREATE TABLE IF NOT EXISTS  helpdesklog(
					id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
					createby VARCHAR(100) NOT NULL  DEFAULT '',
					createat timestamp NOT NULL DEFAULT NOW(),
					updateby VARCHAR(100)  NULL,
					updateat timestamp  NULL,
					subject VARCHAR(150) NOT NULL  DEFAULT '',
					comments VARCHAR(100) NOT NULL  DEFAULT '',
					documents VARCHAR(100) NOT NULL  DEFAULT ''
					);
          `
          await client.query(createhelpdesklogTableScript);
          //console.log('Table helpdesklog created successfully!');
        } else {
         const helpdesklogCols= [
            {name:"createby",type:" VARCHAR(100)  NULL"},
{name:"createat",type:" timestamp  NULL"},
{name:"updateby",type:" VARCHAR(100)  NULL"},
{name:"updateat",type:" timestamp  NULL"},
{name:"subject",type:" VARCHAR(150)  NULL"},
{name:"comments",type:" VARCHAR(100)  NULL"},
{name:"documents",type:" VARCHAR(100)  NULL"}
         ]
         for(var c=0;c<helpdesklogCols.length;c++){
         let colObj= helpdesklogCols[c];
         let columnExistsQuery = `
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_name = 'helpdesklog'
            AND column_name = '${colObj.name}'
        );
        `;
        let columnExistsResult = await client.query(columnExistsQuery);
        let columnExists = columnExistsResult.rows[0].exists;

        if (!columnExists) {
            // Add the new column
            const addColumnQuery = `ALTER TABLE helpdesklog ADD COLUMN ${colObj.name} ${colObj.type};`;
            await client.query(addColumnQuery);
        }
        } 
          //console.log('Table helpdesklog already exists.');
        }
      } catch (error) {
        console.log("ERROR: helpdesklog")
        console.error('Error:', error);
      }
    
    await client.end();
  }
//Function uuid_generate_v4() does not exist
//To resolve this problem, just run this command in the SQL Editor
//CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
// YOU SHOULD REMOME THIS FUNCTION IN PRODUCTION
  createTableIfNotExists();
