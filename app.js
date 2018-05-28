// Creation of data model
Ext.define('PlayerModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', mapping: 'name'},
        {name: 'pos', mapping: 'pos'},
        {name: 'ppg', mapping: 'ppg'},
        {name: 'apg', mapping: 'apg'},
        {name: 'rpg', mapping: 'rpg'},
        {name: 'fg', mapping: 'fg'}
    ]
});

var playerStore = Ext.create('Ext.data.Store', {
    model: 'PlayerModel',
    data: [
        {name: 'LeBron James', pos: 'SF', ppg: 27.5, apg: 7.2, rpg: 7.4, fg: 54.2},
        {name: 'Michael Jordan', pos: 'SG', ppg: 30.1, apg: 5.3, rpg: 6.2, fg: 49.7},
        {name: 'Kobe Bryant', pos: 'SG', ppg: 25.0, apg: 4.7, rpg: 5.2, fg: 44.7},
        {name: 'Wilt Chamberlain', pos: 'C', ppg: 30.1, apg: 4.4, rpg: 22.9, fg: 54.0},
        {name: 'Kareem Abdul-Jabbar', pos: 'C', ppg: 24.6, apg: 3.6, rpg: 11.2, fg: 55.9},
        {name: 'Larry Bird', pos: 'SF', ppg: 24.3, apg: 6.3, rpg: 10, fg: 49.6},
        {name: 'Magic Johnson', pos: 'PG', ppg: 19.5, apg: 11.2, rpg: 7.2, fg: 52.0},
        {name: "Shaquille O'Neal", pos: 'C', ppg: 23.7, apg: 2.5, rpg: 10.9, fg: 58.2},
        {name: 'Hakeem Olajuwon', pos: 'C', ppg: 21.8, apg: 2.5, rpg: 11.1, fg: 51.2},
        {name: 'Oscar Robertson', pos: 'PG', ppg: 25.7, rpg: 7.5, apg: 9.5, fg: 48.5}
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
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          params: {
              'name': JSON.stringify(rec.get('name')),
              'position': JSON.stringify(rec.get('pos')),
              'points': JSON.stringify(rec.get('ppg')),
              'assists': JSON.stringify(rec.get('apg')),
              'rebounds': JSON.stringify(rec.get('rpg')),
              'field_goal': JSON.stringify(rec.get('fg'))
          },
          noCache: false,
          jsonData: true,
          success: function (result, request) {
              console.log('Request sent ' + request);
              console.log(request);
              Ext.Msg.alert('Success', 'Eureka!');
          },
          failure: function (result, request) {
              console.log(result);
              var respObj = Ext.JSON.decode(response.responseText);
              console.log(respObj);
             Ext.Msg.alert('Failure', respObj.status.StatusMessage);
          }
      });
   }
});

Ext.onReady(function() {
    Ext.create('Ext.grid.Panel', {
        controller: 'choosePlayer',
        store: playerStore,
        stripeRows: true,
        title: 'Best NBA Players (Based on Career Statistics)',  // Title for the grid
        renderTo:'gridDiv',         // Div id where the grid has to be rendered
        layout: 'auto',
        collapsible: true,
        enableColumnMove:true,
        enableColumnResize:true,
        columns:
            [{
                header: 'Name',
                dataIndex: 'name',
                id : 'name',
                flex:  1,        // property defines the amount of space this column is going to take in the grid container with respect to all.
                sortable: true,
                hideable: false
            },{
                header: 'Position',
                dataIndex: 'pos',
                flex: .5,
                sortable: true,
                hideable: true
            }, {
                header: 'PPG',
                dataIndex: 'ppg',
                flex: .5,
                sortable: true,
                hideable: true
            }, {
                header: 'APG',
                dataIndex: 'apg',
                flex: .5,
                sortable: true,
                hideable: true
            }, {
                header: 'RPG',
                dataIndex: 'rpg',
                flex: .5,
                sortable: true,
                hideable: true
            },{
                header: 'FG %',
                dataIndex: 'fg',
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