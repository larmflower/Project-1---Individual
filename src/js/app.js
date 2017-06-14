$(() => {
  console.log('JSloaded');
  // -------------TICK MARK APPEARS NEXT TO UPLOAD BOX-------------

  const $file = $('input[type="file"]');
  const $filePath = $('.file-path');

  $file.on('change', function(){
    $filePath.html('&#10004');

  });
  // --------------------------------EDITING KEYWORDS WITH CHECKBOXES--------

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

  // --------------------------------HARNESSING KEYWORDS IN QUERY STRING FOR HARVARD ----

  const keywordsToSearch = $('[data-keywords]').data('keywords');
  console.log(keywordsToSearch);

  if (keywordsToSearch) callHarvard();

  function callHarvard() {
    $.get(`http://api.harvardartmuseums.org/object?size=10&apikey=dd5a1d30-4d12-11e7-96f2-b50c7eba56ee&keyword=${keywordsToSearch}`)
    .done((historys) => {
      $.each(historys.records, (i, record) => {
        appendHistory(record);
      });
    });

    // Make the ajax call to Harvard, passing in the keywords in the query string in the url
  }

  function appendHistory(record) {
    console.log(record);
    if(record.primaryimageurl) {
      $('.main').append(`
        <img class="boxShadow" src="${record.primaryimageurl}">
        <div><h3>${record.title}</h3><div>
        <div><h6>${record.description}</h6></div>`);
    }

      // $('.main').append(`<h3>${record[0].description}</h3>`);
      // $('.main').append(`<h3>${record[0].people[0].displaydate}</h3>`);
      // $('.main').append(`<h3>${record[0].people[0].displayname}</h3>`);
  }


  $historyButton.on('click', callHarvard);


});
