var app = app || {};


window.onload = function() {

  app.itemTemplate = _.template("<span class='glyphicon glyphicon-chevron-right'><strong><%= name %></strong></span><br><em><%= description %></em>");
  app.CollectionViewClass = Backbone.View.extend({
    initialize: function() {
      var self = this;
      self.$el.html('')//reset
      if (self.collection == null || self.collection == undefined) {
        throw new ReferenceError("Missing collection during instantiation");
      }
      self.render(self.collection);
    },
    template: app.itemTemplate,
    render: function(data) {
      var self = this;
      var ul = document.createElement('ul');
      self.$el.html('');//reset
      for (model in self.collection.models) {
        var li = document.createElement('li');
        var task = self.collection.models[model];
        $(li).html(self.template(task["attributes"]));
        $(ul).append(li);
      }
      self.$el.html(ul);
    }
  });
  app.CollectionClass = Backbone.Collection.extend({
    url: '/api/tasks',
    initialize: function() {
      var self = this;
      this.on('sync', function() {
        app.myCollectionView = new app.CollectionViewClass({
          el: $('#collection-container'),
          collection: self
        });
      });
      this.fetch();
    }
  });
  app.myCollection = new app.CollectionClass();

}
