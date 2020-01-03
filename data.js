const kinveyUrl = "https://baas.kinvey.com/appdata/kid_SJtLFtqTB";
const kinveyHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic a2lkX1NKdExGdHFUQjozMjQwMDE1NjU0NzE0NGVkYTJkN2Q0MmYzMjAyZDYzYQ==',
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonLoad').addEventListener('click', loadClick);
    document.getElementById('buttonAdd').addEventListener('click', addClick);
});

async function loadClick() {
    const url = kinveyUrl + "/Labirint";
    const response = await fetch(url, {
        method: 'GET', 
        headers: kinveyHeaders
    });
    let mazes = await response.json();
    console.log(mazes);

    document.getElementById('listBoxMazes').options.length = 0;
    mazes.forEach(maze => {
        document.getElementById('listBoxMazes').options.add(
            new Option(maze.name, maze.data)
        );
    });
}

async function addClick() {
    let newMaze = {
        name: document.getElementById('textBoxMazeName').value,
        data: document.getElementById('textBoxMazeData').value
    };

    const url = kinveyUrl + "/Labirint";
    const response = await fetch(url, {
        method: 'POST',
        headers: kinveyHeaders,
        body: JSON.stringify(newMaze)
    });
    if (response.ok) {
        alert("added successfully");
    }
}