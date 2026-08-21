import LoadAsset from '../LoadPublicAsset.vue';

describe('load assets', () => {
    it('verifies that the image is loaded and rendered correctly', () => {
        cy.mount(LoadAsset);
        cy.dataCy('test-image')
            .should('be.visible')
            .and(($img) => {
                const img = $img[0] as HTMLImageElement;
                const detail = `src="${img.getAttribute('src') ?? ''}" (complete=${String(img.complete)}, naturalWidth=${String(img.naturalWidth)})`;

                expect(
                    img.naturalWidth,
                    `image failed to decode: ${detail}. The file is missing, empty, or not a valid image — if this only fails in CI, check that Git LFS assets were fetched during checkout. naturalWidth`,
                ).to.be.greaterThan(0);
            });
    });
});
