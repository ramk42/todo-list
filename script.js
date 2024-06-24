document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById("form") 
    form.onsubmit = function(event) {
        event.preventDefault()
        
        const formData = new FormData(this);

        const formDataJson = {};

        formData.forEach((value, key) => {
            formDataJson[key] = value;
        });

        fetch("api/public/api/addtask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJson)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête : ' + response.status);
            }
            return response.json()
        })
        .then(() => {

        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    };

    const tableBody = document.querySelector('#table tbody');

    function getTasks(){
        fetch("api/public/api/gettasks", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${task.name}</td>
                    <td>${task.created_at}</td>
                    <td>${task.status.label}</td>
                    
                    `
                ;
            });
        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    };
    getTasks()

});