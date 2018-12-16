
/*
getApiBtn - knappen som skall kunna hämta en api-nyckel, spara den i variabel
och skriv ut i fältet nedan.
pApi - detta är fältet som för tillfället skall hålla nyckel.*/
//-----------------------------------------------------------
/*Hämta nyckel*/
const apiKey = 'ENYKB';
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
  xhr.done(whenKeyRequestDone);
});

  function whenKeyRequestDone(data) {
    let object = JSON.parse(data);
    let apiKey = object.key;
    document.querySelector('.pApi').innerHTML = apiKey;
  };
//--------------------------------------------------------
/*Skapa object och pusha det till apiet.*/

$('.btnAdd').on('click', event => {
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
    xhr.done(whenAddDone);
  });

  function whenAddDone(data) {

    console.log('skriv ut ', data);
  };
    console.log(whenAddDone);
//-------------------------------------------------------------

/*View books in the api*/


$('.viewBookBtn').on('click', event => {
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
      xhr.fail(onError)
  });

  function whenViewDone(data) {
    let object = JSON.parse(data);
    let book = object.data;
    console.log(book);
    for(i = 0; i < book.length; i++ ) {
      let book = object.data[i];
      console.log(book.id +' '+  book.title +' '+ book.author);
      //$('.books').append('<li>' + book.title +  '  ' + book.author + ' '  + book.id + '</li>');
      $('.bookBox').append('<div class="bookList">' + book.title + '</div>');
      $('.bookBox').append('<div class="bookList">' + book.author + '</div>');
        $('.bookBox').append('<div class="bookList">' + book.id + '</div>');
      //$('.bookBox').append('<li class="bookList">' + book.id + '</li>');
    }
  };
//-
