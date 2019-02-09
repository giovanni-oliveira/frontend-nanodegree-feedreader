/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */


/**
 * The names and URLs to all of the feeds we'd like available
 * 
 * @type {Array.<{name: string, url: string}>}
 */
var allFeeds = [
    {
        name: 'Udacity Blog',
        url: 'http://blog.udacity.com/feed'
    }, {
        name: 'CSS Tricks',
        url: 'http://feeds.feedburner.com/CssTricks'
    }, {
        name: 'HTML5 Rocks',
        url: 'http://feeds.feedburner.com/html5rocks'
    }, {
        name: 'Linear Digressions',
        url: 'http://feeds.feedburner.com/udacity-linear-digressions'
    }
];


/** This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 * 
 * @function init
 */
const init = () => loadFeed(0);


/** This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 * 
 * @function loadFeed
 */
const loadFeed =  function loadFeed(id, cb) {
    if (!Array.isArray(allFeeds)) {
        throw new Error('Não foi possível acessar os Feeds');
    };

    const feedUrl = allFeeds[id].url;
    const feedName = allFeeds[id].name;
    const data = JSON.stringify({ url: feedUrl });


    /**
     * Adiciona o título da categoria do contéudo, os títulos dos artigos e executa a callback
     * 
     * @function callbackSucess
     * @param {Object} result Resultado da busca pelo feed especificado
     * @param {Object} result.feed Conteúdo do feed
     * @param {Object} result.meta Metadados
     * @param {String} status Estado da request
     */
    const callbackSucess = (result, status) => {        
        const container = $('.feed');
        const title = $('.header-title');
        const entries = result.feed.entries;
        const entriesLen = entries.length;
        const entryTemplate = Handlebars.compile($('.tpl-entry').html());

        /**
         * Adiciona HTMLElement compilado pelo Handlebars
         * 
         * @param {Object} entry 
         */
        const appendArticles = entry => container.append(entryTemplate(entry));


        /*! Altera a categoria dos artigos */
        title.html(feedName);
        /*! Remove o contéudo do container */
        container.empty();
        /*! Adiciona novos conteúdos */
        entries.forEach(appendArticles);

        if (cb) {
            cb();
        }
    };


    /**
     * Executa a função de callback
     * 
     * @function callbackError
     */
    const callbackError = (result, status, err) => {
        if (cb) {
            cb();
        }
    };
    

    /** 
     * Dados para requisição do novo Feed
     * 
     * @type {Object}
     */
    const request = {
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data,
        contentType: "application/json",
        success:  callbackSucess,
        error: callbackError,
        dataType: "json"
    }


    $.ajax(request);
}


/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);


/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function () {
    const feedList = $('.feed-list');
    const feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html());
    let feedId = 0;
    const menuIcon = $('.menu-icon-link');


    if (!Array.isArray(allFeeds)) {
        throw new Error('Não foi possível acessar os Feeds');
    }


    /**
     * Adiciona o ID do feed, escreve o HTML na página e atualiza o feedId
     * 
     * @function appendFeed
     * @param {Object} feed
     * @param {String} feed.url URL com os artigos relevantes 
     * @param {String} feed.name Título da categoria
     * @return {Object} Objeto feed com o ID adicionado
     */
    const appendFeed = feed => {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));
        feedId++;

        return feed;
    };


    /**
     * Carrega novo conteúdo para o Feed de acordo com o link clicado
     * 
     * @function loadNewFeed 'this' representa HTMLElement que possui o atributos 'data-id'
     * @return {Boolean} 
     */
    const loadNewFeed = function () {
        var el = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(el.data('id'));
        return false;
    }


    /**
     * Ativa ou desativa o menu
     * @function toggleMenu
     */
    const toggleMenu = () => $('body').toggleClass('menu-hidden');


    allFeeds.map(appendFeed);
    feedList.on('click', 'a', loadNewFeed);
    menuIcon.on('click', toggleMenu);
}());
