class Indev {
    constructor(num, id, net = null) {
        this.fitness = 0
        if (net == null) {
            this.neuralNet = new NeuralNet(num)
            this.bird = new FlappyBird(id)
        }
        else {
            this.neuralNet = this.mutatNeuralNet(net)
            this.bird = new FlappyBird(id)
        }
    }
    mutatNeuralNet(net) {
        let modified = { inputs: {} }
        for (let key of Object.keys(net.inputs)) {
            let maxKey = net.inputs[key] + (Math.random() * 0.5 - 0.25)
            modified.inputs[key] = Math.min(Math.max(maxKey, -2), 2)
        }
        return modified
    }
    test() {
        if (this.bird.notDead) {
            let weightedSum = 0
            let data = this.bird.distBothPipes()
            for (let i = 0; i < data.length; i++) {
                weightedSum += data[i] * this.neuralNet.inputs[i]
            }
            if (Math.tanh(weightedSum) > 0.5) {
                this.bird.jumpPressed()
            }
            this.fitness = this.bird.score
        }
        else {
            // console.log(this.fitness)
        }
    }
}
