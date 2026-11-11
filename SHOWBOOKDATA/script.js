$(document).ready(function(){
    $("#loadBooks").click(function(){
        $("#bookList").html("<li>LoadingBooks...</li>");

        $.ajax({
            url:"https://openlibrary.org/search.json",
            type:"GET",
            data:{
                q:"programming",
                fields:"title, author_name",
                limit:10

            },
            dataType:"json",

            success:function(response){
                $("#bookList").empty();
                $.each(response.docs, function(index, book){
                    const title=book.title||"Unknown Title";
                    const author=book.author_name
                    ? book.author_name.join(", "):"Unknown Author";
                    $("<li>").text("Book title: "+ title+"."+" Author name: "+author).appendTo("#bookList");
                });
            },
            error:function(){
                $("#bookList").html(
                    "<li>Unable to load books. Please try again.</li>"
                );
            }
        });
    });
});