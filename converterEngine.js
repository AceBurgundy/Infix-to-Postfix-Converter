class Converter {
    constructor() {
        this.array = []
        let current = this.array.length - 1;
    }

    print() {
        return this.array
    }

    push(value) {
        // since array has no size, I will not be implementing a stack overflow check
        this.array.push(value)
    }

    pop() {
        let popped = this.array.pop()

        if (popped == undefined) {
            return "Stack Underflow"
        } else {
            return popped
        }
    }

    showStack() {
        return this.stack;
    }

    topOfStack() {
        return this.stack[this.stack.length - 1]
    }

    convert(expression) {
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