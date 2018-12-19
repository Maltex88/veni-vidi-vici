
/*
getApiBtn - knappen som skall kunna hämta en api-nyckel, spara den i variabel
och skriv ut i fältet nedan.
pApi - detta är fältet som för tillfället skall hålla nyckel.*/
//-----------------------------------------------------------
/*Hämta nyckel*/
const apiKey = 'GTKRQ';
let bookId = '';
let http = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey'
//Get api Generator
$('.getApiBtn').on('click', event => {
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
  const settings = {
    method: 'GET',
    data: {
      requestKey: ''
    },
  }
  xhr = $.ajax(url, settings);
  xhr.done(whenKeyRequestDone)
     .fail(error => whenFail(error, numberOfTries-1));
});

function whenKeyRequestDone(data) {
  let object = JSON.parse(data);
  let apiKey = object.key;
  if(object.status == "success") {
    document.querySelector('.pApi').innerHTML = apiKey;
  }
  else {
    whenFail();
    $('.failLogg').append('<div class="failDiv">' + object.message + '</div>');
  }

};
//Api Generator ends
//---------------------------------------------------
/*Make object*/
$('.btnAdd').on('click', event => {
  sendInsertRequest();
});
function sendInsertRequest(numberOfTries = 5) {

  function whenAddDone(data) {
    let object = JSON.parse(data);
    let error = object;
    console.log('detta är objektet: ' + object.id);
    if(object.status == "success") {
      let newDelete = $('<button class="newDelete"><div class="bookList">' + 'Delete book' + '</div></button>');
      let deleteButton = $('<button class="bookDelete"><div class="bookList">' + bookTitle + '</div></button>');
      let changeButton = $('<button class="bookChange"><div class="bookList">' + authors + '</div></button>');
      let deleteAllButton = $('<button class="deleteAll"><div class="bookList">' + object.id + '</div></button>');
      newDelete.click(event => {
        bookId = object.id;
        console.log('Nu är jag inne i delete ');
        sendDeleteAllBooksRequest();
      })
      $('.bookBox').append(newDelete);
      $('.bookBox').append(deleteButton);
      $('.bookBox').append(changeButton);
      $('.bookBox').append(deleteAllButton);

    }
     else {
      whenFail(null, numberOfTries);
      $('.failLogg').append('<div class="failDiv">' + error.message + '</div>');
    }
  };

  function whenFail(error) {
    sendInsertRequest(numberOfTries - 1);
  };

  if(numberOfTries < 1)
    return;
  var bookTitle = $('#bookTitle').val();
  var authors = $('#author').val();
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
  const settings = {
    method: 'GET',
    data:  {
      op: 'insert',
      key: apiKey,
      title: bookTitle,
      author: authors,
    },
  }
  xhr = $.ajax(url, settings);
  xhr.done(whenAddDone)
     .fail(whenFail);
};
/*Make Object end*/
//-------------------------------------------------------

/*View books in the api*/
$('.viewBookBtn').on('click', event => {
  sendGetAllBooksRequest();
});
function sendGetAllBooksRequest(numberOfTries = 5){
  $(".newDelete, .bookDelete, .bookChange, .deleteAll").remove();
  function whenViewDone(data) {
      let object = JSON.parse(data);
      if(object.status == "success") {
        let books = object.data;
        for(i = 0; i < books.length; i++ ) {
          let book = books[i];
          let newDelete = $('<button class="newDelete"><div class="bookList">' + 'Delete Book' + '</div></button>');
          let deleteButton = $('<button class="bookDelete"><div class="bookList">' + book.title + '</div></button>');
          let changeButton = $('<button class="bookChange"><div class="bookList">' + book.author + '</div></button>');
          let deleteAllButton = $('<button class="deleteAll"><div class="bookList">' + book.id + '</div></button>');
          newDelete.click(event => {
            console.log('Nu klickade jag på knappen')
            bookId = book.id;
            console.log('Bookens Id ' + bookId);
            sendDeleteAllBooksRequest();

          })
          $('.bookBox').append(newDelete);
          $('.bookBox').append(deleteButton);
          $('.bookBox').append(changeButton);
          $('.bookBox').append(deleteAllButton);

        }  //bookDelete, deleteAll, bookChange
      } else {
        whenFail(numberOfTries);
        $('.failLogg').append('<div class="failDiv">' + object.message + '</div>');

        }
    };

  function whenFail(error) {
    sendGetAllBooksRequest(numberOfTries - 1);
  };

  if (numberOfTries < 1)
    return;
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
  const settings = {
    method: 'GET',
    data:  {
      op: 'select',
      key: apiKey,
    },
  }
  xhr = $.ajax(url, settings);
  xhr.done(whenViewDone)
    .fail(whenFail);
};
/*View books ends*/

//delete funktionen
$('.newDelete').on('click', event => {
  sendDeleteAllBooksRequest();

});

function sendDeleteAllBooksRequest(numberOfTries = 5){
  function whenDeleteDone(data) {
      console.log('Nu är jag inne i whendeletedone funktionen');
      let object = JSON.parse(data);
      if(object.status == "success") {
          sendGetAllBooksRequest();
      } else {
        whenFail(numberOfTries);
        $('.failLogg').append('<div class="failDiv">' + object.message + '</div>');

        }
    };

  function whenFail(error) {
    sendDeleteAllBooksRequest(numberOfTries - 1);
  };

  if (numberOfTries < 1)
    return;
  const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
  const settings = {
    method: 'GET',
    data:  {
      op: 'delete',
      key: apiKey,

      id: bookId,
    },
  }
  xhr = $.ajax(url, settings);
  xhr.done(whenDeleteDone)
    .fail(whenFail);
};
