//import db from '..databaseConnection.js'
import db from '../config/databaseConnection.js'
export const createUser = async (req, res) =>{
const {first_name, last_name, user_name, company_name, company_description, opening_balance, password} = req.body;
/*if (!first_name || !last_name || !user_name || !company_name || !company_description || ! opening_balance){
    return res.status(400).json({message:'Missing fields'})
} */
const sql = "INSERT INTO users (first_name, company_name, company_description, password ) VALUES (?, ?, ?, ? )"
db.query( sql, [first_name,  company_name, company_description, password], (err, result) => {
    if (err){
        console.error(err)
        return res.status(500).json({message:"DB Error", err})
    }
    return res.status(201).json(
        {
            message:"User Created Successfully",
            userId :result.insertId
        }
    );
});
}

export const getUsers = async (req, res) => {
    const sql = "SELECT * FROM users";
    

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: "error occurred while getting data",
                error: err
            });
        }

        res.json(results);


    });



};


export const login = (req, res) =>{
    const {company_description, password} = req.body;
    const sql = 'SELECT * FROM users Where company_description = ? and password = ?';
   
    db.query(sql , [company_description, password], (err, rows) =>{
        if (err){
            console.log (err)
            return res.status(401).json({
                msg:'an error occured when login in'
            })
        }
        if(rows.length===0){
            return res.status(401).json({
                msg:'user not found'
            })
        }
        const user = rows[0];
        return res.status(200).json({
            message:'user found',
            userId:user.user_id,
            firstName:user.first_name
        })
    });
    
};

/*
export const login = async (req, res) =>{
    try{
 const {company_description, password} = req.body;
 const sql = 'SELECT * FROM users WHERE company_description = ? AND password = ?'
 const [rows] = await db.query(sql, [company_description, password]);
 if (rows.length ===0){
    return res.status(401).json({
        message:"incorrect name or password"
    })
 }
    const user = rows[0];
    return res.status(200).json({
        message:"User successfully logged in",
        userID:user.userId,
        firstName:user.first_name
    })

    }
    catch (err){
        return res.status(500).json({
            msg:'An error occured'
        })
    }
};*/


/* 
    if (err){
        console.error(err)
        return res.status(500).json({message:"DB Error", err})
    }
    return res.status(201).json(
        {
            message:"User Created Successfully",
            userId :result.insertId
        }
    );
});
}
*/