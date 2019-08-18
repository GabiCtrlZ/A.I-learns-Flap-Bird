class NeuralNet {
    constructor(num) {
        this.inputs = this.createConnections(num)
    }
    createConnections(num) {
        let obj = {}
        for (let i = 0; i < num; i++) {
            obj[i] = Math.random() * 4 - 2
        }
        return obj
    }
}
