require([
  'dojo/dom-attr',
  'dojo/query',
  'dojo/_base/array',
  'dojo/on',
  'dojo/dom-style',
  'dojo/domReady!'
], function( domAttr, query, array, on, domStyle ){

  /**
   * @method placeholderCont
   * Executa a função de placeholder alternativo para navegadores antigos
   *
   * @param {elemento} String com a identificação do elemento
   *     
  */
  function placeholderCont( elemento ){

    query( elemento ).forEach(function( node, index, arr ){
      var
        /**
         * @property {string} (RGB)
         * Propriedade com a cor original do elemento
        */
        cor_elemento = domStyle.get( node, 'color' ),
        /**
         * @property {string}
         * Propriedade com o valor do atributo 'placeholder' do elemento
        */
        valor_placeholder = domAttr.get( node, 'placeholder' ),
        /**
         * @property {string}
         * Propriedade com o valor do atributo 'value' do elemento
        */
        valor_input = domAttr.get( node, 'value' );
        
      if( valor_input === "" ){
        domAttr.set( node, 'value', valor_placeholder );
        domStyle.set( node, 'color', '#ccc' );
      } else if( valor_input === valor_placeholder){
          domStyle.set( node, 'color', '#ccc' );
      }

      on( node , 'focus', function() {
        valor_placeholder = domAttr.get( this, 'placeholder');
        
        if ( domAttr.get( this, 'value' ) === valor_placeholder ){
          domAttr.set( this, 'value', '' );
          domStyle.set( this, 'color', cor_elemento );
        }
      });

      on( node, 'blur', function() {
        valor_placeholder = domAttr.get( this, 'placeholder' );
        
        if( domAttr.get( this, 'value' ) === "" ){
          domAttr.set( this, 'value', valor_placeholder );
          domStyle.set( this, 'color', '#ccc' );
        }
      });
    });
  }

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