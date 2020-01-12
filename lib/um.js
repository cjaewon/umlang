'use strict';

class Um {

    constructor(code) {
        this.tokens = [];
        this.code = code;

        this.lexer();
        this.interpreter();
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
                case '아':
                imType='STACK_PRINT';
                break;
                case '.':
                if (type==='STACK_OUTPUT' || type==='STACK_PRINT') imType=type;
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
    interpreter() {
        let pointer = 0;
        let value = 0;
        let operator = '';
        let stack = [];

        while (pointer<this.tokens.length){
            let type = this.tokens[pointer][0];
            let string = this.tokens[pointer++][1];

            if (type == 'NUMBER'){
                let im = 0;
                for (let i=0;i<string.length;i++){
                    im=((string[i]=='으'||string[i]=='음')?1:0 + im)*2;
                }
                switch (operator){
                    case 'ADD':
                    value+=im;
                    break;
                    case 'SUB':
                    value-=im;
                    break;
                    case 'MUL':
                    value*=im;
                    break;
                    case 'DIV':
                    value/=im;
                    break;
                    case 'MOD':
                    value%=im;
                    break;
                    default:
                    value=im;
                    break;
                }
                operator = '';
            }
            if (type == 'OPERATOR'){
                switch (string){
                    case "?":
                    operator = 'ADD';
                    break;
                    case "!":
                    operator = 'SUB';
                    break;
                    case "??":
                    operator = 'MUL';
                    break;
                    case "!!":
                    operator = 'DIV';
                    break;
                    case "?!":
                    operator = 'MOD';
                    break;
                    default:
                    operator = '';
                    break;
                }
            }
            if (type == 'STACK_INPUT'){
                for (let i=0;i<string.length;i++){
                  stack.push(value);
                }
                value = 0;
            }
            if (type == 'STACK_OUTPUT' || type == 'STACK_PRINT'){
                let im;

                for (let i=0;i<string.length;i++){
                    im = stack.pop();
                    if (type == 'STACK_PRINT'){
                        console.log(im);
                    }
                    if (!Number.isInteger(im)) im=Math.floor(im);
                    value += "" + im;
                }
                value *= 1;
            }
        }
    }
}

module.exports = Um;
