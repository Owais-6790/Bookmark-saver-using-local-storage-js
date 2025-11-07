const nameInput = document.getElementById("nameInput")
const urlInput = document.getElementById("urlInput")
const bookmarkLists = document.getElementById("bookmarkLists")

document.addEventListener("DOMContentLoaded",loadbookmarks())

function bookmarksAddition() {
    const name = nameInput.value.trim()
    const url = urlInput.value.trim()

    if(!name || !url) {
        alert(`please enter both name and URL`)
    } else{
        if( !url.startsWith("http://") && !url.startsWith("https://") ) {
            alert(`Enter a URL that starts with "http://" or "https://"`)
        }

        addbookmarks(name,url)
        saveBookmark(name,url)

        nameInput.value = ""
        urlInput.value = ""
    }
}

function addbookmarks(name,url) {
    const li = document.createElement("li")
    const anchor = document.createElement("a")
    const removebtn = document.createElement("button")

    anchor.href = url
    anchor.textContent = name
    anchor.target = "_blank"
    removebtn.textContent = `Remove`
    removebtn.addEventListener("click",function() {
        {
    bookmarkLists.removeChild(li)
    removeBookmarksFromLocalStorage(name,url)
    
}
    })

    li.appendChild(anchor)
    li.appendChild(removebtn)
    bookmarkLists.appendChild(li)
}

function getBookmarksFromLocalStorage() {
    const bookmarks = localStorage.getItem("bookmarks")
    return bookmarks ? JSON.parse(bookmarks) : [{name:"",url : ""}]
}

function saveBookmark(name,url) {
    const bookmarks = getBookmarksFromLocalStorage()
    let item = {name:name,url:url}
    bookmarks.push(item)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

function loadbookmarks(name,url) {
    const bookmarks = getBookmarksFromLocalStorage()
    console.log(bookmarks.name)
    console.log(bookmarks.url)
    bookmarks.forEach(bookmark => addbookmarks(bookmark.name,bookmark.url));
}

function removeBookmarksFromLocalStorage(name,url) {
    let bookmarks = getBookmarksFromLocalStorage()
    bookmarks = bookmarks.filter((bookmark)=> bookmark.name !== name || bookmark.url !== url)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}