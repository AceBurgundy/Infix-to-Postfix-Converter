export default class Converter {
    constructor() {
        this.stack = []
        this.operators = { '+': 1, '-': 1, '/': 2, '*': 2, '$': 3 }
        this.logs = []
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

    log(stack, convertedExpression, text) {
        this.logs.push([convertedExpression.join(""), "Stack: [" + stack.join("") + "]", text])
    }

    convert(expression) {

        if (!expression) return "Expression is empty"

        const checkUnapproved = (expression) => {
            return (expression.match(/[a-zA-Z0-9\-\+\/\*\$\(\)]/g) || []).length;
        }

        if (expression.length != checkUnapproved(expression)) return "Illegal Expression found"

        let convertedExpression = []
        const text = [...new String(expression)]

        text.forEach(element => {
            // pushes element to stack if element is a letter or a number
            if (/[a-zA-Z]/i.test(element) == true || +element) {
                convertedExpression.push(element)
                this.log(this.stack, convertedExpression, "print('" + element + "')")
            }

            // pushes element to stack if that element is a "("
            if (element == '(') {
                this.pushToStack(element)
                this.log(this.stack, convertedExpression, "push('" + element + "')")
            }

            // if element is a ")", pops elements off the stack until the next "("
            if (element == ')') {
                this.log(this.stack, convertedExpression, "found ')' popping stack until next '('")
                let removedElements = []
                while (this.topOfStack() != '(') {
                    let popped = this.popFromStack()
                    removedElements.push(popped)
                    convertedExpression.push(popped)
                    this.log(this.stack, convertedExpression, "pop('" + removedElements.join("") + "') and print")
                }
                // pops "("
                this.popFromStack()
                this.log(this.stack, convertedExpression, "found '(' popping it off the stack")
            }

            // if the element is an operator
            if (Object.keys(this.operators).includes(element)) {
                let removedOperators = []
                if (this.operators[this.topOfStack()] >= this.operators[element]) {
                    // pops off all element that are greater than the current element
                    while (this.operators[this.topOfStack()] >= this.operators[element] && Object.keys(this.operators).includes(this.topOfStack())) {
                        let poppedOperator = this.popFromStack()
                        convertedExpression.push(poppedOperator)
                        removedOperators.push(poppedOperator)
                        this.log(this.stack, convertedExpression, "pop('" + removedOperators.join("") + "') and print")
                    }
                    // pushes current element to the stack
                    this.pushToStack(element)
                    this.log(this.stack, convertedExpression, "push('" + element + "')")
                } else {
                    // if element in the stack is less than the current element
                    this.pushToStack(element)
                    this.log(this.stack, convertedExpression, "push('" + element + "')")
                }
            }
        });

        // while stack is not empty,
        let removedOperators = []
        this.log(this.stack, convertedExpression, "popping and printing remaining elements in the stack")
        while (this.topOfStack() != "Stack is empty") {
            let popped = this.popFromStack()
                // add the remaining elements to the end of the new expression
            removedOperators.push(popped)
            convertedExpression.push(popped)
            this.log(this.stack, convertedExpression, "pop(" + removedOperators.join("") + ") and print")
        }
        this.log(this.stack, convertedExpression, "Conversion Done")

        return this.logs;
    }

}