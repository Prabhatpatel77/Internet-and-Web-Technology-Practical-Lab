
$(document).ready(function () {

    // Store book data in the program
    const books = [
        {
            "title": "The Alchemist",
            "author": "Paulo Coelho"
        },
        {
            "title": "Wings of Fire",
            "author": "A. P. J. Abdul Kalam"
        },
        {
            "title": "Atomic Habits",
            "author": "James Clear"
        },
        {
            "title": "Rich Dad Poor Dad",
            "author": "Robert Kiyosaki"
        }
    ];

    // Display books when button is clicked
    $("#loadBooks").click(function () {

        $("#bookList").empty();

        $.each(books, function (index, book) {

            $("<li>")
                .text("Title: " + book.title +
                      " - Author: " + book.author)
                .appendTo("#bookList");

        });

    });

});
