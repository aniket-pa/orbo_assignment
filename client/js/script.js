const form = document.querySelector('#register-form');
const LoginForm = document.querySelector('#login-form');


function postData(postRoute,event){
   
        event.preventDefault();
        
        const formData =  new FormData(this);
        const finalFormData={}
        for(let data of formData.entries()){
            finalFormData[data[0]]=data[1]
        }
        console.log(finalFormData);
        
        fetch(`http://localhost:5000/${postRoute}`, {
            headers:{'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(finalFormData)
        })
        .then((res)=> res.json())
        .then(data=> {
                    if(postRoute==='login'){
                        console.log(data)
                        if(data.success){
                            localStorage.setItem('token',data.data)
                            //displayLink(true);
                            window.location.href="/protectedRoute"
                        }
                        else{  
                            displayLink(false);   
                        }
                        
                    }
                    if(postRoute==='register'){
                        if(data.success){
                            displayLink(data.success)
                        }
                    }
                }
            )
        
}

if(form!=null){
    form.addEventListener('submit',function(event){
        postData.call(this,'register',event);
    })
}

if(LoginForm!=null){
    LoginForm.addEventListener('submit',function(event){
        postData.call(this,'login',event);
    })
}

function displayLink(data){
    if(data)
    {
        const linkElement = document.querySelector('#linkElement');
        linkElement.style.visibility="visible";
    }
    else{
        const linkElement = document.querySelector('#detail');
        linkElement.style.visibility="visible";
    }
    
}

//Login Form Code 
/* const form = document.querySelector('#login-form');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const formData =  new FormData(this);
    const finalFormData={}
    for(let data of formData.entries()){
        finalFormData[data[0]]=data[1]
    }
    console.log(finalFormData);
    
    fetch('http://localhost:5000/login', {
        headers:{'Content-Type':'application/json'},
        method:'POST',
        body:JSON.stringify(finalFormData)
    })
    .then((res)=> res.json())
    .then(data=> console.log(data))

}) */