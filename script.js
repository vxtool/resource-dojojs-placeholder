require([
  'dojo/dom-attr',
  'dojo/query',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-style',
  'dojo/domReady!'
], function( domAttr, query, array, on, domStyle ){
  /**
   * @method verificaSuporteHtml5
   * Verifica suporta para html5
   *
   * @param {elemento} String com a identificação do elemento
   * @param {atributo} String com o atributo do elemento
   *     
  */
  function verificaSuporteHtml5( elemento, atributo ){
    if( !( elemento && typeof elemento === 'string' ) ) return;
    if( !( atributo && typeof atributo === 'string' ) ) return;
    if( atributo in document.createElement( elemento ) ) return true;
  };

  if( !verificaSuporteHtml5('input', 'valor_placeholder') ) placeholderCont( '.inp_text' );
});