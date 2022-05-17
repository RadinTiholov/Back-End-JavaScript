module.exports = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../content/styles/site.css">
    <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Cat Shelter</title>
    <script>
        window.onload = (event) => {

            console.log('page is fully loaded');
            $('#addBtn').on('click', function(e){
                e.preventDefault();
                console.log('aide');

                const name = document.getElementById("name");
                const description = document.getElementById("description");
                const image = document.getElementById("image");
                const group = document.getElementById("group");
                if (name.value == '' || description.value == '' || image.value == '' || group.value == '') {
                    alert('Empty');
                }
                else{
                    $.getJSON("./storage/cats.json", function(json) {
                        console.log(json);
                        console.log(json.length);
                    });
                }
            })
        };
        </script>
</head>

<body>
    <header>
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/cats/add-breed">Add Breed</a></li>
                <li><a href="/cats/add-cat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
    </header>
    <main>
        <form class="cat-form">
            <h2>Add Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
            <label for="image">Image</label>
            <input name="upload" type="file" id="image">
            <label for="group">Breed</label>
            <select name="breed" id="group">
                <option value="Fluffy Cat">Fluffy Cat</option>
				<option value="Fluffy Cat">Fluffy Cat</option>
				<option value="Fluffy Cat">Fluffy Cat</option>
            </select>
            <button  id = "addBtn" type="submit">Add Cat</button>
        </form>
    </main>
</body>
</html>`