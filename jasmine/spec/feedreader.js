/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /**
         * Checa se todos os objetos de um array possuem uma propriedade e se a mesma possui valor
         * 
         * @function hasPropValid
         * @param {Array.<Object>} array Vetor de Objetos
         * @param {String} prop Nome da propriedade a ser verificada
         * @return {Boolean} Verdadeiro quando todos os objetos do vetor possuírem a propriedade especificada
         */
        const hasPropValid = (array, prop) => array.every(item => item[prop]);

        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL valid', () => {
            const isURLValid = hasPropValid(allFeeds, 'url');

            expect(isURLValid).toBe(true);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name valid', () => {
            const isNameValid = hasPropValid(allFeeds, 'name');

            expect(isNameValid).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('is hidden', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('show/hide with click', () => {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {

        beforeEach(done => {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        it('has entry', done => {
            expect($('.entry-link').length).toBeGreaterThan(0);

            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        let feed;
        beforeEach(done => {
            loadFeed(0, () => {
                feed = $('.feed').html();

                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        it('is loaded', done => {
            loadFeed(1, () => {
                expect($('.feed').html()).not.toEqual(feed);

                done(); 
            });
        });
    });
}());
