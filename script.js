function validateForm(){
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;
    var publisher = document.getElementById("publisher").value;
    var isbn = document.getElementById("isbn").value;

    if(title == ""){
        alert("Title is required");
        return false;
    }

    if(author == ""){
        alert("Author is required");
        return false;
    }

    if(publisher == ""){
        alert("Publisher is required");
        return false;
    }

    if(isbn == ""){
        alert("ISBN is required");
        return false;
    }

    return true;
}

function showBooks(){
    var booksList;
    if(localStorage.getItem("booksList") == null){
        booksList = [];
    }
    else{
        booksList = JSON.parse(localStorage.getItem("booksList"))
    }

    var html = "";
    booksList.forEach(function (element, index){
        html += "<tr>";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + element.title + "</td>";
        html += "<td>" + element.author + "</td>";
        html += "<td>" + element.publisher + "</td>";
        html += "<td>" + element.isbn + "</td>";
        html += "<td>" + element.release_date + "</td>";
        html += '<td><button onclick="deleteBook(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateBook(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>"
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showBooks();

function AddBook(){
    if(validateForm() == true){
        var title = document.getElementById("title").value;
        var author = document.getElementById("author").value;
        var publisher = document.getElementById("publisher").value;
        var isbn = document.getElementById("isbn").value;
        var release_date = document.getElementById("release_date").value;

        var booksList;
        if(localStorage.getItem("booksList") == null){
            booksList = [];
        }
        else{
            booksList = JSON.parse(localStorage.getItem("booksList"))
        }

        var myId;
        if (localStorage.getItem('books')) {
            myId = parseInt(localStorage.getItem('books')) + 1;
            localStorage.setItem('books', myId);
        } 
        else 
        {
            localStorage.setItem('books', 1);
            myId = localStorage.getItem('books');
        }

        booksList.push({
            id : myId,
            title : title,
            author : author,
            publisher : publisher,
            isbn : isbn,
            release_date : release_date
        });

        localStorage.setItem("booksList", JSON.stringify(booksList));
        showBooks();
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("publisher").value = "";
        document.getElementById("isbn").value = "";
        document.getElementById("release_date").value = "";
    }
}

function deleteBook(index){
    var booksList;
        if(localStorage.getItem("booksList") == null){
            booksList = [];
        }
        else{
            booksList = JSON.parse(localStorage.getItem("booksList"))
        }

        booksList.splice(index, 1);
        localStorage.setItem("booksList", JSON.stringify(booksList));
        showBooks();
}

function updateBook(index){
    // Submit button hides and Update button will appear available
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var booksList;
        if(localStorage.getItem("booksList") == null){
            booksList = [];
        }
        else{
            booksList = JSON.parse(localStorage.getItem("booksList"))
        }

        document.getElementById("title").value = booksList[index].title;
        document.getElementById("author").value = booksList[index].author;
        document.getElementById("publisher").value = booksList[index].publisher;
        document.getElementById("isbn").value = booksList[index].isbn;
        document.getElementById("release_date").value = booksList[index].release_date;

        document.querySelector("#Update").onclick = function(){
            if(validateForm() == true){
                booksList[index].title = document.getElementById("title").value;
                booksList[index].author = document.getElementById("author").value;
                booksList[index].publisher = document.getElementById("publisher").value;
                booksList[index].isbn = document.getElementById("isbn").value;
                booksList[index].release_date = document.getElementById("release_date").value;

                localStorage.setItem("booksList", JSON.stringify(booksList));
                showBooks();

                document.getElementById("title").value = "";
                document.getElementById("author").value = "";
                document.getElementById("publisher").value = "";
                document.getElementById("isbn").value = "";
                document.getElementById("release_date").value = "";

                document.getElementById("Submit").style.display = "block";
                document.getElementById("Update").style.display = "none";
            }
        }
}