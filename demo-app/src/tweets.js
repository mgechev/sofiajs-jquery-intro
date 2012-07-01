var Tweets = (function () {

    'use strict';

    var loadingImage = 'images/loading.gif';

    function renderHeader(user, container) {
        var header = $('<div/>');
        header.addClass('tweets-header');
        header.append('<h1>Tweets by ' + user + '</h1>');
        container.append(header);
    }

    function addEntryHandlers(entry) {
        entry.bind('mouseenter.tweets', function () {
            entry.addClass('tweets-entry-hover');
        });
        entry.bind('mouseleave.tweets', function () {
            entry.removeClass('tweets-entry-hover');
        });
    }

    function renderTweet(tweet, container) {
        var entry = $('<div/>');
        entry.append(tweet.text);
        entry.addClass('tweets-entry');
        entry.appendTo(container);
        addEntryHandlers(entry);
    }

    function renderTweets(data, container) {
        var i;
        container.addClass('tweets-container');
        for (i = 0; i < data.length; i += 1) {
            renderTweet(data[i], container);
        }
    }

    function getRequestUrl(user, count) {
        return 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=' + user + '&count=' + count;
    }

    function getUserData(user, count, callback) {
        $.ajax({
            type: 'get',
            url: getRequestUrl(user, count),
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            }
        });
    }

    function render(user, container, count) {
        count = count || 3;
        container.append('<img src="' + loadingImage + '" alt="" />');
        getUserData(user, count, (function () {
            return function (data) {
                container.empty();
                renderHeader(user, container);
                renderTweets(data, container);
            };
        }()));
    }

    return {
        render: render
    };
}());