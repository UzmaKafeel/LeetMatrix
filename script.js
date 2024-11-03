document.addEventListener("DOMContentLoaded",function(){
    const searchbtn=document.querySelector(".search-btn");
    const userInput=document.querySelector(".user-input");
    const statsContainer=document.querySelector(".stats-container");
    
    const statsProgress=document.querySelector(".stats-progress");
    const easyProgressCircle=document.querySelector(".easy-progress");
    const mediumProgressCircle=document.querySelector(".medium-progress");
    const hardProgressCircle=document.querySelector(".hard-progress");

    const easyLabel=document.querySelector("#easy-label");
    const mediumLabel=document.querySelector("#medium-label");
    const hardLabel=document.querySelector("#hard-label");

    const easyPara=document.querySelector(".easyPara");
    const mediumPara=document.querySelector(".mediumPara");
    const hardPara=document.querySelector(".hardPara");

    const totalSubPara=document.querySelector(".totalSubPara");
    const easySubPara=document.querySelector(".easySubPara");
    const mediumSubPara=document.querySelector(".mediumSubPara");
    const hardSubPara=document.querySelector(".hardSubPara");


    const statsCard=document.querySelector(".stats-card");

    function displayUserData(data){
        
    }

    function validUsername(username){
        if(username.trim()===""){
            alert("username should not be empty");
            return false;
        }
        const regex=/^[a-zA-Z0-9_]{3,16}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("invalid username");
        }
        return isMatching;

    }

    function CalculatingProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
        label.textContent=`${solved}/${total}`;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`)


    }

    async function fetchDetails(username){
        const url= `https://leetcode-stats-api.herokuapp.com/${username}`;

        try{
            searchbtn.textContent='searching...';
            searchbtn.disabled=true;

            const response= await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch details");
            }
            const data= await response.json();
            console.log("logging data:" ,data);
            easy_solved = data['easySolved'];
            Total_easy = data['totalEasy'];

            medium_solved = data['mediumSolved'];
            Total_medium = data['totalMedium'];

            hard_solved = data['hardSolved'];
            Total_hard = data['totalHard'];
            
            CalculatingProgress(easy_solved,Total_easy,easyPara,easyProgressCircle);
            CalculatingProgress(medium_solved,Total_medium,mediumPara,mediumProgressCircle);
            CalculatingProgress(hard_solved,Total_hard,hardPara,hardProgressCircle);
            
    
            easySubPara.innerHTML=`<p>${easy_solved}</p>`
            mediumSubPara.innerHTML=`<p>${medium_solved}</p>`
            hardSubPara.innerHTML=`<p>${hard_solved}</p>`

            displayUserData(data);

            
        }
        catch(error){
            console.log("error caught:",error);
        }
        finally{
            searchbtn.textContent='search';
            searchbtn.disabled=false;

        }

    }

    searchbtn.addEventListener('click',function(){
        const user=userInput.value;
        console.log(user);
        if(validUsername(user)){
            fetchDetails(user);
        }

    })

})