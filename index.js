const prompt = require("prompt-sync")();
const chalk = require('chalk');

let aluno;
let materias = [];
let notas = [];
let mediasPorMateria = [];
let faltas = [];

function cadastraAluno() {
    aluno = prompt(chalk.bgBlue.black("Qual o nome do aluno que deseja cadastrar? "));
    console.log();
}

function cadastraMateria() {
    var numMaterias = 0;
    var confirmar = "s";

    console.log(chalk.bgYellow.black("Cadastre NO MÍNIMO 3 matérias!"));
    while(confirmar == "s") {
        numMaterias += 1;
        const materia = prompt(chalk.blue(`Informe o nome da ${numMaterias}ª matéria que você deseja cadastrar: `));
        if (numMaterias >= 3) {
            confirmar = prompt(chalk.bgWhite.black("Deseja cadastrar mais uma matéria?  S - sim ou N - não ")).toLowerCase();
        }
        materias.push(materia);
    }
    console.log();
}

function cadastraNotas() {
    for(let i = 0; i < materias.length; i++){
        console.log(chalk.bgCyan.black(`Cadastrar as 3 notas da matéria ${materias[i]}`));
        let nota1, nota2, nota3;
        let notasValidas = false;

        while (!notasValidas) {
            nota1 = parseFloat(prompt(chalk.cyan(`Informe a primeira nota da matéria ${materias[i]}: `)));
            nota2 = parseFloat(prompt(chalk.cyan(`Informe a segunda nota da matéria ${materias[i]}: `)));
            nota3 = parseFloat(prompt(chalk.cyan(`Informe a terceira nota da matéria ${materias[i]}: `)));

            if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3) && nota1 >= 0 && nota2 >= 0 && nota3 >= 0) {
                notasValidas = true;
            } else {
                console.log(chalk.bgRed.black("Por favor, insira valores válidos (números positivos)."));
            }
        }

        notas.push({
            [materias[i]]: {
                nota1,
                nota2,
                nota3,
            }
        });

        console.log();
    }
}

function mediaNotas() {
    mediasPorMateria = notas.map((materiaObj) => {
        const notas = Object.values(materiaObj)[0];
        const media = (notas.nota1 + notas.nota2 + notas.nota3) / 3;
        return media.toFixed(2);
    });
}

function consultaFaltas() {
    console.log(chalk.bgYellow.black("Cadastro e Contabilização de Faltas para cada matéria"));
    for(let i = 0; i < materias.length; i++){
        let falta;
        let faltasValidas = false;

        while (!faltasValidas) {
            falta = parseInt(prompt(chalk.red(`Informe número de faltas do aluno ${aluno} na matéria ${materias[i]}: `)));
    
            if (!isNaN(falta) && falta >= 0) {
                faltasValidas = true;
            } else {
                console.log(chalk.bgRed.black("Por favor, insira valores válidos (números positivos)."));
            }
        }
        faltas.push(falta);
    }
    console.log();
}

cadastraAluno();
cadastraMateria();
cadastraNotas();
mediaNotas();
consultaFaltas();

for(let i = 0; i < materias.length; i++){
    console.log(chalk.green(`Média calculada da matéria ${materias[i]}: ${mediasPorMateria[i]}`));
    if(faltas[i] <= 5) {
        if (mediasPorMateria[i] >= 7) {
            console.log(chalk.green(`O aluno ${aluno} foi APROVADO na matéria ${materias[i]}!`));
        } else {
            console.log(chalk.red(`O aluno ${aluno} foi REPROVADO por média na matéria ${materias[i]}!`));
            console.log(`Média mínima para aprovação: 7`);
            console.log(`Média do aluno: ${mediasPorMateria[i]}`);
        }
    } else {
        console.log(chalk.red(`O aluno ${aluno} foi REPROVADO por falta na matéria ${materias[i]}!`));
        console.log(`Número máximo de faltas permitido: 5`);
        console.log(`Número de faltas do aluno: ${faltas[i]}`);
    }
    console.log();
}