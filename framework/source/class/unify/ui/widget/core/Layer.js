/* ***********************************************************************************************

    Unify Project

    Homepage: unify-project.org
    License: MIT + Apache (V2)
    Copyright: 2010, Sebastian Fastner, Mainz, Germany, http://unify-training.com

*********************************************************************************************** */

/**
 * Specialised layer widget that connects to a unify layer and takes the whole space to support
 * unify layer and navigation system
 *
 * In general this is the base (or root) widget of a layer
 */
qx.Class.define("unify.ui.widget.core.Layer", {
  extend : unify.ui.widget.core.Widget,
  
  include : [
    qx.ui.core.MChildrenHandling
  ],
  
  /**
   * @param layer {unify.view.StaticView} Base view for widget system
   */
  construct : function(view) {
    this.base(arguments);
    
    this._setLayout(new qx.ui.layout.Basic());
    
    this.__view = view;
    this.__layer = view.getLayer();
    this.__elem = layer.getContentElement();
    
    view.addListener("appear", this.__viewAppear, this);
    view.addListener("disappear", this.__viewDisappear, this);
  },
  
  members: {
    __elem : null,
    __layer : null,
    
    // overridden
    isRootWidget : function() {
      return true;
    },
    
    // overridden
    _createElement : function() {
      return this.__elem;
    },
    
    /** Handler for appearance of layer */
    __viewAppear : function() {
      this.renderChildren();
    },
    
    /** Returns fixed size hint of base layer size */
    getSizeHint : function() {
      var Dimension = qx.bom.element2.Dimension;
      
      var e = this.getElement();

      var ret = {
        width: Dimension.getContentWidth(e),
        height: Dimension.getContentHeight(e)
      };
      
      return ret;
    },
   
    /** Handler for disappearance of layer */
    __viewDisappear : function() {
      this.setVisibility("hidden");
    }
  },
  
  destruct : function() {
    this.__view.removeListener("appear", this.__viewAppear);
    this.__view.removeListener("disappear", this.__viewDisappear);
    
    this.__elem = null
    this.__layer = null;
    this.__view = null;
  }
});