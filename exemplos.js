document.querySelectorAll('.exemplo').forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector('.line').style.display = 'flex';
        document.querySelector('.area').style.display = 'flex';
    })
})

// EXEMPLO DOS ANDRÉS
btAndres.addEventListener('click', ()=>{
    const vetAndres = [
        {
            label: '1930', 
            y: 1146
        },
        {
            label: 1940,
            y: 2750
        },
        {
            label: 1950,
            y: 4417
        },
        {
            label: 1960,
            y: 8716
        },
        {
            label: 1970,
            y: 30063
        },
        {
            label: 1980,
            y: 123951
        },
        {
            label: 1990,
            y: 190123
        },
        {
            label: 2000,
            y: 128736
        },
        {
            label: 2010,
            y: 89073
        },
    ];

    grafico = new Grafico('Quantidade de Andrés nascidos no Brasil ao longo das décadas', 'Ano', vetAndres, 'line');
    renderChart(grafico);
    infosQuantitativa(grafico);
})

// EXEMPLO DOS DISTURBIOS
btDisturbios.addEventListener('click', ()=>{
    const vetDisturbios = [
        {
            label: 'Ansiedade',
            y: 52.2
        },
        {
            label: 'Depressão',
            y: 25.4
        },
        {
            label: 'Síndrome do pânico',
            y: 10.4
        },
        {
            label: 'Transtorno alimentar',
            y: 4.5
        },
        {
            label: 'TOC',
            y: 3
        },
        {
            label: 'Bipolaridade',
            y: 3
        },
        {
            label: 'TEI',
            y: 1.5
        },
    ]

    
    grafico = new Grafico('Distúrbios mentais mais comuns em mulheres brasileiras (%)', 'Distúrbio', vetDisturbios, 'pie');
    renderChart(grafico);
    infosQualitativa(grafico)
})

btNotas.addEventListener('click', ()=>{
    const vetNotas = [
        {
            label: 0,
            y: 1
        },
        {
            label: 1,
            y: 4
        },
        {
            label: 2,
            y: 10
        },
        {
            label: 3,
            y: 5
        },
        {
            label: 4,
            y: 8
        },
        {
            label: 5,
            y: 3
        },
        {
            label: 6,
            y: 4
        },
        {
            label: 7,
            y: 2
        },
        {
            label: 8,
            y: 2
        },
        {
            label: 9,
            y: 1
        },
        {
            label: 10,
            y: 1
        },
    ]

    grafico = new Grafico('Notas fictícias de alunos fictícios em uma prova fictícia bem dificil', 'Notas', vetNotas, 'column');
    renderChart(grafico);
    infosQuantitativa(grafico)
})

const infosQuantitativa = grafico => {
    tendenciaCentral.innerHTML = `
    <h1>Medidas de tendência central:</h1>
        <b>Moda:</b> ${grafico.getModa()}<br>
        <b>Média:</b> ${grafico.getMedia()}<br>
        <b>Mediana:</b> ${grafico.getMediana()}<br>
        <br>
        <h1>Medidas de dispersão:</h1>
        <b>Amplitude:</b> ${grafico.getAmplitude()}<br>
        <b>Variância:</b> ${grafico.getVariancia()}<br>
        <b>Desvio padrão:</b> ${grafico.getDesvioPadrao()}
        <br><br>
        <em>* todas as medidas aparecem em valores arredondados</em>`
}

const infosQualitativa = grafico => {
    tendenciaCentral.innerHTML = `Por se tratar de uma variável qualitativa, esse gráfico possui apenas moda, sendo essa igual a: <b>${grafico.getModa()}</b>`
}