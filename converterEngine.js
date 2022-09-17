export default class Converter {
    constructor() {
        this.stack = []
        this.operators = { '+': 1, '-': 1, '/': 2, '*': 2, '$': 4 }
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

    log(stack, newExpression, message) {
        this.logs.push([newExpression.join(""), "Stack: [" + stack.join("") + "]", message])
    }

    convert(expression) {

        if (!expression) return "Expression is empty"

        const checkUnapproved = (expression) => {
            return (expression.match(/[a-zA-Z0-9\-\+\/\*\$\(\)]/g) || []).length;
        }

        if (expression.length != checkUnapproved(expression)) return "Illegal Expression found"

        let removedElements = []
        let newExpression = []
        const text = [...new String(expression)]

        text.forEach(element => {
            // pushes element to stack if element is a letter or a number
            if (/[a-zA-Z0-9]/i.test(element)) {
                newExpression.push(element)
                this.log(this.stack, newExpression, "print('" + element + "')")
            }

            // pushes element to stack if that element is a "("
            if (element == '(') {
                this.pushToStack(element)
                this.log(this.stack, newExpression, "push('" + element + "')")
            }

            // if element is a ")", pops elements off the stack until the next "("
            if (element == ')') {
                this.log(this.stack, newExpression, "found ')' popping stack until next '('")
                while (this.topOfStack() != '(') {
                    let popped = this.popFromStack()
                    removedElements.push(popped)
                    newExpression.push(popped)
                    this.log(this.stack, newExpression, "pop('" + removedElements.join("") + "') and print")
                    removedElements = []
                }
                // pops "("
                this.popFromStack()
                this.log(this.stack, newExpression, "'(' found. Popping it off the stack")
            }

            // if the element is an operator
            //Object.keys(operators).includes => iterates through all keys in operators and checks if element is included in it.
            if (Object.keys(this.operators).includes(element)) {
                if (this.operators[this.topOfStack()] >= this.operators[element]) {
                    // pops off all element that are greater than the current element
                    while (this.operators[this.topOfStack()] >= this.operators[element] && Object.keys(this.operators).includes(this.topOfStack())) {
                        let poppedOperator = this.popFromStack()
                        newExpression.push(poppedOperator)
                        removedElements.push(poppedOperator)
                        this.log(this.stack, newExpression, "pop('" + removedElements.join("") + "') and print")
                        removedElements = []
                    }
                    // pushes current element to the stack
                    this.pushToStack(element)
                    this.log(this.stack, newExpression, "push('" + element + "')")
                } else {
                    // if element in the stack is less than the current element
                    this.pushToStack(element)
                    this.log(this.stack, newExpression, "push('" + element + "')")
                }
            }
        });

        // while stack is not empty,
        this.log(this.stack, newExpression, "popping and printing remaining elements in the stack")
        while (this.topOfStack() != "Stack is empty") {
            let popped = this.popFromStack()
                // add the remaining elements to the end of the new expression
            newExpression.push(popped)
            this.log(this.stack, newExpression, "pop(" + popped + ") and print")
        }
        this.log(this.stack, newExpression, "Conversion Done")

        return this.logs;
    }

}

//need to fix '$' checking for node module