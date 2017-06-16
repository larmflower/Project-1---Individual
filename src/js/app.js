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
    let url = 'javascript: void(0)';
    const checkedValues = $('input[type=checkbox]:checked');
    checkedValues.each(function(){
      queries.push($(this).val());
    });
    const queryString = queries.join(',');
    if (checkedValues.length > 0) url = `/artworks/${id}/history?keywords=${queryString}`;
    $historyButton.attr('href', url);
  });

  // --------------------------------HARNESSING KEYWORDS IN QUERY STRING FOR HARVARD ----

  const keywordsToSearch = $('[data-keywords]').data('keywords');
  console.log(keywordsToSearch);

  if (keywordsToSearch) callHarvard();

  function callHarvard() {
    $.get('/harvard', { keyword: keywordsToSearch })
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
      const description = record.description ? record.description : '';
      $('.main').append(`
        <a href="${record.primaryimageurl}" target="_blank"><img class="boxShadow" src="${record.primaryimageurl}"></a>
        <div><h3 class="captionText">${record.title}</h3><div>
        <div><h6>${description}</h6></div>`);
    }

      // $('.main').append(`<h3>${record[0].description}</h3>`);
      // $('.main').append(`<h3>${record[0].people[0].displaydate}</h3>`);
      // $('.main').append(`<h3>${record[0].people[0].displayname}</h3>`);
  }


  $historyButton.on('click', callHarvard);



});
