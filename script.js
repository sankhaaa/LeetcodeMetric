console.log("Script loaded"); // Test if script is loading

document.addEventListener("DOMContentLoaded",function(){
    console.log("DOM Content Loaded"); // Test if event listener works

     
    const searchbutton=document.getElementById("searchbtn");
    const usernameinput=document.getElementById("username");
    const statscontainer=document.querySelector(".statscontainer");
    const easyprogresscircle=document.querySelector(".easyprogress");
    const mediumprogresscircle=document.querySelector(".mediumprogress");
    const hardprogresscircle=document.querySelector(".hardprogress");
    const easylabel=document.getElementById("easylabel");
    const mediumlabel=document.getElementById("mediumlabel");
    const hardlabel=document.getElementById("hardlabel");
    const cardstats=document.querySelector(".statscard");

    async function fetchUserDetails(username){
        try{
            searchbutton.textContent = "Searching...";
            searchbutton.disabled = true;

            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData);
            displayUserDetails(parsedData);
        }
        catch(error) {
            statscontainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchbutton.textContent = "Search";
            searchbutton.disabled = false;
        }
    }

   

    function validateUsername(username) {
        if(username.trim()===""){
            alert("Username must be valid");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    function updateProgress(solved,total,label,circle){
        if(solved===0){
            circle.style.setProperty("--progress-degree", `0`);
            label.textContent=`${solved}/${total}`;
        }
        const progressDegree=(solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent=`${solved}/${total}`;

    }
   function displayUserDetails(data){
        const easyTotal = data.totalEasy;
        const mediumTotal = data.totalMedium;
        const hardTotal = data.totalHard;

        const easySolved = data.easySolved;
        const mediumSolved = data.mediumSolved;
        const hardSolved = data.hardSolved;

        updateProgress(easySolved, easyTotal, easylabel, easyprogresscircle);
        updateProgress(mediumSolved, mediumTotal, mediumlabel, mediumprogresscircle);
        updateProgress(hardSolved, hardTotal, hardlabel, hardprogresscircle);
    }
    
    searchbutton.addEventListener('click',function(){
        const username=usernameinput.value;
        console.log(" login username:",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
        })









})
