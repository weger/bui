define({
    "list":'<footer>    <p>&copy; xxxxxxxxxx ${companyName} ${tel}</p></footer>',
    "slide":'<header>    <h1 class="logo">${title}</h1>    <nav>        <ul>            {{each data}}            <li><a href="${url}">${name}</a></li>            {{/each}}        </ul>    </nav></header>'
});