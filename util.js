const fs = require('fs');

const scss = './src/scss/';
const operation = process.argv[3];
const val = process.argv[4];

switch(operation) {
    case 'scss': {
        fs.writeFile(scss+'blocks/'+val+'.scss', '.'+val+' { '+'\n'+ '  $c: &;'+ '\n'+'}', function(){});

        fs.appendFile(scss+'index.scss', '\n'+'@import "blocks/'+val+'";', function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
     break;

    case 'pug': {

    }
}


