SearchSource.defineSource('orgs', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {$or: [
      {space: regExp},
      {'location.address': regExp}
    ]};
    
    return App.Collections.Orgs.find(selector, options).fetch();
  } else {
    return App.Collections.Orgs.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}