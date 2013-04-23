// categoryRows custom layout mode
  $.extend( $.Isotope.prototype, {

    _bigGraphReset : function() {
      this.bigGraph = {
        x : 0,
        y : 0,
        height : 0,
        column: 0,
        row: 0,
        gutter: 0,
        currentCategory : null
      };
    },

    _bigGraphLayout : function( $elems ) {
      var instance = this,
          containerWidth = this.element.width(),
          bigGraphOpts = this.options.bigGraph,
          sortBy = this.options.sortBy,
          elemsGroup = {},
          props = this.bigGraph;

      // group item elements into categories based on their sorting data
      $elems.each( function() {
        var category = $.data( this, 'isotope-sort-data' )[ sortBy ];
        elemsGroup[ category ] = elemsGroup[ category ] || [];
        elemsGroup[ category ].push( this );
      });
  
      var group, groupName, groupMaxRows, groupLen,
          gutterWidth = bigGraphOpts.gutterWidth[ sortBy ],
          x, y;
      // for each group...
      for ( groupName in elemsGroup ) {
        group = elemsGroup[ groupName ];
        groupLen = group.length;
        // make groups look nice, by limiting rows, makes for blockier blocks
        groupMaxRows = groupLen / Math.ceil( groupLen / bigGraphOpts.maxRows );

        $.each( group, function( i, elem ) {
          x = props.column * bigGraphOpts.columnWidth + props.gutter * gutterWidth;
          y = (bigGraphOpts.maxRows - props.row - 1) * bigGraphOpts.rowHeight;
          instance._pushPosition( $(elem), x, y );
          
          if ( props.row >= groupMaxRows - 1 ) {
            // start a new column
            props.row = 0;
            props.column++;
          } else {
            props.row++;
          }
        });
        // start a new group
        if ( props.row > 0 ) {
          props.row = 0;
          props.column++;
        }
        props.gutter++;
      }
      props.gutter--;
      props.width = props.column * bigGraphOpts.columnWidth + props.gutter * gutterWidth;
    },

    _bigGraphGetContainerSize : function () {
      bigGraphOpts = this.options.bigGraph;
      this.bigGraph.column++;
      return {
        width: this.bigGraph.width,
        height: bigGraphOpts.maxRows * bigGraphOpts.rowHeight
      };
    },

    _bigGraphResizeChanged : function() {
      return false;
    }

  });