/* global $ */
document.addEventListener('DOMContentLoaded', () => {
  let singleRequestCount = 0;
  let singleWriteCount = 0;

  // Handles adding messages to the output window
  const addMessage = (message) => {
    const $el = $('<li>');
    $el.text(message);
    $el.appendTo($('.js-sync .js-resultList'));
  };

  // Handles finishing up the request and doing some element cleanup.
  const finish = () => {
    $('.js-sync .js-start').removeClass('disabled');
    $('.js-sync .js-start').removeProp('disabled');
    $('.js-sync .js-cancel').hide();
  };

  const writeSingle = (writeUrl, document) => {
    // make the request
    $.post(writeUrl, document, (data) => {
      addMessage(data.message);
      singleWriteCount--;

      if (singleWriteCount === 0 && singleRequestCount === 0) {
        finish();
      }
    }).fail(() => {
      addMessage(`Unable to write the document: ${document.slug}`);
    });
  };

  const onStartClick = (e) => {
    e.preventDefault();
    $('.js-sync .js-start').prop('disabled', 'disabled');
    $('.js-sync .js-start').addClass('disabled');

    $('.js-sync .js-cancel').show();
    $('.js-sync .js-resultList').html('');
    singleRequestCount = 0;
    singleWriteCount = 0;

    $('.js-sync .js-resultContainer').show();

    const server = $('.js-sync #server').val();
    const key = $('.js-sync #key').val();

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const syncUrl = `${baseUrl}/sync-request/${encodeURIComponent(key)}/${btoa(server)}`;
    const writeUrl = `${baseUrl}/sync-write/${encodeURIComponent(key)}`;

    // Handles the response from the target server when requesting the list of documents
    $.get(syncUrl, (data) => {
      if (data.success) {
        // for each result, make a single request
        $.each(data.results, (i, slug) => {
          const endpoint = `${syncUrl}/${slug}`;
          // Handles the response back from the target server when requesting a single document
          $.get(endpoint, (dataSingle) => {
            if (dataSingle.success) {
              // Makes a request to write the given document to the server
              writeSingle(writeUrl, dataSingle.result);

              // keep track of counts
              singleWriteCount++;
            } else {
              addMessage(`Server Error: ${dataSingle.message}`);
            }
            singleRequestCount--;
          }).fail(() => {
            addMessage(`Unable to fetch the document: ${slug}`);
          });

          singleRequestCount++;
        });
      } else {
        addMessage(`Server Error: ${data.message}`);
      }
    }).fail((error) => {
      addMessage(`Unable to reach the provided endpoint: ${error.responseText} Status: ${error.status} ${error.statusText}`);
      finish();
    });
  };

  $('.js-sync .js-start').on('click', onStartClick);
});
