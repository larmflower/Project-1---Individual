$(() => {
  console.log('JSloaded');
  // -------------TICK MARK APPEARS NEXT TO UPLOAD BOX-------------

  const $file = $('input[type="file"]');
  const $filePath = $('.file-path');

  $file.on('change', function(){
    $filePath.html('&#10004');
  });

  const $checkboxes = $('input[type=checkbox]');
  const $historyButton = $('.history');
  const id = $('[data-id]').data('id');
  let queries = [];

  $checkboxes.on('change', () => {
    queries = [];
    const checkedValues = $('input[type=checkbox]:checked');
    checkedValues.each(function(){
      queries.push($(this).val());
    });
    const queryString = queries.join(',');
    $historyButton.attr('href', `/artworks/${id}/history?keywords=${queryString}`);
  });

  const keywordsToSearch = $('[data-keywords]').data('keywords');
  console.log(keywordsToSearch);

  if (keywordsToSearch) callHarvard();

  function callHarvard() {
    // Make the ajax call to Harvard, passing in the keywords in the query string in the url
  }



// ----------------------------------------------------------------
      // want a button that generates the image concepts from Clarifai

});

// -----------------CLARIFAI FUNCTIONS AND MODEL TRAINING-----------------
// const Clarifai = require('clarifai');
// const app = new Clarifai.App(
//   '{CLARIFAI_CLIENT_ID}',
//   '{CLARIFAI_CLIENT_SECRET}'
// );
