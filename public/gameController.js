function GameController() {
    let counter = 0
    let timer = 0
    let score = 0
    let gen = 1
    let highScore = $('#high_score')
    function lastHigh() {
        highScore.text(`Generation: ${gen}`)
    }
    function genAndDistroy() {
        if (counter == (25 * 90)) {
            allPipes.pipeGenerator()
            allPipes.distroyPipes()
            counter = 0
        }
    }
    function appendScore() {
        if ((timer - (156 * 25)) % (25 * 90) == 0) {
            score += 10
            $('#score').text(`Score: ${score}`)
        }
    }
    function appendCounters() {
        counter += 25
        timer += 25
    }
    function resetGame() {
        $('#container').empty();
        $('#container').append(`
        <div class="upper_pipe" style="left: 650px; top: ${320 - pipeDiffHeight}px"></div>
        <div class="upper_pipe" style="left: 650px; top: 320px"></div>
        <div class="upper_pipe" style="left: 380px; top: ${320 - pipeDiffHeight}px"></div>
        <div class="upper_pipe" style="left: 380px; top: 320px"></div>`)
        if (score > highScoreOfficial) highScoreOfficial = score
        if (gen % 10 === 0 && highScoreOfficial < 50) {
            pop = new Population(30, 3)
        } else {
            pop.modifyPopulation()
        }
        console.log(pop)
        score = 0
        timer = 0
        counter = 0
        gen++
        $('#score').text(`Score: ${score}`)
        $('#high_score_official').text(`High Score: ${highScoreOfficial}`)
        $('#alive').text('Alive: 30')
    }
    const interval = setInterval(() => {
        if (pop.allAlive()) {
            pop.playGame()
            allPipes.pipeMov()
            genAndDistroy()
            appendScore()
            lastHigh()
            appendCounters()
        }
        else {
            resetGame()
        }
    }, 25)
    function initGame() {
        interval
    }
    function getScore() {
        return timer
    }
    function getInterval() {
        return interval
    }
    return {
        initGame,
        resetGame,
        getScore,
        getInterval
    }
}