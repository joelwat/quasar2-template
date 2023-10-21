import {
    defineConfig,
    presetIcons,
    presetUno,
    transformerDirectives,
} from 'unocss';

export default defineConfig({
    presets: [
        presetIcons(),
        presetUno(),
    ],
    rules: [
        // Padding
        [
            /^pa?-(-?\d+)$/,
            ([_, match]) => ({ padding: `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^px-(-?\d+)$/,
            ([_, match]) => ({
                'padding-left': `${parseInt(match, 10) / 2}rem`,
                'padding-right': `${parseInt(match, 10) / 2}rem`,
            })],
        [
            /^py-(-?\d+)$/,
            ([_, match]) => ({
                'padding-top': `${parseInt(match, 10) / 2}rem`,
                'padding-bottom': `${parseInt(match, 10) / 2}rem`,
            }),
        ],
        [
            /^pt-(-?\d+)$/,
            ([_, match]) => ({ 'padding-top': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^pr-(-?\d+)$/,
            ([_, match]) => ({ 'padding-right': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^pb-(-?\d+)$/,
            ([_, match]) => ({ 'padding-bottom': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^pl-(-?\d+)$/,
            ([_, match]) => ({ 'padding-left': `${parseInt(match, 10) / 2}rem` }),
        ],

        // Margin
        [
            /^m-(-?\d+)$/,
            ([_, match]) => ({ margin: `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^mx-(-?\d+)$/,
            ([_, match]) => ({
                'margin-left': `${parseInt(match, 10) / 2}rem`,
                'margin-right': `${parseInt(match, 10) / 2}rem`,
            }),
        ],
        [
            /^my-(-?\d+)$/,
            ([_, match]) => ({
                'margin-top': `${parseInt(match, 10) / 2}rem`,
                'margin-bottom': `${parseInt(match, 10) / 2}rem`,
            }),
        ],
        [
            /^mt-(-?\d+)$/,
            ([_, match]) => ({ 'margin-top': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^mr-(-?\d+)$/,
            ([_, match]) => ({ 'margin-right': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^mb-(-?\d+)$/,
            ([_, match]) => ({ 'margin-bottom': `${parseInt(match, 10) / 2}rem` }),
        ],
        [
            /^ml-(-?\d+)$/,
            ([_, match]) => ({ 'margin-left': `${parseInt(match, 10) / 2}rem` }),
        ],

        // Gap
        [
            /^gap-(\d+)$/,
            ([_, match]) => ({ gap: `${parseInt(match, 10) / 2}rem` }),
        ],

        // Height
        [
            /^h-(-?\d+)$/,
            ([_, match]) => ({ height: `${parseInt(match, 10) / 2}rem` }),
        ],

        // Width
        [
            /^w-(-?\d+)$/,
            ([_, match]) => ({ width: `${parseInt(match, 10) / 2}rem` }),
        ],

        [
            'fit',
            { height: '100%', width: '100%' },
        ],
        [
            'fit-content',
            { width: 'fit-content' },
        ],
        [
            'fit-height',
            { height: '100%' },
        ],
        [
            'fit-width',
            { width: '100%' },
        ],
        [
            /^bg-(tru-[\w-]+)$/,
            ([_, match]) => ({ 'background-color': `var(--${match}) !important` }),
        ],
        [
            /^text-(tru-[\w-]+)$/,
            ([_, match]) => ({ color: `var(--${match}) !important` }),
        ],
    ],
    safelist: [
        'i-fa6-solid:arrow-up-z-a',
        'i-fa6-solid:arrow-down-a-z',
        'i-fa6-solid:eye',
        'i-fa6-solid:eye-slash',
    ],
    transformers: [
        transformerDirectives(),
    ],
});
