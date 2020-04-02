const Questions=require("../models/questions");
const counter=require("../models/counter");
const Options=require("../models/options");
const mongoose=require('mongoose');


async function postQuestions(req, res){
    try{
        console.log("inside");

       //update id by one
         let idDoc=await counter.findOneAndUpdate({Idof: "questions"}, {$inc:{id:1}},{new:true});
        if(!idDoc)
        {
            idDoc=await counter.create({
                _id:new mongoose.Types.ObjectId(),
                id:1,
                Idof:"questions"
            });
        }
        let id=idDoc.id;
        console.log("id", idDoc);
        let questions=await Questions.create({
            _id:new mongoose.Types.ObjectId(),
           id:id,//new mongoose.Types.ObjectId(),
           title:req.body.title

        });
        if(!questions)
        {
            throw new  Error("Error adding questions");
        }
        return res.status(200).json({
            data:{
                questions:{
                     id:id,
                    title:questions.title,
                    options:[]
                }
            },

        });
    }
    catch (e) {
     throw e;
    }
}
async  function addoptions(req, res){
    try {
        let questions=await Questions.find({id:req.params.id});
        if(!questions)
        {
            throw new Error("No question found");
        }
        let optionsArray=req.body.options;

       let optionId=[];
       let questionResponse=[];
      for(let i=0;i<optionsArray.length;i++){
            let options=optionsArray[i];
           let idDoc = await counter.findOneAndUpdate({Idof: "options"}, {$inc: {id: 1}}, {new: true});
           if (!idDoc) {
               idDoc = await counter.create({
                   _id: new mongoose.Types.ObjectId(),
                   id: 1,
                   Idof: "options"
               });
           }
           let id = idDoc.id;
           console.log("id", id);
           var hostname = req.headers.host;
           let optionDoc = await Options.create({
               id:id,
               questionId: req.params.id,
               text:options.text,
               vote_link:'http://'+hostname+"/options/"+id+"/add_vote"

           });
          questionResponse.push({
              id:id,
              text:optionDoc.text,
              vote:optionDoc.vote,
              vote_link:optionDoc.vote_link
          });

           if(!optionDoc)
           {
               throw new Error("Error adding options");
           }
           optionId.push(id);

       }
       console.log("options Id", optionId);
        let updated_question=await Questions.findOneAndUpdate({"id":req.params.id},
            {
                options:optionId
            });
        return res.status(200).send({
            data:{
                questions:{
                    id:updated_question.id,
                    title:updated_question.title,
                    options:questionResponse
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
}
async  function getQuestions(req, res){

    try{
        let questions=await Questions.findOne({"id":req.params.id});
        if(!questions)
        {
            throw new Error(`No Question with ${req.params.id} found`);
        }

        let options=questions.options;
        let optionResponse=[];
        console.log("opt", questions);
        for(let i=0;i<options.length;i++)
        {
            let optionDoc=await Options.findOne({id:options[i]});
            console.log("options", optionDoc);
            if(optionDoc)
            {
                optionResponse.push({
                    id:optionDoc.id,
                    text:optionDoc.text,
                    votes:optionDoc.vote,
                    vote_link:optionDoc.vote_link
                });
            }
        }
        let response={
            id:questions.id,
            title:questions.title,
            options:optionResponse
        };

        return res.status(200).send({
                   question: response
               });



    }catch (e) {

        throw e;
    }
}
async function deleteQuestion(req, res){
    try {

        let id=req.params.id;

        const question=await Questions.findOne({"id":id});
         if(!question)
         {
             throw  new Error("Invlaid Question Id");
         }
         let options=question.options;
         let canDelete=true;
         for(let i=0;i<options.length;i++)
         {
             let optionDoc=await Options.findOne({id:options[i]});
             if(optionDoc)
             {
                 if(optionDoc.vote>0)
                 {
                     canDelete=false;
                 }
             }

         }
         if(canDelete===true)
         {
             for(let i=0;i<options.length;i++)
             {
                let deletedOption=await Options.deleteOne({id:options[i]});
                if(!deletedOption)
                {
                    throw new Error("Error deleting options");
                }
             }
             let deletedQuestion=await Questions.deleteOne({id:id});
             if(deletedQuestion)
             {
                 return res.status(200).send({

                     message: "deleted successfully"

                 });
             }
             else {
                 throw new Error("Error deleting Question");
             }
         }
         else {
             throw new Error("One or more options has votes >0 , cannot delete question :(");
         }





    }
    catch (e) {
        console.log("e", e);
        res.status(400).send(e.message);
    }
}
module.exports={
    postQuestions,
    addoptions,
    getQuestions,
    deleteQuestion
};
