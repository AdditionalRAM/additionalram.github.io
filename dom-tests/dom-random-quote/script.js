const quoteText = document.querySelector('#quote');
const quoteAuthorDate = document.querySelector('#authordate');

fetch("https://api.quotable.io/random", {
    method: "GET"
})
.then(response => response.json())
.then(data => {
    console.log(data);
    const quote = data.content;
    const author = data.author;
    quoteText.textContent = quote;
    quoteAuthorDate.textContent = `- ${author}`;
})
.catch(error => {
    console.error(error);
});
