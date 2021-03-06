var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {test : /\.(woff|woff2|eot|ttf|otf|svg)$/, use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'fonts/'
                }
              }]}
        ]
    },
    mode:'development',
    devServer: {
      index: '',
      proxy: {
          context: () => true,
          target: "http://localhost:5000"
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        title: "Spotify Lyrics",
        template: './src/index.html',
        filename: 'index.html' // Relative to the output.path option
      })
    ]
}
