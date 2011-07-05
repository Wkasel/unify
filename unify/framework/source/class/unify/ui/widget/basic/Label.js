/* ***********************************************************************************************

    Unify Project

    Homepage: unify-project.org
    License: MIT + Apache (V2)
    Copyright: 2010, Sebastian Fastner, Mainz, Germany, http://unify-training.com

*********************************************************************************************** */

/**
 * EXPERIMENTAL
 *
 * The label widget implements text representation in unify widget system
 */
qx.Class.define("unify.ui.widget.basic.Label", {
  extend : unify.ui.widget.core.Widget,
  
  /**
   * Creates a new instance of Label
   * @param text {String} Text content to use 
   */
  construct : function(text) {
    this.base(arguments);
    if (text) {
      this.setValue(text);
    }
  },
  
  properties : {
    /** Contains the label content */
    value : {
      check: "String",
      apply: "_applyValue",
      event: "changeValue",
      nullable: true
    },
    
    html : {
      check: "Boolean",
      init: true,
      event: "changeHtml"
    },
    
    // overridden
    allowGrowX : {
      refine : true,
      init : false
    },


    // overridden
    allowGrowY : {
      refine : true,
      init : false
    },

    // overridden
    allowShrinkY : {
      refine : true,
      init : false
    },
    // overridden
    appearance :
    {
      refine: true,
      init: "label"
    }
  },
  
  members : {
    __contentSize : null,
  
    // overridden
    _createElement : function() {
      return qx.bom.Label.create(this.getValue(), this.getHtml());
    },
    
    // overridden
    _getContentHint : function()
    {
      var contentSize = this.__contentSize;
      if (!contentSize)
      {
        contentSize = this.__contentSize = this.__computeContentSize();
      }

      return {
        width : contentSize.width,
        height : contentSize.height
      };
    },
    
    // overridden
    _hasHeightForWidth : function() {
      return true; //this.getHtml() && this.getWrap();
    },
    
    // overridden
    _getContentHeightForWidth : function(width)
    {
      console.log("LABEL getContentHeightForWidth");
      /*if (!this.getHtml() && !this.getWrap()) {
        return null;
      }*/
      return this.__computeContentSize(width).height;
    },
    
    /**
     * Internal utility to compute the content dimensions.
     *
     * @param width {Integer} Width of label
     * @return {Map} Content size
     */
    __computeContentSize : function(width)
    {
      var Label = qx.bom.Label;

      var styles = this.getFont();
      var content = this.getValue() || "A";

      var hint;
      if (this.getHtml()) {
        hint = Label.getHtmlSize(content, styles, width);
      } else {
        hint = Label.getTextSize(content, styles);
      }
      
      return hint;
    },
    
    /**
     * Applies text to element
     * @param value {String} New value to set
     */
    _applyValue : function(value) {
      this.__contentSize = null;
      qx.bom.Label.setValue(this.getElement(), value);
    }
  }
});