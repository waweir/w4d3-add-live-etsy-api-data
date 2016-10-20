fetch('https://thinksaydo.com/tiyproxy.php?url=' + encodeURIComponent('https://openapi.etsy.com/v2/listings/active?api_key=h9oq2yf3twf4ziejn10b717i&keywords=' + encodeURIComponent('vintage+board+games') + '&includes=Images,Shop'))
    .then(response => response.json())
    .then(response => createResultCard(response.results))

function createResultCard(itemsArray) {
    itemsArray.forEach(function(item) {
        // create column
        var column = document.createElement('div')
        column.classList.add('col-sm-3')
        column.classList.add('col-xs-6')

        // create link tag to place card inside and link to selling page
        var link = document.createElement('a')
        link.href = item.url
        link.title = item.title
        link.classList.add('card_link')
        column.appendChild(link)

        // create main card div
        var card = document.createElement('div')
        card.classList.add('card')
        link.appendChild(card)

        // create rows. 1 for image, 1 for title, 1 for seller and price
        var row = document.createElement('div')
        row.classList.add('row')
        var row2 = row.cloneNode(true)
        row2.classList.add('white_background')
        var row3 = row2.cloneNode(true)
        card.appendChild(row)
        card.appendChild(row2)
        card.appendChild(row3)

        // create image and map to the object's image value
        var image = document.createElement('img')
        image.src = item.Images[0].url_570xN
        row.appendChild(image)

        // create full width column for title and map to object's title value
        var col = document.createElement('div')
        col.classList.add('col-sm-12')
        col.classList.add('overflow_hidden')
        col.classList.add('title')
        col.innerHTML = item.title
        row2.appendChild(col)

        // create two 50% width columns and map the first to the object's seller value and the second to the object's price value
        var col2 = document.createElement('div')
        col2.classList.add('col-xs-6')
        var col3 = col2.cloneNode(true)
        col2.classList.add('text-muted')
        col2.classList.add('overflow_hidden')
        col2.innerHTML = item.Shop.login_name
        col3.innerHTML = ('$' + Number(item.price).toFixed(2))
        col3.classList.add('green')
        col3.classList.add('text-right')
        row3.appendChild(col2)
        row3.appendChild(col3)

        document.querySelector('#searchResults.row').appendChild(column)
    })
}

// select search button and add event listener
var searchButton = document.querySelector('#search')
searchButton.addEventListener('click', search)

// select search input and add event listener
var searchInput = document.querySelector('#search_bar')
searchInput.addEventListener('keypress', searchEnter)

// create search function that clears the previous serach results and replaces them with the search results generated from the input value being placed at the end of the URL
function search() {
    document.querySelector('#searchResults').innerHTML = ''
    var searchTerm = document.querySelector('#search_input').value

    fetch('https://thinksaydo.com/tiyproxy.php?url=' + encodeURIComponent('https://openapi.etsy.com/v2/listings/active?api_key=h9oq2yf3twf4ziejn10b717i&keywords=' + encodeURIComponent(searchTerm) + '&includes=Images,Shop'))
        .then(response => response.json())
        .then(response => createResultCard(response.results))
}

function searchEnter(event) {
    if (event.key === 'Enter') {
        search()
    }
}
