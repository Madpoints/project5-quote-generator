/*global $*/

function getQuote() {
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: function(response) {
          // random hex color selector
          var color ='#' + (function co(lor){   return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
            && (lor.length == 6) ?  lor : co(lor); })('');
            
          $('body').css("background-color", color);
          $('#quoteBox').css("color", color);
          $('button').css("background-color", color);
          $('#quote').text("'" + response.quoteText + "'");
          
          if (response.quoteAuthor == '') {
            $('#author').text("- Anonymous");  
          }
          else {
            $('#author').text("- " + response.quoteAuthor);
          }
      }
  });
}

function tweet() {
  
  var quote = $('#quote').text();
  var author = $('#author').text();
  var tweet = quote + "   " + author;
  
  if (tweet.length > 140) {
    $('#tweet').text("Too big to Tweet");
    return;
  }
  
  var tweetUrl = 'https://twitter.com/share?text=' +
    encodeURIComponent(tweet);
    
  window.open(tweetUrl);
}

$(document).ready(function () {
    getQuote();
    
    $('button').click(function() {
        getQuote();
        $('#tweet').text("Tweet");
        
    });
    
    $('#tweet').click(function() {
        tweet();
    });
});

