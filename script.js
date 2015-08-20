require([
  'dojo/dom-attr',
  'dojo/query',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-style',
  'dojo/domReady!'
], function( domAttr, query, array, on, domStyle ){

  function verificaSuporteHtml5( elemento, atributo ){
    if( !( elemento && typeof elemento === 'string' ) ) return;
    if( !( atributo && typeof atributo === 'string' ) ) return;
    if( atributo in document.createElement( elemento ) ) return true;
  };

  if( !verificaSuporteHtml5('input', 'valor_placeholder') ) placeholderCont( '.inp_text' );
});