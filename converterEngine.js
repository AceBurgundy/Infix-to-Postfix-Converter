class Converter {
    constructor() {
        this.array = []
        current = this.array.length - 1;
    }

    empty() {
        if (this.array.length == null) {
            return true
        } else {
            return false
        }
    }

    push(value) {
        // since array has no size, I will not be implementing a stack overflow check
        this.array.push(value)
    }

    pop() {
        if (this.empty()) {
            return true;
        } else {
            this.array.pop
        }
    }

    peek() {
        return this.current
    }
}