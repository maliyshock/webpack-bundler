const fs = require('fs');

const scss = './src/scss/';
const pug = './src/pug/';
const operation = process.argv[2];
const val = process.argv[3];

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
        fs.writeFile(pug+'mixins/'+val+'.pug', 'mixin '+val+' (object) '+'\n'+ '    .'+val, function(){});

        fs.appendFile(pug+'mixins/all.pug', '\n'+'include '+val, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
}


