import { getRandomValues } from "crypto";
import { query, Request,Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getUsers=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const response:QueryResult=await pool.query('SELECT id, firstname, middlename , lastname , email, phonenumber, role, address,doj, customer_name FROM  userstable LEFT JOIN customerstable on id=user_id');
        return res.status(200).send(response.rows);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const getUserById=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        const response:QueryResult=await pool.query('SELECT id, firstname, middlename , lastname , email, phonenumber, role, address,doj, customer_name FROM userstable , customerstable where userstable.id=$1 AND customerstable.user_id=$1',[id]);
        return res.status(200).send(response.rows);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const {firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj,customer_name} =req.body;
        let user=await pool.query('INSERT INTO userstable (firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj)VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj]);
        
        let id=await pool.query("SELECT id FROM userstable WHERE firstName= $1 AND phonenumber=$2",[firstName,phoneNumber]);
        
        id=id.rows[0].id;
        
        await pool.query("INSERT INTO customerstable (customer_name, user_id) VALUES ($1,$2)", [customer_name,id]);
        return res.json({
            message:'User created Successfully',
            body:{
                user:{
                    firstName,
                    middleName,
                    lastName,
                    email,
                    phoneNumber,
                    Role, 
                    Address,
                    Doj,
                    customer_name
                }
            }
        })
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        let customer_name_old = await pool.query("SELECT customer_name FROM customerstable WHERE user_id=$1",[id]);
        console.log(customer_name_old);
        console.log(customer_name_old.rows[0]);
        console.log(customer_name_old.rows[0]);
        customer_name_old=customer_name_old.rows[0].customer_name;

        const {firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj,customer_name} =req.body;
        await pool.query('UPDATE userstable SET firstName = $1, middleName  = $2, lastName = $3 ,email = $4 ,phoneNumber = $5 ,Role = $6 , Address  = $7 ,Doj = $8 where id= $9',[firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj,id]);

        if(customer_name!==customer_name_old){
            await pool.query("DELETE FROM customerstable where user_id=$1",[id]);

            await pool.query(
                "INSERT INTO customerstable (customer_name,user_id)VALUES($1,$2)",[customer_name,id]
            );
        }

        return res.json(`User ${id} updated successfully`);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        await pool.query('DELETE FROM userstable WHERE id= $1',[id]);
        return res.json(`User ${id} deleted successfully`);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}