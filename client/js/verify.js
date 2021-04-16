//const { URLSearchParams } = require("node:url");

const submitBtn = document.querySelector('#submitBtn')
const urlParams= new URLSearchParams(window.location.search);
const userId= urlParams.get('user')
const salt= urlParams.get('salt')


submitBtn.addEventListener('click' , function(){
    const passValue={
        pass:document.querySelector('#passValue').value,
        userid:userId,
        salt:salt
    }
    
    fetch("http://localhost:5000/generatepassword",{ 
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(passValue)
    })
    .then(res=> res.json())
    .then(data=>
            {
                console.log(data)
                if(data.nModified){
                    displayLink()
                }
            }
        )
    .catch(err=>console.log(err));
})

function displayLink(){
    const linkElement = document.querySelector('#linkElement');
    linkElement.style.visibility="visible";
}