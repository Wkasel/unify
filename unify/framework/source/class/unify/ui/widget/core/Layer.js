/* ***********************************************************************************************

    Unify Project

    Homepage: unify-project.org
    License: MIT + Apache (V2)
    Copyright: 2010, Sebastian Fastner, Mainz, Germany, http://unify-training.com

*********************************************************************************************** */

/**
 * EXPERIMENTAL
 *
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
    // This has to be in front of base call as we need an element in base call
    var layer = this.__layer = new unify.ui.Layer(view);
    var elem = this.__elem = layer.getContentElement();
    
    this.base(arguments);
    
    this._setLayout(new qx.ui.layout.VBox());
    
    this.__view = layer.getView();

    qx.bom.element.Style.set(elem, "boxSizing", "border-box");
    
    view.addListener("appear", this.__viewAppear, this);
    
    qx.event.Registration.addListener(window, "resize", this.__onResize, this);
  },
  
  properties : {
    // overridden
    appearance :
    {
      refine: true,
      init: "layer"
    }
  },

  members: {
    __elem : null,
    __layer : null,
    __view : null,
    
    getUILayer: function() {
      return this.__layer;
    },
    
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
      
      qx.ui.core.queue.Manager.flush();
    },
    
    __onResize : function(e) {
      qx.ui.core.queue.Layout.add(this);
    },
    
    renderLayout : function(left, top, width, height) {
      this.base(arguments, left, top, width, height, true);
    },
    
    /** Returns fixed size hint of base layer size */
    getSizeHint : function() {
      var Dimension = qx.bom.element.Dimension;
      var ret;
      if (this.__view.getManager().getDisplayMode() == "popover") {
        // Look at popovermanager's default settings
        var styles = unify.view.PopOverManager.getInstance().getStyles(this.__view.getManager());
        if (styles) {
          ret = {
            // TODO: Default borders of 10 px calculated in, this has to be fixed to real border/padding/margin width
            width : parseInt(styles.width, 10) - 10,
            height : parseInt(styles.height, 10) - 10
          }
        }
      } else {
        var e = this.getElement();
        ret = {
          width: Dimension.getContentWidth(e),
          height: Dimension.getContentHeight(e)
        };
      }
      return ret;
    }
  },
  
  destruct : function() {
    this.__view.removeListener("appear", this.__viewAppear);
    
    this.__elem = null;
    this.__layer = null;
    this.__view = null;
  }
});
