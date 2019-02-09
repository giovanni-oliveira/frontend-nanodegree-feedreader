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
    /* Suíte de teste para verificar se os dados referenciais ao Feed estão devidamente declarados */
    describe('RSS Feeds', () => {

        /* Verifica se a variável 'allFeeds' foi definida */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
        });

        /* Verifica se a propriedade 'url' é válida */
        it('has URL valid', () => {
            for( const feed of allFeeds) {
                expect(feed).toBeDefined();
                expect(feed.url).not.toEqual('');
            }
        });

        /* Verifica se a propriedade 'name' é válida */
        it('has name valid', () => {
           for( const feed of allFeeds) {
                expect(feed).toBeDefined();
                expect(feed.name).not.toEqual('');
            }
        });
    });


    /* Suíte de teste para verificar o funcionamento do Menu */
    describe('The menu', () => {
        
        /* Verifica se o menu está escondido */
        it('is hidden', () => {
            expect($('body').hasClass('menu-hidden')).toBe(true);
            expect($('.slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

        /* Testa o clique no menu e verifica se o 'body' possue a classe 'menu-hidden' */
        it('show/hide with click', () => {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).not.toBe(true);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* Suíte de teste para um artigo */
    describe('Initial Entries', () => {

        beforeEach(done => {
            loadFeed(0, done);
        });

        /* Testa se o conteúdo foi carregado e adicionado */
        it('has entry', done => {
            expect($('.feed .entry').length).toBeGreaterThan(0);

            done();
        });
    });


    /* Suíte de teste para uma nova seleção de feed */
    describe('New Feed Selection', function() {
        let feed1, feed2;

        beforeEach(async function(done) {
            await new Promise(resolve => loadFeed(0, resolve))
                .then( () => feed1 = $('.feed').html() );

            await new Promise(resolve => loadFeed(1, resolve))
                .then( () => feed2 = $('.feed').html() );
            
            done();
        });

        /* Testa se a função 'loadFeed' carrega e altera as opções na tela */
        it('is loaded', (done) => {
            expect(feed1).not.toEqual(feed2);
            
            done();
        });
    });
}());