// This file will be run before each test file

// Quasar >= 2.34 reads window.screen.orientation, which happy-dom doesn't implement
if (!(window.screen as Partial<Screen>).orientation) {
    Object.defineProperty(window.screen, 'orientation', {
        configurable: true,
        value: Object.assign(new EventTarget(), { type: 'landscape-primary', angle: 0 }),
    });
}
