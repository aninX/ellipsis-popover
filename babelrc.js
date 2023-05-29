module.exports = {
    "presets" : ["@babel/preset-dev","@babel/preset-react"],
    "plugins":[
        [
            "import", {
                "libraryName": 'antd',
                "libraryDirectoty": 'es',
                "style": true,
            }
        ]
    ]
}