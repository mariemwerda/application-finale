import express from "express";
import mongoose from "mongoose";
import Formation from "../Models/formation.js";
import User from "../models/user.js";
import util from "util";
import multer from "multer";
import DocFormation from "../Models/docformation.js";
import fs from "fs"

export const getFormations = async (req, res) => {
    try {
        const format = await Formation.find()
        res.status(200).json(format)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const getFormationByID = async (req, res) => {
    try {
        const format = await Formation.findById(req.params).populate("docformations").populate("users").exec();
        res.status(200).json(format)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createFormation = async (req, res) => {

    const { titre, Resume, description ,categorieID} = req.body;
    const newformation = new Formation(
        {
            titre: titre,
            Resume: Resume,
            description: description,
            categorieID: categorieID

        })
    try {
        await newformation.save()

        const formation = await Formation.findOne().sort({ _id: -1 }).limit(1);
        await Formation.findByIdAndUpdate(formation._id,
            { $push: { users: req.user.user[0]._id } },
            { new: true, useFindAndModify: false });

        res.status(200).json(newformation)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateFormation = async (req, res) => {

    try {
        const formation1 = {
            titre: req.body.titre,
            Resume: req.body.Resume,
            description: req.body.description,

        }
        await Formation.findByIdAndUpdate(req.body._id, formation1)
        res.json(formation1)
    }
    catch (error) {
        res.status(405).json({ message: error.message })
    }

}

export const deleteFormation = async (req, res) => {

    const forma = await Formation.find({ "_id": req.params })
    console.log(req.params)
    const listedocformation = forma[0].docformations;
    if (listedocformation.length != 0) {
        listedocformation.forEach(async docForm => {

            const docFormation = await DocFormation.findById(docForm);


            if (typeof docFormation !== 'undefined') {
                const file = docFormation.docformation;

                const path = './uploads/' + file
                fs.unlink(path, async (err) => {
                    if (err) {
                        console.error(err)
                        return
                    } else {
                        await DocFormation.findByIdAndDelete(docFormation._id);

                    }

                })

            }


        })
    }



    try {

        if (forma == null) return res.json({ message: "formattion not found" })

        await Formation.findByIdAndDelete(req.params)
        res.json({ message: "formation deleted successfully" })

    } catch (error) { res.json({ message: error.message }) }


}

export const getFormationByCAT = async (req, res) => {
    try {
        var result = await Formation.find({ categorieID: req.params.categorieID })
            .populate("categorieID").exec();
        res.json(result)
    }
    catch (error) { res.json({ message: error.message }) }

}
export const addUserToFormation = async (req, res) => {
   
   try {
        await Formation.findByIdAndUpdate(req.params.id,
            { $push: { users: req.user.user[0]._id } },
            { new: true, useFindAndModify: false });
        console.log(req.user);
       
        await User.findByIdAndUpdate(req.user.user[0]._id,
            { $push: { formations: req.params.id } },
            { new: true, useFindAndModify: false });

        res.json({ message: "user est ajouté avec succéss" })

    } catch (error) {
        res.json({ message: error.message })
    }
    
}
export const getFormationByUser = async (req, res) => {
    try {
        const formations = await Formation.find({ users: req.user.user[0]._id })
        res.status(200).json(formations)

    } catch (error) {
        res.json({ message: error.message })
    }


}
export const getParticipantByUser = async (req, res) => {
    const format = await Formation.findById(req.params.id)
    const listeParticipants = format.users;
    var users = new Array();
    var i = 0;
    if (listeParticipants.length != 0) {

        for (i = 0; i < listeParticipants.length; i++) {

            const user = await User.findById(listeParticipants[i]);

            if (user.role == "participant") {
                users.push(user)

            }
        }

    }
    res.status(200).json(users);


}



export const CheckInscription = async (req, res) => {

    const forma = await Formation.find({ "_id": req.params.id })
    const listUsers=forma[0].users
    var inscrit=false;
    var i=0;
    if(req.user.user[0]._id!="undefined")
    {
    for(i=0;i<listUsers.length;i++)
    {
        if(listUsers[i]==req.user.user[0]._id)
           {inscrit=true;
            break;}
    }
}
    res.status(200).json({inscrit})


}


export const GetFormateur = async (req, res) => {
var name="";
var i=0;

    try{
        
        const formation =await Formation.find({_id:req.params.id}).populate("users").exec();
        const users= formation[0].users;
       for (i=0;i<users.length; i++){
            if(users[i].role=="formatteur")
             name=users[i].nom
        }
        
       console.log("nom "+name);
       res.status(200).json(name)

    }catch(error){res.json({message:error.message})}

}

