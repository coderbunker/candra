var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['space', 'address'];

OrgSearch = new SearchSource('orgs', fields, options)

Template.searchResult.helpers({
    orgs: function() {
        return App.Collections.Orgs.find();
    },

    getOrgs: function() {
        return OrgSearch.getData({
          transform: function(matchText, regExp) {
            return matchText.replace(regExp, "<b>$&</b>")
          },
          sort: {isoScore: -1}
        });
    },

    isLoading: function() {
        return OrgSearch.getStatus().loading;
    }
});

Template.searchResult.rendered = function() {
  OrgSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    OrgSearch.search(text);
  }, 200)
});

Template.searchResult.events({
    'click #org-member': function(e, t) {
        console.log("You clicked " + JSON.stringify(this));
    }
});