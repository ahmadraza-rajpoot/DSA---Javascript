
/* 
Monster Battle

Requirements
There should be one player and multiple monsters
Player has health
Monsters have health
Both player and monsters attack each other one by one
player first do battle with one monster at a time.

if monster health become 0 then Player will win
if player health become 0 then monster will win

Player1 hp10
monster1 hp6

player1 attack (monster hp3)
monster attack (player hp7)
player1 attack (monster hp0)

player1 won

///////

Player attributes: health, attackpower, 
Monster attibutes: health, attackpower, 
*/


class Player{
    constructor(name, health, attackPower){
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
    }
}

class Monster{
    constructor(name, health, attackPower){
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        
    }
}

class Game{
    constructor(player, monsters){
        this.player = player;
        this.monsters = monsters;
        this.monsterCount = monsters.length;
    }

    start(){
        let lastMon = null;
        for(let monster of this.monsters){
            
            if(this.player.health <=0) break;

            this.battle(this.player, monster);

            this.monsterCount--
            if(monster.health >0){
                this.monsterCount++
            }
            lastMon = monster.name
        }

        if(this.monsterCount == 0){
            console.log(`${this.player.name} won the game `)
        }else{
            console.log(`${lastMon} won the game`)
        }
        
    }

    attack(attacker, opponent){
        
        
        let remainigHealth = opponent.health - attacker.attackPower
        opponent.health = remainigHealth < 0? 0: remainigHealth
        console.log(`${opponent.name}'s remainig health: ${opponent.health}  `)
        console.log("----------------")
        console.log("")
    }

    battle(attacker, opponent){
        
        if(attacker.health <= 0){
            
            console.log(`${opponent.name} killed ${attacker.name}`)
            console.log("")
            return;
        }

        if(opponent.health <= 0){
            
            console.log(` ${attacker.name} killed ${opponent.name}`)
            console.log("")
            return;
        }

        console.log( `${attacker.name} attacked on ${opponent.name}`)

        this.attack(attacker, opponent)
        this.battle(opponent, attacker)
    }
}

const p1 = new Player("Alex", 18, 2);
const m1 = new Monster("Goblib", 8, 2);
const m2 = new Monster("WilSon", 4, 2);

const game = new Game(p1, [m1,m2])

// game.start()


class Test{
    #password = "123"

    #changePass(pass){
        this.#password = pass;
    }

    showPass(){
        console.log(this.#password)
    }
}

const pass = new Test();

console.log(pass.password)