
let pop = new Population(30, 3)
let highScoreOfficial = 0
const pipeDiffHeight = 648
console.log(pop)
const allPipes = AllPipes()
const gameController = GameController()
gameController.initGame()
$('body').on('keydown', function(key){
    if (key.keyCode == 72){
        gameController.resetGame()
    }
})