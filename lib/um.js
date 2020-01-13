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

            switch(type){
                case 'NUMBER':
                    let im = 0;
                    for (let i=0;i<string.length;i++){
                        im = ((string[i]=='으'||string[i]=='음')?1:0 + im) * 2;
                    }
                    switch (operator){
                        case 'ADD':
                            value += im;
                            break;
                        case 'SUB':
                            value = im - value;
                            break;
                        case 'MUL':
                            value *= im;
                            break;
                        case 'DIV':
                            value= im / value;
                            break;
                        case 'MOD':
                            value = im % value;
                            break;
                        default:
                            value = im;
                            break;
                    }
                    operator = '';
                break;
                case 'OPEARTOR':
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
                break;
                case 'STACK_INPUT':
                    for (let i=0;i<string.length;i++){
                      stack.push(value);
                    }
                    value = 0;
                break;
                case 'STACK_OUTPUT':
                case 'STACK_PRINT':
                    let im;
                    let pm = 1;

                    for (let i=0;i<string.length;i++){
                        im = stack.pop();
                        if (type == 'STACK_PRINT'){
                            console.log(im);
                        }
                        if (!Number.isInteger(im)) im=Math.floor(im);
                        if (im<0){
                          im*=-1;
                          pm*=-1;
                        }
                        value += "" + im;
                    }
                    value *= pm;
                break;
                default:
                break;
            }
        }
    }
}

module.exports = Um;
