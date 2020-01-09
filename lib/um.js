'use strict';

class Um {
    
    constructor(code) {
        this.tokens = [];
        this.code = code;

        this.lexer();
    }

    lexer() {
        let pointer = 0;

        let ch = '';
        let token = '';

        while(pointer < this.code.length) {
            ch = this.code[pointer];
            token += ch;
            if (ch == '오') {
                pointer++;

                while (pointer < this.code.length) {
                    ch = this.code[pointer];
                    if (ch == '.') {
                        token += ch;
                        pointer++;
                    }else {
                        break;
                    }
                }

                this.tokens.push(['STACK_OUTPUT' ,token]);
                token = '';
                
                continue;
            } else if (ch == '으' || ch == '음' || ch == '.') {
                // 이진수 체크
                // token = '';
                pointer++;
                while (pointer < this.code.length) {
                    ch = this.code[pointer];

                    if (ch == '으' || ch == '음' || ch == '.') {
                        token += ch;
                        pointer++;
                    }else {
                        break;
                    }
                }

                this.tokens.push(['NUMBER' ,token]);
                token = '';

                continue;
            } else if (token == '?' || token =='!' || token == '??' || token == '!!' || token == '?!') {
                if(!(pointer + 1 <= this.code.length && (this.code[pointer + 1] == '?' || this.code[pointer + 1] == '!'))) {
                    this.tokens.push(['OPERATOR', token]);
                    token = '';
                }
            } else if (ch == ';') {
                if(!(pointer + 1 <= this.code.length && this.code[pointer + 1] == ';')) {
                    this.tokens.push(['STACK_INPUT', token]);
                    token = '';
                }
            }
            
            pointer++;
        }

        console.log(this.tokens);
    }
    parser() {

    }
}

module.exports = Um;
