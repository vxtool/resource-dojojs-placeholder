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
   * @param {element} String com a identificação do elemento
   *     
  */
  function placeholderCont( element ){

    query( element ).forEach(function( node, index, arr ){
      var
        /**
         * @property {string} (RGB)
         * Propriedade com a cor original do elemento
        */
        colorElement = domStyle.get( node, 'color' ),
        /**
         * @property {string}
         * Propriedade com o valor do atributo 'placeholder' do elemento
        */
        valuePlaceholder = domAttr.get( node, 'placeholder' ),
        /**
         * @property {string}
         * Propriedade com o valor do atributo 'value' do elemento
        */
        valor_input = domAttr.get( node, 'value' );
        
      // sendo o 'value' do elemento vazio, o mesmo recebe o valor do 'placeholder' e a cor cinza para escrita
      if( valor_input === "" ){
        domAttr.set( node, 'value', valuePlaceholder );
        domStyle.set( node, 'color', '#ccc' );
      } else if( valor_input === valuePlaceholder){ //caso tenha refresh na pagina sem acionar os inputs
          domStyle.set( node, 'color', '#ccc' );
      }

      // o valor do 'placeholder' sendo igual ao do 'value', o 'value' recebe vazio e a cor original de escrita
      on( node , 'focus', function() {
        valuePlaceholder = domAttr.get( this, 'placeholder');
        
        if ( domAttr.get( this, 'value' ) === valuePlaceholder ){
          domAttr.set( this, 'value', '' );
          domStyle.set( this, 'color', colorElement );
        }
      });

      // o valor do 'value' sendo igual a vazio, o 'value' recebe o valor do 'placeholder' e a cor cinza para escrita
      on( node, 'blur', function() {
        valuePlaceholder = domAttr.get( this, 'placeholder' );
        
        if( domAttr.get( this, 'value' ) === "" ){
          domAttr.set( this, 'value', valuePlaceholder );
          domStyle.set( this, 'color', '#ccc' );
        }
      });
    });
  }

  /**
   * @method checkSupportHtml5
   * Verifica suporta para html5
   *
   * @param {element} String com a identificação do elemento
   * @param {attribute} String com o atributo do elemento
   *     
  */
  function checkSupportHtml5( element, attribute ){
    if( !( element && typeof element === 'string' ) ) return;
    if( !( attribute && typeof attribute === 'string' ) ) return;
    if( attribute in document.createElement( element ) ) return true;
  };

  if( !checkSupportHtml5('input', 'valor_placeholder') ) placeholderCont( '.inp_text' );
});