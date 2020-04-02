#Polling System APIS
This repositoty has a set of APIs which helps to add questions with options and also add votes to it. 


## How to start
Follow the following steps to get started 
   - fork this repository into your github account (create one if you don't have it yet)
   - clone it to your system (git clone <link>)
   - in the terminal run `https://github.com/Anamika2716/PollingSystem.git` (this is for taking a fresh update of the code anytime in the future)
   - getting updated code, just run git pull upstream master
   

## Installing Git
- Download [Git](https://git-scm.com/downloads) setup for your operating system and install it.
- To check whether **Git** is installed on your system, open `cmd` on **Windows** / `terminal` on **Mac**.
- Run command `git --version` and it should display the version of **Git** installed.

## Cloning the repository using VS Code
- Open [VS Code](https://code.visualstudio.com/download).
- Go to *View > Terminal*.
- To **clone** the repo to your *desktop*, change the directory to *desktop* by running the command `cd desktop`.
- In the terminal, run `https://github.com/Anamika2716/PollingSystem.git`.
- A folder/directory should be created on your *desktop*.
- Open that folder in **VS Code**, go to *File > Open*.
- Now you're good to go!

# How to Run the code
 - In VS Code terminal , run npm install (it will install all required modules and dependices)
 - To start server , run `node app.js`
 - You can test the apis using postman 
    eg: To get all products try,
            `http://localhost:8000/questions`
           it will return all questions in response 
