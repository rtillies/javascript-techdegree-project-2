/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
 Author:  Richard Tillies
   Date:  March 12, 2021
Purpose:  To display students on a webpage, 
          limited to 9 per page
          add clickable page numbers below the student list
          filter students by name via search box
*/

// Global variables and constants
const itemsPerPage = 9;

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  // create two variables which will represent the index for the first and last student on the page
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  // select the element with a class of `student-list` and assign it to a variable
  let studentList = document.querySelector('.student-list');

  // set the innerHTML property of the variable you just created to an empty string
  studentList.innerHTML = '';

  // loop over the length of the `list` parameter
    // inside the loop create a conditional to display the proper students
      // inside the conditional:
        // create the elements needed to display the student information
        // insert the above elements
  if (list.length == 0) {
    studentList.innerHTML = 'No results found!';
  } else {
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        let studentItem = list[i];
        let html = getStudentHTML(studentItem);
        studentList.insertAdjacentHTML('beforeend', html);
      }
    }
  }
}

// return HTML code for the student object
function getStudentHTML(student) {
  let html = `
    <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
        <h3>${student.name.first} ${student.name.last}</h3>
        <span class="email">${student.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${student.registered.date}</span>
      </div>
    </li>
  `;
  return html;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  // create a variable to calculate the number of pages needed
  numOfPages = Math.ceil(list.length / itemsPerPage);

  // select the element with a class of `link-list` and assign it to a variable
  let linkList = document.querySelector('.link-list');

  // set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = '';

  // loop over the number of pages needed
    // create the elements needed to display the pagination button
    // insert the above elements
  for (let i = 0; i < numOfPages; i++) {
    button = `
      <li>
        <button type="button">${i+1}</button>
      </li>
    `;
    linkList.insertAdjacentHTML('beforeend', button);
  }

  if (numOfPages > 0) {
      // give the first pagination button a class of "active"
    document.querySelector('.link-list button').className = 'active';

    // create an event listener on the `link-list` element
      // if the click target is a button:
        // remove the "active" class from the previous button
        // add the active class to the clicked button
        // call the showPage function passing the `list` parameter and page to display as arguments
    linkList.addEventListener('click', (event) => {
      let myTarget = event.target;
      if (myTarget.tagName === 'BUTTON') {
        document.querySelector('.active').className = '';
        myTarget.className = 'active';
        showPage(list, myTarget.textContent);
      }
    });
  }
}

// Add a text search bar to search through student names
function addSearchBar() {
  let html = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `;
  let header = document.querySelector('.header');
  header.insertAdjacentHTML('beforeend', html);
  return document.querySelector('.student-search');
}

// searchList function (from Simple Search practice session)
function searchList(searchInput, students) {
  // Search the list and add matching students to a new array 
  let filtered = [];
  for (let i = 0; i < students.length; i++) {
    let fullName = `${students[i].name.first.toLowerCase()} ${students[i].name.last.toLowerCase()}`;
  
    if (searchInput.value.length > 0 && fullName.includes(searchInput.value.toLowerCase())) {
        filtered.push(students[i]);
    }
  }
  
  // if filtered list has items, display filtered students
  // else if filtered list is empty, display message in browser
  if (searchInput.value.length == 0) {
    showAdd(data);
  } else if (filtered.length > 0 && searchInput.value.length > 0) {
    showAdd(filtered);
  } else if (filtered.length == 0 && searchInput.value.length > 0) {
      document.querySelector('.student-list').innerHTML = "<h3>No results found!</h3>";
      showAdd(filtered);
  }
}

// Run showPage() and addPagination() on given list
function showAdd(list) {
  showPage(list, 1);
  addPagination(list);
}

// Call functions
showAdd(data);
let searchBar = addSearchBar();

// Listen for search
searchBar.addEventListener('keyup', () => {

  // Invoke your search function here - Arguments: search, tableCells
  const search = document.querySelector('#search');
  searchList(search, data);
});
