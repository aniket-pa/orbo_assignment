const linkElement = document.querySelector('#routeLink')

linkElement.addEventListener('click',function(){

    alert('clicked');
    const token = localStorage.getItem('token');
    console.log(token)

    fetch('http://localhost:5000/detail', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(res=> res.json())
    .then(data => {
        if(data.success){
            window.location.href='/display'
        }
    })

})  