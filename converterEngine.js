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

    peek() {
        return this.current
    }
}