class Converter {
    constructor() {
        this.stack = []
        this.operators = { '+': 1, '-': 1, '/': 2, '*': 2, '$': 3 }
    }

    pushToStack(value) {
        // since stack has no size, I will not be implementing a stack overflow check
        this.stack.push(value)
    }

    popFromStack() {
        let popped = this.stack.pop()

        if (popped == undefined) {
            return "Stack Underflow"
        } else {
            return popped
        }
    }

    stackIsEmpty() {
        // returns true if stack is empty
        return !this.stack.length
    }

    showStack() {
        if (this.stackIsEmpty()) {
            return "Stack is empty"
        } else {
            return this.stack
        }
    }

    topOfStack() {
        // returns the current value of the stack
        if (this.stack[this.stack.length - 1] != undefined) {
            return this.stack[this.stack.length - 1]
        } else {
            return "Stack is empty"
        }
    }

    convert(expression) {

        if (!expression) return "Expression is empty"

        if (/[a-z]/i.test(expression) == true) {
            return "Only accepts numbers as operands"
        }

        let convertedExpression = []
        const text = [...new String(expression)]

        text.forEach(currentElementInTheExpression => {
            // + returns true if value is number
            if (+currentElementInTheExpression) {
                convertedExpression.push(currentElementInTheExpression)
            }
            if (currentElementInTheExpression == '(') {
                this.pushToStack(currentElementInTheExpression)
            }
            if (currentElementInTheExpression == ')') {
                while (this.topOfStack() != '(') {
                    convertedExpression.push(this.popFromStack())
                }
                // pops "("
                this.popFromStack()
            }
            if (Object.keys(this.operators).includes(currentElementInTheExpression)) {
                if (this.operators[this.topOfStack()] >= this.operators[currentElementInTheExpression]) {
                    while (this.operators[this.topOfStack()] >= this.operators[currentElementInTheExpression] && Object.keys(this.operators).includes(this.topOfStack())) {
                        convertedExpression.push(this.popFromStack())
                    }
                    this.pushToStack(currentElementInTheExpression)
                } else {
                    this.pushToStack(currentElementInTheExpression)
                }
            }
            // if (currentElementInTheExpression == this.showStack()) {
            //     // convertedExpression.push(this.popFromStack())
            //     console.log(currentElementInTheExpression);
            //     convertedExpression.push(currentElementInTheExpression)
            // }
        });

        console.log("current stack " + this.showStack().join());
        console.log("current top " + this.topOfStack());
        return convertedExpression;
    }

}

let con = new Converter()

console.log(con.convert("7+5*3/5$1+(3-2)").join(""));

// error doesnt print last value
/*
Scan the symbols of the expression from left to right and for each symbol, do the following:

        if symbol is an operand
            Print that symbol onto the screen.

        if symbol is a left parenthesis
            Push it on the stack.

        if symbol is a right parenthesis

            Pop all the operators from the stack upto the first left parenthesis and print them on the screen.
            Discard the left and right parentheses.

        if symbol is an operator

        if the precedence of the operators in the stack are greater than or equal to the current operator
            Pop the operators out of the stack and print them onto the screen, and push the current operator onto the stack.
        else
            Push the current operator onto the stack.

*/