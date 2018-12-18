
/*
getApiBtn - knappen som skall kunna hämta en api-nyckel, spara den i variabel
och skriv ut i fältet nedan.
pApi - detta är fältet som för tillfället skall hålla nyckel.*/
//-----------------------------------------------------------
/*Hämta nyckel*/
const apiKey = 'UTuiv';
let http = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey'
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
//--------------------------------------------------------
/*Skapa object och pusha det till apiet.*/

$('.btnAdd').on('click', event => {
  sendInsertRequest();
});

function sendInsertRequest(numberOfTries = 5) {

  function whenAddDone(data) {
    let object = JSON.parse(data);
    let error = object
    if(object.status == "success") {
    } else {
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
//-------------------------------------------------------

/*View books in the api*/
$('.viewBookBtn').on('click', event => {
  sendGetAllBooksRequest();
});

function sendGetAllBooksRequest(numberOfTries = 5){
  function whenViewDone(data) {
      let object = JSON.parse(data);
      if(object.status == "success") {
        let books = object.data;
        for(i = 0; i < books.length; i++ ) {
          let book = books[i];
          $('.bookBox').append('<div class="bookList">' + book.title + '</div>');
          $('.bookBox').append('<div class="bookList">' + book.author + '</div>');
          $('.bookBox').append('<div class="bookList">' + book.id + '</div>');
        }
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
/*  */
