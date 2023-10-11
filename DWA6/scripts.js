// @ts-check
// @ts-nocheck
/**
 * Use // @ts-check to opt in to type checking for a single file.
 * Use // @ts-nocheck to opt out of type checking for a single file.
 * Use // @ts-ignore to opt out of type checking for a single line
 * 
 */

// ------------------------------------------- Importing variables from the data.js ----------------------------------------------------- //
import { BOOKS_PER_PAGE, authors, genres, books } from './data.js';


/**
 * The html object contains constant variables that select HTML DOM elements with specific data attribute values and makes
 * them easily accessible.
 * 
 * @typedef {Object} html - HTML Element data attribute values
 * @prop {Object} header - HTML header data attribute values
 * @prop {Object} list - HTML list data attribute values
 * @prop {Object} search - HTML search data attribute values
 * @prop {Object} settings - HTML settings data attribute values
 */

/**
 * HTML object containing HTML data attributes
 * @type {html}
 */
const html = {
    header: {
        search: document.querySelector('[data-header-search]'),
        settings: document.querySelector('[data-header-settings]'),
    },
    list: {
        items: document.querySelector('[data-list-items]'),
        message: document.querySelector('[data-list-message]'),
        button: document.querySelector('[data-list-button]'),
        active: document.querySelector('[data-list-active]'),
        blur: document.querySelector('[data-list-blur]'),
        image: document.querySelector('[data-list-image]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]'),
        close: document.querySelector('[data-list-close]'),
    },
    search: {
        overlay: document.querySelector('[data-search-overlay]'),
        form: document.querySelector('[data-search-form]'),
        title: document.querySelector('[data-search-title]'),
        genres: document.querySelector('[data-search-genres]'),
        authors: document.querySelector('[data-search-authors]'),
        cancel: document.querySelector('[data-search-cancel]'),
    },
        settings: {
            overlay: document.querySelector('[data-settings-overlay]'),
            form: document.querySelector('[data-settings-form]'),
            theme: document.querySelector('[data-settings-theme]'),
            cancel: document.querySelector('[data-settings-cancel]'),
        },
    };
// ------------------------------------------- Retrieved elements from the DOM using query Selectors ------------------------------------ //
// const settings_Button = document.querySelector('[data-header-settings]')
// const settings_Overlay = document.querySelector('[data-settings-overlay]')
// const settings_Form = document.querySelector('[data-settings-form]')
// const settings_Theme = document.querySelector('[data-settings-theme]')
// const settings_Cancel = document.querySelector('[data-settings-cancel]')
// const search_Form = document.querySelector('[data-search-form]')
// const search_Overlay = document.querySelector('[data-search-overlay]');
// const book_List_1 = document.querySelector('[data-list-items]');
// const message_List = document.querySelector('[data-list-message]')
// const data_List_Button = document.querySelector('[data-list-button]');

// ------------------------------------------- Day & Night Option ----------------------------------------------------------------------- //
// ------------------------------------------- Event listner allowing you to click option to show theme --------------------------------- //

html.header.settings.addEventListener('click', () => {
    html.settings.overlay.showModal()
})

// ------------------------------------------- Event listener to click cancel -----------------------------------=----------------------- //
html.settings.cancel.addEventListener('click', () => { 
    html.settings.overlay.close()
})

// ------------------------------------------- The css object defines two themes, 'day' and 'night' ------------------------------------- //
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20', '255, 255, 255']
}

/**
 * The Window interface's matchMedia() method returns a new MediaQueryList object that can then be used to determine if the document
 * matches the media query string, as well as to monitor the document to detect when it matches (or stops matching) that media query.
 */

// --- The value of the settingsTheme input is determined based on whether the user's preferred color scheme is dark or not. ------------ //
html.settings.theme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

// --- When the form is submitted, the selected object is created by converting the form data to an object using Object.fromEntries(). -- //
html.settings.form.addEventListener('submit', (event) => { 
    event.preventDefault()
    const form_Submit = new FormData(event.target)
    const selected = Object.fromEntries(form_Submit)
/**
 * Depending on the theme selected, the --color-light and --color-dark CSS variables are updated with the corresponding light and dark 
 * color values from the css object -- root --- //
 */
if (selected.theme === 'night') {  
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])     
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0])
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1])
    }
    html.settings.overlay.close()
})
// ------------------------------------------- End of color theme ----------------------------------------------------------------------- //

// ------------------------------------------- Create let for pages -- as it changes further in the code -------------------------------- //
const matches = books;
let page = 1;

// ------------------------------------------- Add curly brackets --- replace range with page ------------------------------------------- //
if (!books && !Array.isArray(books)) {throw new Error('Source required')} 
if (!page && page.length < 2) {throw new Error('Page must be an array with two numbers')}

const fragment = document.createDocumentFragment()
// ------------------------------------------- Create let variable for start_Index and end_Index ------------------------------------------- //
let start_Index = 0;                                  
let end_Index = 36;                                
// ------------------------------------------- conclude let variable to extracted ------------------------------------------- //
const extracted = books.slice(start_Index, end_Index)

// ------------------------------------------- for loop to view books - imported data from data.js --------------------------------------- //
for (let i = 0; i < extracted.length; i++) {          
    const preview = document.createElement('dl')      
    preview.className = 'preview'                     
    /** The dataset property itself can be read, but not directly written. Instead, all writes must be to the 
      * individual properties within the dataset, which in turn represent the data attributes.
      */
    preview.dataset.id = books[i].id
    preview.dataset.title = books[i].title
    preview.dataset.image = books[i].image
    preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
    preview.dataset.description = books[i].description
    preview.dataset.genres = books[i].genres

    preview.innerHTML= // ------------------------------------------ HTML structure ------------------------------------------------- //
    `<div>
     <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__title'>${books[i].title}<dt>
     <dt class='preview__author'> By ${authors[books[i].author]}</dt>
     </div>`

    fragment.appendChild(preview)
}

// ------------------------------------------- Display fragment in data-list-items ------------------------------------------------------ //
//const book_list_1 = document.querySelector('[data-list-items]') 
html.list.items.appendChild(fragment)

// ------------------------------------------- Create settings button with data stored in data-header-settings = imported from data.js - //
//const setting_button = document.querySelector("[data-header-settings]")
html.header.settings.addEventListener('click', () => {
    //document.querySelector("[data-settings-overlay]").style.display = "block";
    html.settings.overlay.style.display = "block";
})

// ------------------------------------------- Create cancel settings button with data stored in data-setting-cancel = imported from data.js - //
//const setting_cancel = document.querySelector('[data-settings-cancel]')
html.settings.cancel.addEventListener('click', () => {
    //document.querySelector("[data-settings-overlay]").style.display = "none";
    html.settings.overlay.style.display = "none";
})

// ------------------------------------------- Create variable to collect data from html to place them specifically ------------------------- // 
//const author_Select = document.querySelector("[data-search-authors]");
//const genre_Select = document.querySelector("[data-search-genres]");

/**
 * The Object.entries() static method returns an array of a given object's 
 * own enumerable string-keyed property key-value pairs.
 * 
 * Object.entries() returns an array whose elements are arrays corresponding 
 * to the enumerable string-keyed property key-value pairs found directly upon object.
 */

// ------------------------------------------- Object.entries() is used to iterate over the authors and genre in an arrow function ---------- //
Object.entries(authors).forEach(([author_Id, author_Name]) => {
    const option_Element = createOptionElement(author_Id, author_Name);
    html.search.authors.appendChild(option_Element);
});

Object.entries(genres).forEach(([genreId, genreName]) => {
    const option_Element = createOptionElement(genreId, genreName);
    html.search.genres.appendChild(option_Element);
});

// ------------------------------------------- Function with paramaters - creating an empty selector for user to direct what the user wants - // 
function createOptionElement(value, text) {
    // creating option in html
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = text;
    return optionElement;
}

// ------------------------------------------- Create event function for details to display ------------------------------------------------- //
const detailsToggle = (event) => {  
    // ------------------------------------------ Creating a path way form the html to the body to div etc -------------------------------- //
    // ------------------------------------------- Create variable to call data-"key" in html ------------------------------------------- //
    // const overlay_1 = document.querySelector('[data-list-active]');
    // const title = document.querySelector('[data-list-title]')
    // const subtitle = document.querySelector('[data-list-subtitle]')
    // const description = document.querySelector('[data-list-description]')
    // const image_Src = document.querySelector('[data-list-image]')
    // const blur_List = document.querySelector('[data-list-blur]')
    /**
     * The target property returns the element on which the event occurred, 
     * opposed to the currentTarget property, which returns the element whose event listener triggered the event.
     */
    event.target.dataset.id ? html.list.active.style.display = "block" : undefined;
    event.target.dataset.description ? html.list.description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? html.list.subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? html.list.title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? html.list.image.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? html.list.blur.setAttribute ('src', event.target.dataset.image) : undefined;
};

// ------------------------------------------- Click function to close details -------------------------------------------------------------- //
//const details_Close = document.querySelector('[data-list-close]')    
html.list.close.addEventListener('click', () => {
    html.list.active.style.display = "none";
});

// ------------------------------------------- Add event lisnter to click on specific data-list --------------------------------------------- //
//const book_click = document.querySelector('[data-list-items]')
html.list.items.addEventListener('click', detailsToggle)

// ------------------------------------------- Show more books - selecting button in html --------------------------------------------------- //
//const show_More_Button = document.querySelector('[data-list-button]')

// ------------------------------------------- Variable structure of books when clicking more ----------------------------------------------- //
const num_Items_To_Show = Math.min(books.length - end_Index,)

// ------------------------------------------- Variable structure to display amount of books when clicking more ----------------------------- //
const show_More_Button_Text = `Show More (${num_Items_To_Show})`

// ------------------------------------------- .textContent placing variable in HTML -------------------------------------------------------- //
show_More_Button.textContent = show_More_Button_Text

// ------------------------------------------- Event listener to click the more button and display more books -------------------------------- //
html.list.button.addEventListener('click', () => {         
    const fragment = document.createDocumentFragment()
    start_Index += 36;
    end_Index += 36;
    const start_Index_1 = start_Index
    const end_Index_1 = end_Index
    console.log(start_Index_1)
    console.log(end_Index_1)
    const extracted = books.slice(start_Index_1, end_Index_1)

    // ------- for loop to continue displaying all books, images, title, id, description, published in object imported from data.js file ---- //
    for (const {author ,image, title, id , description, published} of extracted) {
        // ---- Preview creating an description list in html and previewing all information stored ------------------------------------------- //
        const preview = document.createElement('dl')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        
        preview.innerHTML= // ------------------------------------------ HTML structure ------------------------------------------------- //
        `<div>
         <image class='preview__image' src="${image}" alt="book pic"}/>
         </div>
         <div class='preview__info'>
         <dt class='preview__title'>${title}<dt>
         <dt class='preview__author'> By ${authors[author]}</dt>
         </div>`
        // ------------------------------------------- appendChild allowing preview variable to display in fragment --------------------- //
        fragment.appendChild(preview)
    }
    
    //const book_list_1 = document.querySelector('[data-list-items]') 
    html.list.items.appendChild(fragment)
});
// -------------------------------------------------- End of show more button ---------------------------------------------------------------- //

// -------------------------------------------------- Creating an onclick option for user to view books -------------------------------------- //
// ------------------------------------------- Create search button with data stored in data-header-search = imported from data.js ------ //
//const search_button = document.querySelector("[data-header-search]");
html.header.search.addEventListener('click', () => {
    html.search.overlay.style.display = "block";
})

// ------------------------------------------- Create cancel button with data stored in data-search-cancel = imported from data.js ----- //
//const search_cancel = document.querySelector("[data-search-cancel]");
html.search.cancel.addEventListener('click', () => {
    html.search.overlay.style.display = "none";
})
html.search.form.addEventListener('submit', (event) => {
    event.preventDefault();
    // ------------------------------------------ Hidden book list ------------------------------------------ //
    html.list.items.style.display = 'none';

    // ------------------------------------------ Clear message area ------------------------------------------ //
    html.list.message.innerHTML = '';
      
    // ------------------------------------------ Call data form ------------------------------------------ //
    const data_Form = new FormData(event.target);
    const next_Title = data_Form.get('title');
    const next_Genre = data_Form.get('genre');
    const next_Author = data_Form.get('author'); 

// ------------------------------------------ Array to store filtered books ------------------------------------------ //
const filtered_Books = []

// ------------------------------------------ Looping through books -------------------------------------------------- //
for(let i = 0; i < books.length; i++) {
const book = books[i] 

// ------------------------------------------ if genre and author are not selected, filter by title only ------------- //
if (next_Genre === 'any' && next_Author ==='any') {
    if(book.title.toLowerCase().includes(next_Title.toLowerCase())) {
        filtered_Books.push(book) 
    }
} 

// ------------------------------------------ if genre is not selected then filter by author and title ------------------- //
if (next_Genre ==='any'){
if (book.title.toLowerCase().includes(next_Title.toLowerCase()) && book.author === next_Author){
    filtered_Books.push(book);
    }
}

// ------------------------------------------ If title is not called then filter by author and genre --------------------- //
if (next_Title === '') {
    if (book.author === next_Author && book.genres.includes(next_Genre)) {
        filtered_Books.push(book);
    }
}

// ------------------------------------------ if neither title or author are selected then filter by genre  ---------- //
if (next_Title ==='' && next_Author ==='any') {
if (book.genres.includes(next_Genre)) {
    filtered_Books.push(book)
    }
} 
// ------------------------------------------ Displaying no list message if no books matchs search --------------------- //
if (filtered_Books.length > 0) {
    html.list.message.textContent = '';
    html.list.button.disabled = true;
   } else {
    html.list.message.textContent = 'No results found. Your filters might be to narrow.';
    html.list.button.disabled = true;
   }
}
// ------------------------------------------ Display filtered books ------------------------------------------ //
html.list.message.style.display = 'block'

// ------------------------------------------ Creating fragment to hold books that was searched/called ------------------------------------- //
const fragment2 = document.createDocumentFragment();
for (const {author, image, title, id, description, published} of filtered_Books) {
    const preview = document.createElement('button');

    preview.className = 'preview';
    preview.dataset.id = id;
    preview.dataset.title = title;
    preview.dataset.image = image;
    preview.dataset.subtitle = `${authors[author]} (${new Date(published).getFullYear()})`
    preview.dataset.description = description;
    preview.dataset.genre = genres;

    // ------------------------------------------ Create preview search structure with book information --------------------------------- //

    preview.innerHTML = // ------------------------------------------ HTML structure ------------------------------------------------- //
    `<div>
     <img class='preview__image' src="${image}" />
     </div>
     <div class="preview__info">
     <dt class="preview__title">${title}</dt>
     <div class="preview__author">${authors[author]}</div>
     </div> `;

    // ------------------------------------------ Add append preview button ------------------------------------------ //
    fragment2.appendChild(preview);
}
// ------------------------------------------ Add filtered books to message ------------------------------------------ //
const book_List_2 = html.list.message;
book_List_2.appendChild(fragment2);
html.search.form.reset();
html.search.overlay.close();
})
// -------------------------------------------------- End of code ----------------------------------------------------------------------- //
