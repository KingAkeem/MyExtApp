// Creation of data model
Ext.define('PlayerModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', mapping: 'name'},
        {name: 'pos', mapping: 'pos'},
        {name: 'ppg', mapping: 'ppg'},
        {name: 'age', mapping: 'age'}
    ]
});

var playerStore = Ext.create('Ext.data.Store', {
    model: 'PlayerModel',
    data: [
        {name: "LeBron James", pos: 'SF', ppg: 27.5, age: "33"},
        {name: "Michael Jordan", pos: 'SG', ppg: 30.1, age: "55"},
        {name: "Kobe Bryant", pos: 'SG', ppg: 25.0, age: "39"}
    ]
});

Ext.define('choosePlayer.GridController', {
   extend: 'Ext.app.ViewController',
   alias: 'controller.choosePlayer',

   onApprove: function(grid, rowIndex, colIndex) {
      var rec = grid.getStore().getAt(rowIndex);
      var endpoint = "http://localhost:8080/test";
      Ext.Ajax.request({
          disableCaching: false,
          url: endpoint,
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          },
          jsonData: true,
          noCache: false,
          success: function (response, opts) {
              console.log('Succeed');
              console.log(response);
             Ext.Msg.alert('Success', 'Eureka!');
          },
          failure: function (response, opts) {
              console.log(response);
              var respObj = Ext.JSON.decode(response.responseText);
              console.log(respObj);
             Ext.Msg.alert('Failure', respObj.status.StatusMessage);
          }
      });
   }
});

Ext.onReady(function() {
    // Creation of first grid
    Ext.create('Ext.grid.Panel', {
        controller: 'choosePlayer',
        store: playerStore,
        stripeRows: true,
        title: 'Best NBA Players',  // Title for the grid
        renderTo:'gridDiv',         // Div id where the grid has to be rendered
        layout: 'auto',
        collapsible: true,             // property to collapse grid
        enableColumnMove:true,              // property which allows column to move to different position by dragging that column.
        enableColumnResize:true,        // property which allows to resize column run time.
        columns:
            [{
                header: 'Name',
                dataIndex: 'name',
                id : 'name',
                flex:  1,        // property defines the amount of space this column is going to take in the grid container with respect to all.
                sortable: true,  // property to sort grid column data.
                hideable: false   // property which allows column to be hidden run time on user request.
            },{
                header: 'Position',
                dataIndex: 'pos',
                flex: .5,
                sortable: true,
                hideable: true   // this column will not be available to be hidden.
            }, {
                header: 'PPG',
                dataIndex: 'ppg',
                flex: .5,
                sortable: true,
            }, {
                header: 'Age',
                dataIndex: 'age',
                flex: .5,
                sortable: true,
                hideable: true
            }, {
                xtype: 'actioncolumn',
                width: 50,
                menuDisabled: true,
                sortable: false,

                items: [{
                    iconCls: 'x-fa fa-check green',
                    handler: 'onApprove'
                }]
            }]
    });
});