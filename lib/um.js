'use strict';

class Um {

    constructor(code) {
        this.tokens = [];
        this.code = code;

        this.lexer();
    }

    lexer() {
        let pointer = 0;
        let string = '';
        let type = '';

        while (pointer<this.code.length){
            let ch = this.code[pointer++];
            let imType;

            switch (ch){
                case '으':
                case '음':
                imType='NUMBER';
                break;
                case '?':
                case '!':
                imType='OPERATOR';
                break;
                case ';':
                imType='STACK_INPUT';
                break;
                case '오':
                imType='STACK_OUTPUT';
                break;
                case '.':
                if (type==='STACK_OUTPUT') imType='STACK_OUTPUT';
                else imType='NUMBER';
                break;
                default:
                ch='';
                break;
            }

            if (string === '') type=imType;
            if (imType!==type){
                this.tokens.push([type,string]);
                string = '';
                type = imType;
            }
            string += ch;
        }
        if (string !== '') this.tokens.push([type,string]);

        console.log(this.tokens);
    }
    parser() {

    }
}

module.exports = Um;
