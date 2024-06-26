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
            location.reload();
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
                    <td>
                        <button onclick="deleteTask(${task.id})">Supprimer</button>
                    </td>
                    <td>
                        <button onclick="changeStatus(${task.id}, ${task.status_id})">Changer état</button>
                    </td>
                    <td>
                        <button onclick="viewTask(${task.id})">Voir</button>
                    </td>
                    `
                ;
            });
        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    };

    function changeStatus(id, currentStatusId) {
        let newStatusId;
        if (currentStatusId === 1) {
            newStatusId = 2;
        } else if (currentStatusId === 2) {
            newStatusId = 3;
        } else {
            newStatusId = 1;
        }
        fetch(`api/public/api/updatetaskstatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status_id: newStatusId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête : ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            location.reload();  
        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    }

    function deleteTask(id) {
        fetch(`api/public/api/deletetask/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête : ' + response.status);
            }
            return response.json();
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    }

    function viewTask(id) {
        fetch(`api/public/api/gettask/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(task => {
            document.getElementById('taskName').innerText = task.name;
            document.getElementById('taskCreatedAt').innerText = task.created_at;
            document.getElementById('taskStatus').innerText = task.status.label;
            document.getElementById('taskDetails').style.display = 'block';
        })
        .catch(error => {
            console.error('problem :', error.message);
        });
    }

    function closeDetails() {
        document.getElementById('taskDetails').style.display = 'none';
    }

    window.changeStatus = changeStatus;
    window.deleteTask = deleteTask;
    window.viewTask = viewTask;
    window.closeDetails = closeDetails;

    getTasks();
});