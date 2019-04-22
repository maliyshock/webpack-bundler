const fs = require('fs');

const scss = './src/scss/';

process.argv.forEach(function (val, index, array) {

    if(index >= 2) {
        fs.writeFile(scss+'blocks/'+val+'.scss', '.'+val+' { '+'\n'+ '  $c: &;'+ '\n'+'}', function(){});

        fs.appendFile(scss+'index.scss', '\n'+'@import "blocks/'+val+'";', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
});
