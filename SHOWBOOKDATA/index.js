$(document).ready(function(){
    const books=[
       { "title":"The Alchemist",
        "author":"Paulo Coelho"
        },
        {
            "title":"Wings of Fire",
            "author":"A.P.J. Abdul kalam"
        },
        {
            "titel":"Wings of Fire",
            "author":"James Clear"
        },

        {
            "title":"Rich Dad Poor Dad ",
            "author":"Robert Kiyosaki"
        }
    ];
    $("#loadBooks").click(function (){
        $("#bookList").empty();
        $.each(books, function (index, book){
            $("<li>").text("Title: "+book.title+"Author : "+book.author).appendTo("#bookList");
        });
    });
});
