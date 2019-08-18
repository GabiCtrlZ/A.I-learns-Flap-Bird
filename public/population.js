class Population {
    constructor(popSize, num) {
        this.population = this.createPopulation(popSize, num)
        this.popSize = popSize
        this.num = num
    }
    createPopulation(popSize, num) {
        let population = []
        for (let i = 0; i < popSize; i++) {
            population.push(new Indev(num, i.toString()))
        }
        return population
    }
    allAlive() {
        return this.population.some( i => i.bird.notDead)
    }
    playGame() {
        for (let indev of this.population){
            indev.bird.fly()
            indev.bird.gravity()
            indev.test()
        }
    }
    bestOfPopulation() {
        let bestFitness = this.population[0].fitness
        let bestIndev = {...this.population[0]}
        let bestArr = [{bestFitness, bestIndev}, {bestFitness, bestIndev}]
        for (let indev of this.population){
            let fitness = indev.fitness
            if (fitness > bestFitness){
                bestFitness = fitness
                bestIndev = {...indev}
                bestArr[1] = {...bestArr[0]}
                bestArr[0] = {bestFitness, bestIndev}
            }
            if (fitness > bestArr[1].bestFitness){
                bestArr[1] = {bestFitness: fitness, bestIndev: {...indev}}
            }
        }
        return bestArr
    }
    modifyPopulation(){
        let bestArr = this.bestOfPopulation()
        this.population = []
        let population = []
        let i = 0
        while (i < this.popSize) {
            population.push(new Indev(this.num, i.toString(), bestArr[i % 2].bestIndev.neuralNet))
            i ++
        }
        this.population = [...population]
    }
}
