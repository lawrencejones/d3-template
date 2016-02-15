'use strict';
/* globals $ */

$(() => {
  let $dataPre = $('<pre/>').html('Loading dataset...').appendTo('body');
  $.get('/dataset.json').then((dataset) => {
    $dataPre.html(JSON.stringify(dataset, null, 2));
  });
});
