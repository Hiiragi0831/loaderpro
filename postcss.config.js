module.exports = {
    ident: 'postcss',
    syntax: 'postcss-scss',
    "plugins": {
        // "postcss-import": {},
        "tailwindcss": {},
        "postcss-preset-env": {
            "stage": 1,
            "features": {
                "custom-properties": true
            }
        },
        "autoprefixer": {}
    }
}
