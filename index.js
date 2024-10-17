var imported = document.createElement('script');
imported.src = "https://cdn.canvasjs.com/ga/canvasjs.stock.min.js";
document.head.appendChild(imported);

const inTitulo = document.getElementById('inTitulo');
const btMostrar = document.getElementById('btMostrar');

class Grafico{
    constructor(titulo, tituloX, dados, tipo){
        this.titulo = titulo;
        this.tituloX = tituloX;
        this.dados = dados;
        this.tipo = tipo;
    }

    getModa(){let maiorQtd = this.dados[0].y;
        let maior = [];
        this.dados.forEach(dado => {
            if (dado.y > maiorQtd) {
                maiorQtd = dado.y;
                maior = [dado];
            } else if (dado.y === maiorQtd) {
                maior.push(dado);
            }
        });

        if (maior.length === 1) {
            return maior[0].label;
        } else if (maior.length > 1) {
            return maior.map(dado => dado.label).join(', ');
        } else {
            return null;
        }
        
    }

    getMedia(){
        let soma = 0;
        let somaPesos = 0;
        this.dados.forEach(dado => {
            soma+=dado.y*dado.label;
            somaPesos += dado.y;
        })
        
        let media = soma/somaPesos;
        return media.toFixed(1);
    }

    getMediana(){
        let valores = [];
        this.dados.forEach(dado => {
            for(let i = 0; i < dado.y; i++){
                valores.push(dado.label)
            }
        })

        valores = [...valores].sort((a, b) => a - b);
        valores = valores.map(Number)
        const half = Math.floor(valores.length / 2);        

        return (valores.length % 2 == 0
            ? valores[half]
            : (valores[half - 1] + valores[half]) / 2
        );
    }

    getAmplitude() {
        let valores = this.dados.map(dado => dado.y);
        let max = Math.max(...valores);
        let min = Math.min(...valores);
        return (max - min).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    }
    
    getVariancia() {
        let media = this.getMedia();
        let somaQuadrados = 0;
        let totalPesos = 0;
    
        this.dados.forEach(dado => {
            somaQuadrados += dado.y * Math.pow(dado.label - media, 2);
            totalPesos += dado.y;
        });
    
        return (somaQuadrados / totalPesos).toFixed(1);
    }
    
    getDesvioPadrao() {
        return Math.sqrt(this.getVariancia()).toFixed(1);
    }
    
}

let grafico = ''; 

// RETORNA OS DADOS NA FORMA DE TABELA
const showData = () => {
    let vetInfos = [];
    let vetQtds = [];
    let vetDatas = [];
    
    const tdInfos = document.querySelectorAll('.tdInfo');
    tdInfos.forEach(info => {
        vetInfos.push(info.value);
    });
    
    const tdQtds = document.querySelectorAll('.tdQtd');
    tdQtds.forEach(qtd => {
        vetQtds.push(qtd.value);
    });
    
    for(i in vetInfos){
        if(vetInfos[i] != "" && vetQtds[i] != ""){
            vetDatas.push({
                label: vetInfos[i],
                y: Number(vetQtds[i])
            });
        }
    }
    
    return vetDatas;
}

// RENDERIZA O GRÁFICO USANDO A BIBLIOTECA
const renderChart = (grafico) =>{
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: grafico.titulo
        },
        axisY: {
            title: "",
            suffix: ""
        },
        axisX: {
            title: grafico.tituloX
        },
        data: [{
            type: grafico.tipo,
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: grafico.dados
        }]
    });
    
    chart.render();
}

// ALTERA O TIPO DO GRÁFICO EXIBIDO NA TELA
const btChartType = document.querySelectorAll('.chartType');
btChartType.forEach(button => {
    button.addEventListener('click', ()=>{
        grafico.tipo = button.classList[1];
        renderChart(grafico)
    })
})

// EVENTOS QUE ACONTECEM AO CLICAR PARA MOSTRAR
btMostrar.addEventListener('click', ()=>{
    // CRIAÇÃO DO NOVO GRÁFICO
    grafico = new Grafico(inTitulo.value, inDadoColetado.value, showData(), 'column')
    renderChart(grafico);

    // HABILITAÇÃO/DESABILITAÇÃO DO TIPO DE GRÁFICO DE ACORDO COM O TIPO DE VARIÁVEL
    const tipoGrafico = document.getElementById('inTipoVariavel');
    if(tipoGrafico.value == 'qualitativa'){
        tendenciaCentral.innerHTML = `Por se tratar de uma variável qualitativa, esse gráfico possui apenas moda, sendo essa igual a: <b>${grafico.getModa()}</b>`

        document.querySelector('.line').style.display = 'none';
        document.querySelector('.area').style.display = 'none';
    } else{
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

        document.querySelector('.line').style.display = 'flex';
        document.querySelector('.area').style.display = 'flex';
    }
})
