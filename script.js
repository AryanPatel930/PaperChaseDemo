const apiKey = "AIzaSyDb5q3iuyyhJh0yeD4cprHduShcuRmAco8";  // Replace with your API key

async function searchBooks() {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        displayResults(data.items);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(books) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (!books || books.length === 0) {
        resultsDiv.innerHTML = "<p>No results found</p>";
        return;
    }

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const title = bookInfo.title || "Unknown Title";
        const authors = bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown Author";
        const thumbnail = bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/50";
        const bookLink = bookInfo.infoLink || "#";

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${thumbnail}" alt="Book Cover">
            <div class="book-info">
                <h3>${title}</h3>
                <p>${authors}</p>
            </div>
        `;

        bookElement.addEventListener("click", () => {
            window.open(bookLink, "_blank");
        });

        resultsDiv.appendChild(bookElement);
    });
}
