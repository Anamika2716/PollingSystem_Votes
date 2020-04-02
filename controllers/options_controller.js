const Questions=require("../models/questions");
const counter=require("../models/counter");
const Options=require("../models/options");
const mongoose=require('mongoose');

async  function addvote(req, res) {
    try {

        let id = req.params.id;
        let optionDoc = await Options.findOneAndUpdate({id: id}, {$inc: {vote: 1}});
        if (!optionDoc) {
            throw new Error("Invalid Option Id");
        }
        console.log("optionDoc", optionDoc);
        return res.status(200).send({
            "message": "Vote Added Successfully",
            options: {
                id: optionDoc.id,
                text: optionDoc.text,
                vote: optionDoc.vote,
                vote_link: optionDoc.vote_link
            }
        });

    } catch (e) {
        throw e;
    }
}

async function deleteOption(req, res){

    try{
        let optionId=req.params.id;
        let option=await Options.findOne({id:optionId});
        if(!option)
        {
            throw new Error("Invalid Option Id");
        }
        if(option.vote>0)
        {
            throw new Error("Cannot delete option having votes >0");
        }
        let questionId=option.questionId;
        let deleteOption=await Options.deleteOne({id:optionId});
        if(!deleteOption)
        {
            throw new Error("Error deleting option");
        }
        let deleteOptionInQuestion=await Questions.findOne({id:questionId});
        if(deleteOptionInQuestion)
        {
            let optionsArray=deleteOptionInQuestion.options;
            optionsArray.splice(optionsArray.indexOf(optionId),1);
            await deleteOptionInQuestion.save();
        }
        return res.send(200).status("Deleted Option");
    }
    catch (e) {
        res.status(500).send(e.message);
        throw e;
    }
}

    module.exports={
        addvote,
        deleteOption
};
