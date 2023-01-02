console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
  saveKoala();
  $('#viewKoalas').on('click', '.ready', handleReady);
 // $('#viewKoalas').on('click', '.delete', handleDelete);
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName'
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas() {
  console.log('in getKoalas');
  $("#viewKoalas").empty();
  $.ajax({
      type: 'GET',
      url: '/koalasLibrary'
  }).then(function (response) {
      console.log("GET /koalas response", response);
      // append data to the DOM
      for (let i = 0; i < response.length; i++) {
        if(response[i].readyForTransfer == "N") {
          $('#viewKoalas').append(`
              <tr>
                  <td>${response[i].name}</td>
                  <td>${response[i].age}</td>
                  <td>${response[i].gender}</td>
                  <td>${response[i].readyForTransfer}</td>
                  <td>${response[i].notes}</td>
                  <td><button class="ready">Ready for Transfer</button></td>
                  <td><button class="delete">Delete</button></td>
              </tr>
          `)
        } 
        else if (response[i].readyForTransfer == "Y") {
          $('#viewKoalas').append(`
              <tr>
                  <td>${response[i].name}</td>
                  <td>${response[i].age}</td>
                  <td>${response[i].gender}</td>
                  <td>${response[i].readyForTransfer}</td>
                  <td>${response[i].notes}</td>
                  <td></td>
                  <td><button class="delete">Delete</button></td>
              </tr>
          `)
        }
      }
  });
}


function saveKoala(){
  console.log( 'in saveKoala');
  // ajax call to server to get koalas
  let newKoala = {
    name: $('#nameIn').val(''),
    age: $('#ageIn').val(''),
    gender:$('#genderIn').val(''),
   readyToTransfer: $('#readyForTransferIn').val(''),
   notes:  $('#notesIn').val('')
  }
  $.ajax({
    method: 'POST',
    url: '/koalasLibrary',
    data: newKoala
  }).then(function(response){
    // console.log(response);
    $('#nameIn').val(''),
    $('#ageIn').val(''),
    $('#genderIn').val(''),
    $('#readyForTransferIn').val(''),
    $('#notesIn').val(''),
    getKoalas();
  });
}

function handleReady(){
  const id = ($(this).parent().parent().data('id'));
  console.log('rank up')
  $.ajax({
      type:'PUT',
      url: `/koalas/ready_to_transfer/${id}`,
      data: {transfer: 'Y'},
  }).then(function() {
      getKoalas();
  }).catch(function(error) {
      console.log('this is the error', error);
  })   
}

  

// let payloadObject = {
//   artist: $('#artist').val(),
//   track: $('#track').val(),
//   rank: $('#rank').val(),
//   published: $('#published').val()
// }