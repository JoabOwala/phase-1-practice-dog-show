document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is ready")
    document.addEventListener("click", handleEvents)
    const editForm = document.getElementById('dog-form')
    const url = `http://localhost:3000/dogs`

    function renderAllDogs(dog){
        //Build dog tr to render data in
         let dogTable = document.createElement("tr")
        dogTable.className = "new-dog-table"
        dogTable.innerHTML =`
        
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button id="myBtn" data-id=${dog.id}>Edit</button></td>
         `   
        document.querySelector("#table-body").appendChild(dogTable)
    } 

    //fetch dog data
    
        fetch(url)
        .then(res => res.json())
        .then(dogs => dogs.forEach(dog => renderAllDogs(dog)))
        


        function handleEvents(e){
            e.preventDefault()
            if(e.target.id === "myBtn"){
                editDog(e.target.dataset.id)
            }else if(e.target.parentElement.id === "dog-form"){
                editedDog(e)
            }
        }
//Edit dog from the form
        function editDog(id){
            fetch(`http://localhost:3000/dogs/${id}`)
            .then(res => res.json())
            .then(dog => {
               editForm.name.value = dog.name,
               editForm.sex.value = dog.sex,
               editForm.breed.value = dog.breed,
               editForm.dataset.id = dog.id
            })
            }
    
        function editedDog(e){
                let dog = {
                  name: e.target.parentElement.name.value,
                  sex: e.target.parentElement.sex.value,
                  breed: e.target.parentElement.breed.value
                }
        //UPDATE 
        fetch(`${url}/${e.target.parentElement.dataset.id}`, {
            method: 'PATCH',
            headers: {
              "content-type": 'application/json',
              accepts: 'application/json'
            },
            body: JSON.stringify(dog)
          }).then(res => res.json())
          .then(dog => {
            let foundDog = document.querySelector(`[data-id="${dog.id}"]`)
            foundDog.children[0].innerText = dog.name
            foundDog.children[1].innerText = dog.breed
            foundDog.children[2].innerText = dog.sex
          })   
        }    
})